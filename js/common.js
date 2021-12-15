// file contains method that is used in multiple js files

// method loops through all the form elements and adds
// event listener on all input fields to display error styles
// on invalid values
function addEventListenersForValidation(form) {
  const elements = form.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.type !== "submit") {
      // show error style when user leaves the input field
      element.onblur = validateField;

      // remove error style if the value is valid as the user is typing
      element.onkeyup = clearErrorStyle;
    }
  }

  function validateField() {
    if (this.checkValidity()) {
      this.classList.remove("error");
    } else {
      this.classList.add("error");
    }
  }

  function clearErrorStyle() {
    if (this.checkValidity()) {
      this.classList.remove("error");
    }
  }
}
