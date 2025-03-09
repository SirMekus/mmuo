import { element as $ } from "./helper.js";

class Ajaxify {
  element;

  submitButton;

  constructor(element) {
    this.element = element;
    this.submitButton = element.find("input[type='submit']") || element.find("button[type='submit']");;
  }

  createResponseArea() {
    if (this.element.find("div.success")) {
        this.element.find("div.success").remove();
      }
  
      $("div").addClass("success").insertBefore(this.submitButton);
      let responseArea = this.element.find(".success");
    return responseArea;
  }

  startAjax() {
    let submitBtnInitialValue = this.submitButton.val();

    let progressIndicatorText = this.submitButton.data("mmuoStart") || "...in progress";

    this.submitButton.val(progressIndicatorText).attr("disabled", "disabled");

    this.submitButton.attr("data-mmuo-initial", submitBtnInitialValue);
  }

  successAjax(response) {
    let responseArea = this.createResponseArea();

    const cssForServerSuccess = "#198754";

    this.element.removeElement(".server-response");

    if (this.element.data("bc")) {
      document.dispatchEvent(
        new CustomEvent(this.element.data("bc"), { detail: response })
      );
    }

    if (response.data?.message?.url || response.data?.url) {
      let url = response.data?.message?.url || response.data?.url;
      if (this.element.data("ext")) {
        window.open(url, "_ext");
      } else {
        location.href = url;
      }
    } else {
      let serverResponse =
        (response.data.msg ||
          response.data.message?.message ||
          response.data.message) ??
        response.data;

      if (typeof serverResponse == "object") {
        serverResponse = this.submitButton.data("mSuccess") ?? "Operation was successful";
      }

      responseArea.html(
        `<span style="color:${cssForServerSuccess}; font-weight:700;">${serverResponse}</span>`
      );
    }
  }

  errorAjax(error) {
    if (!error || !error.response) {
      return;
    }
    
    let responseArea = this.createResponseArea();

    const cssForServerError = "rgb(220, 53, 69)";

    this.element.removeElement(".server-response");

    let errorMessage =
      error.response.data.message ??
      error.response.data?.data?.message ??
      error.response.data;
    switch (error.response.status) {
      case 422:
        let items = error.response.data.errors;
        if (items != undefined) {
          for (let item in items) {
            //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
            if (!this.element.find(`[name='${item}']`)) {
              continue;
            }

            let sibling = this.element.find(`[name='${item}']`).sibling();

            const id = `${item}_mmuo`;

            if (!sibling) {
              //Then we need to create it
              $("div")
                .id(id)
                .addClass("server-response")
                .css("color", cssForServerError)
                .insertAfter(this.element.find(`[name='${item}']`));
            } else {
              if (sibling.attr("id") != id) {
                $("div")
                  .id(id)
                  .addClass("server-response")
                  .css("color", cssForServerError)
                  .insertAfter(sibling);
              }
            }

            this.element.find(`#${id}`).text(items[item][0]);
          }

          if (items.length > 1) {
            responseArea.html(
              `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>Please make sure you fill required fields in the form and try again.</span>`
            );
          } else {
            responseArea.html(
              `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${error.response.data.message}</span>`
            );
          }
        } else {
          let msg;
          if (error.response.data?.message?.message) {
            msg = error.response.data.message.message;
          } else if (error.response.data?.message) {
            msg = error.response.data.message;
          } else {
            msg = error.response.data;
          }

          responseArea.html(
            `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${msg}</span>`
          );

          if (
            error.response.data?.message?.target ||
            error.response.data?.target
          ) {
            const inputName =
              error.response.data.message.target || error.response.data?.target;

            //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
            if (this.element.find(`[name='${inputName}']`) != null) {
              let sibling = this.element.find(`[name='${inputName}']`).sibling();

              const id = `${inputName}_mmuo`;

              if (!sibling) {
                //Then we need to create it
                $("div")
                  .id(id)
                  .addClass("server-response")
                  .css("color", cssForServerError)
                  .css("fontWeight", "700")
                  .insertAfter(this.element.find(`[name='${inputName}']`));
              } else {
                if (sibling.attr("id") != id) {
                  $("div")
                    .id(id)
                    .addClass("server-response")
                    .css("color", cssForServerError)
                    .css("fontWeight", "700")
                    .insertAfter(sibling);
                }
              }

              this.element.find(`#${id}`).html(msg);
            }
          }
        }
        break;
      // case 401:
      // case 412:
      // case 403:
      // case 404:
      //     responseArea.html(
      //         `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${errorMessage}</span>`);

      //     break;

      default:
        responseArea.html(
          `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${errorMessage}</span>`
        );
        break;
    }
    document.dispatchEvent(new CustomEvent("http_error", { detail: error }));
  }

  endAjax() {
    this.submitButton.val(this.submitButton.data("mmuoInitial"));
    this.submitButton.removeAttr("disabled");
    this.submitButton.removeAttr("data-mmuo-initial");
  }
}

export { Ajaxify }
