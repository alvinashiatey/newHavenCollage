import "./styles/main.scss";
import { slideUp, imageAppear } from "./js/animation";

let el = document.querySelector(".image__container");

const apiCallCuOuts = (async () => {
  const channel = "pre-back-college";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.json())
    .then((json) => {
      const textCutOutContainer = document.querySelector(".text-cutout");
      const footnotesContainer = document.querySelector(".footnotes");
      const contentArr = json.contents;
      let counter = 0;
      let receivedDescriptions = [];
      let footnoteArr = localStorage.getItem("descriptions");

      for (const content of contentArr) {
        if (content.image != null) {
          let newImg = document.createElement("img");
          newImg.src = content.image.original.url;
          let imgHolderDiv = document.createElement("section");
          imgHolderDiv.insertAdjacentElement("beforeend", newImg);
          imgHolderDiv.classList.add(`cutout__holder-${counter}`);
          textCutOutContainer.insertAdjacentElement("beforeend", imgHolderDiv);
          counter++;
          if (content.title && content.description) {
            let title = content.title;
            let description = content.description;
            receivedDescriptions.push({ title, description });
          }
          intersectRun(imgHolderDiv, footnotesContainer);
        }
      }
      if (footnoteArr == null) {
        localStorage.setItem(
          "descriptions",
          JSON.stringify(receivedDescriptions)
        );
      }
    });
})();

async function apiCallMayDayEvents() {
  const channel = "mayday-protest-new-haven";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.json())
    .then((json) => {
      const maydayContainer = document.querySelector(".mayday-newhaven");

      const contentArr = json.contents;
      let randomCutout = Math.floor(Math.random() * contentArr.length);
      let selectedCutout = contentArr[randomCutout];

      if (selectedCutout.image != null) {
        let newImg = document.createElement("img");
        newImg.src = selectedCutout.image.original.url;
        let imgHolderDiv = document.createElement("div");
        imgHolderDiv.innerHTML = " ";
        imgHolderDiv.insertAdjacentElement("beforeend", newImg);
        imgHolderDiv.classList.add("img__holder");
        maydayContainer.innerHTML = "";
        maydayContainer.insertAdjacentElement("beforeend", imgHolderDiv);
        imageAppear(maydayContainer, 0.5);
      }
    });
}

function intersectRun(DomEl, textContainer) {
  const options = {
    root: null,
    threshold: 0,
    rootMargin: "-150px",
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let desc = JSON.parse(`[${localStorage.getItem("descriptions")}]`);
        let selectDes = desc[entry.target.className.split("-")[1]];
        slideUp(textContainer, 1);
        textContainer.firstElementChild.textContent = selectDes.title;
        textContainer.lastElementChild.textContent = selectDes.description;
        apiCallMayDayEvents();
      }
    });
  }, options);
  observer.observe(DomEl);
}

(function init() {
  apiCallMayDayEvents();
})();
