import gsap from "gsap";

let revealBtn = (div, dur) => {
  gsap.set(div, {
    visibility: "visible",
  });
  gsap.from(div, dur, {
    x: -100,
    opacity: 0,
    ease: "power3.inOut",
  });
};

let slideUp = (div, dur) => {
  gsap.from(div, {
    duration: dur,
    y: 100,
    opacity: 0,
    ease: "power3.inOut",
  });
};

let imageAppear = (div, dur) => {
  gsap.fromTo(
    div,
    { opacity: 0 },
    {
      duration: dur,
      opacity: 1,
      ease: "power3.inOut",
    }
  );
};

export { slideUp, imageAppear };
