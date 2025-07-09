const checkbox = document.querySelector(".switch .input");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") document.body.classList.add("dark-theme");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
});

document.addEventListener("DOMContentLoaded", () => {
  const textCol = document.querySelector("#bgShow .col-lg-6.text-center");
  const imgCol = document.querySelector(
    "#bgShow .col-lg-6.d-none.d-lg-block img"
  );


  textCol.classList.add("animate-hidden-left");
  imgCol.classList.add("animate-hidden-right");


  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === textCol) {
            textCol.classList.remove("animate-hidden-left");
            textCol.classList.add("animate-fade-slide-in-left");
          }
          if (entry.target === imgCol) {
            imgCol.classList.remove("animate-hidden-right");
            imgCol.classList.add("animate-fade-slide-in-right");
          }
          observer.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.2, 
    }
  );

  observer.observe(textCol);
  observer.observe(imgCol);
});

(() => {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const subscribeBtn = document.getElementById("subscribeBtn");
  const messageBox = document.getElementById("messageBox");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");


  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      nameError.classList.remove("d-none");
      valid = false;
    } else {
      nameError.classList.add("d-none");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.classList.remove("d-none");
      valid = false;
    } else {
      emailError.classList.add("d-none");
    }

    return valid;
  }


  function showMessage(text, type = "success") {
    messageBox.textContent = text;
    messageBox.className = "";
    messageBox.classList.add(type === "success" ? "success" : "error");
    messageBox.classList.remove("d-none");
    setTimeout(() => {
      messageBox.classList.add("d-none");
    }, 5000);
  }

  subscribeBtn.addEventListener("click", () => {
    if (!validate()) return;



    showMessage("عضویت شما با موفقیت ثبت شد!", "success");


    nameInput.value = "";
    emailInput.value = "";
  });
})();


  document.querySelectorAll('#accordion .accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const targetSelector = this.getAttribute('data-target');
      const target = document.querySelector(targetSelector);

      if (target.classList.contains('show')) {
        target.classList.remove('show');
        this.querySelector('i').classList.remove('open');
      } else {
        document.querySelectorAll('#accordion .collapse.show').forEach(openCollapse => {
          openCollapse.classList.remove('show');
          const icon = openCollapse.previousElementSibling.querySelector('i');
          if (icon) icon.classList.remove('open');
        });
        target.classList.add('show');
        this.querySelector('i').classList.add('open');
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact form");
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");

    function showError(input, message) {
      input.classList.add("is-invalid");

      let error = input.parentElement.querySelector(".invalid-feedback");
      if (!error) {
        error = document.createElement("div");
        error.className = "invalid-feedback mt-1 text-danger small";
        input.parentElement.appendChild(error);
      }
      error.innerText = message;
    }

    function clearErrors() {
      form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
      form.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      if (nameInput.value.trim() === "") {
        showError(nameInput, "لطفاً نام خود را وارد کنید.");
        hasError = true;
      }

      if (emailInput.value.trim() === "") {
        showError(emailInput, "لطفاً ایمیل خود را وارد کنید.");
        hasError = true;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "فرمت ایمیل معتبر نیست.");
        hasError = true;
      }

      if (messageInput.value.trim() === "") {
        showError(messageInput, "لطفاً پیام خود را وارد کنید.");
        hasError = true;
      }

      if (!hasError) {
        alert("پیام شما با موفقیت ارسال شد! با تشکر از تماس شما 🙏");

        form.reset();
      }
    });
  });

