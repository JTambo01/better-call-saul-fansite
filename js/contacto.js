document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm()) {
        showSuccessMessage();
        contactForm.reset();
      }
    });

    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        clearError(input);
      });
    });
  }

  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const birthdate = document.getElementById("birthdate");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (name.value.trim() === "") {
      setError(name, "Por favor, introduce tu nombre.");
      isValid = false;
    } else {
      clearError(name);
    }

    if (lastname.value.trim() === "") {
      setError(lastname, "Por favor, introduce tu apellido.");
      isValid = false;
    } else {
      clearError(lastname);
    }

    if (birthdate.value === "") {
      setError(birthdate, "Por favor, introduce tu fecha de nacimiento.");
      isValid = false;
    } else {
      clearError(birthdate);
    }

    if (email.value.trim() === "" || !validateEmail(email.value)) {
      setError(email, "Por favor, introduce un email válido.");
      isValid = false;
    } else {
      clearError(email);
    }

    if (message.value.trim() === "") {
      setError(message, "Por favor, escribe un mensaje.");
      isValid = false;
    } else {
      clearError(message);
    }

    return isValid;
  }

  function setError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    formGroup.classList.add("has-error");
    errorMessage.innerText = message;
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    formGroup.classList.remove("has-error");
    errorMessage.innerText = "";
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\\]\\.,;:\s@\"]+(\\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$ /;
    return re.test(String(email).toLowerCase());
  }

  function showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerText = "¡Mensaje enviado con éxito! Gracias por contactarnos.";
    contactForm.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
});