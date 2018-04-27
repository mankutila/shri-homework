const PADDING = 20;
const BODY = document.body;
export const addBodyStyles = (state) => {
  BODY.classList.add('body-fixed');
  BODY.style.paddingRight = `${PADDING + state.paddingRight}px`;
};

export const removeBodyStyles = () => {
  BODY.classList.remove('body-fixed');
  BODY.style.paddingRight = `${PADDING}px`;
};
