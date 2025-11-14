export const fakeCaptcha = element => {
  const checkbox = element.querySelector(".fake-captcha__checkbox");
  if (!checkbox) return;

  checkbox.classList.remove("fake-captcha__checkbox--checked");

  checkbox.addEventListener("click", e => {
    checkbox.classList.add("fake-captcha__checkbox--checked");
  });

  return { element, checkbox };
};
