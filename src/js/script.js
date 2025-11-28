import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import JustValidate from "just-validate";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/src/sass/style.scss";

const burger = document.querySelector(".burger"),
  close = document.querySelector(".header__menu-close"),
  menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
  menu.classList.add("header__menu--active");
  document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
  menu.classList.remove("header__menu--active");
  document.body.style.overflow = "";
});

try {
  const swiper = new Swiper(".works__slider", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".icon-right-open",
      prevEl: ".icon-left-open",
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      1920: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },
    modules: [Navigation, Pagination],
  });
} catch (e) {}

try {
  const tabs = document.querySelectorAll(".catalog__tab");
  const contents = document.querySelectorAll(".catalog__content-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Удаляем активный класс у всех табов и контента
      tabs.forEach((t) => t.classList.remove("catalog__tab--active"));
      contents.forEach((c) => (c.style.display = "none"));

      // Добавляем активный класс к нажатому табу и показываем соответствующий контент
      tab.classList.add("catalog__tab--active");
      contents[index].style.display = "grid";
    });
  });

  // Показываем первый контент при загрузке
  contents.forEach((c, i) => (c.style.display = i === 0 ? "grid" : "none"));
} catch (e) {}

try {
  const validator = new JustValidate(".touch__form");

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Please fill the name",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Min 2 chari",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
        errorMessage: "Please fill the email",
      },
      {
        rule: "email",
        errorMessage: "Please fill the email",
      },
    ])
    .addField(
      "#question",
      [
        {
          rule: "required",
          errorMessage: "Please enter your question",
        },
        {
          rule: "minLength",
          value: 5,
          errorMessage: "Min 5 chari",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#question")
          .parentElement.querySelector(".error-message"),
      }
    )
    .addField(
      "#checkbox",
      [
        {
          rule: "required",
          errorMessage:
            "Please confirm your agreement with the terms and conditions",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#checkbox")
          .parentElement.parentElement.querySelector(".checkbox-erorr-message"),
      }
    )
    .onSuccess((event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);

      fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Success", data);
          form.reset();
        });
    });
} catch (e) {}

try {
  const validator = new JustValidate(".footer__form");

  validator
    .addField("#footer__email", [
      {
        rule: "required",
        errorMessage: "Please fill the email",
      },
      {
        rule: "email",
        errorMessage: "Please fill the email",
      },
    ])
    .addField(
      "#footer__checkbox",
      [
        {
          rule: "required",
          errorMessage:
            "Please confirm your agreement with the terms and conditions",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#footer__checkbox")
          .parentElement.parentElement.querySelector(
            ".footer-checkbox-erorr-message"
          ),
      }
    );
} catch (e) {}
