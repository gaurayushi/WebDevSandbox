document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#password");

  togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "❌";
  });

  const loginButton = document.getElementById("loginButton");
  const logo = document.querySelector(".logo");
  const step1 = document.getElementById("step1");
  const pageContent = document.querySelector(".contain");
  const thankYouPage = document.getElementById("thankYouPage");

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();

    step1.style.opacity = '0';
    pageContent.style.opacity = '0';
    step1.style.transition = 'opacity 0.5s ease';
    pageContent.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      step1.style.display = 'none';
      pageContent.style.display = 'none';

      logo.style.transition = 'all 1.5s ease-in-out';
      logo.style.position = 'absolute';
      logo.style.top = '50%';
      logo.style.left = '50%';
      logo.style.transform = 'translate(-50%, -50%)';
      logo.style.width = '150px';

      setTimeout(() => {
        logo.style.opacity = '0';

        setTimeout(() => {
          thankYouPage.style.display = 'flex';
          thankYouPage.style.opacity = '1';
          thankYouPage.style.transition = 'opacity 1.5s ease';

          setTimeout(() => {
            thankYouPage.style.opacity = '0';
            setTimeout(() => {
              thankYouPage.style.display = 'none';

              logo.style.opacity = '1';
              logo.style.transition = 'all 1.5s ease-in-out';
              logo.style.position = 'absolute';
              logo.style.top = '10px';
              logo.style.left = '10px';
              logo.style.width = '60px';
              logo.style.transform = 'translate(0, 0)';

              setTimeout(() => {
                step1.style.display = 'flex';
                step1.style.opacity = '1';
                step1.style.transition = 'opacity 1s ease';

                pageContent.style.display = 'flex';
                pageContent.style.opacity = '1';
                pageContent.style.transition = 'opacity 1s ease';
              }, 1000);
            }, 1000);
          }, 3000);
        }, 500);
      }, 2000);
    }, 500);
  });

  const enrollButton = document.getElementById("enrollButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  enrollButton.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", function (e) {
    if (!e.target.matches(".enroll-btn")) {
      dropdownMenu.classList.remove("show");
    }
  });
});
