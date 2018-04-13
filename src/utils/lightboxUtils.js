const PADDING = 20;
export const addBodyStyles = (state) => {
  document.body.classList.add('body-fixed');
  document.body.style.paddingRight = `${PADDING + state.paddingRight}px`;
};

export const removeBodyStyles = () => {
  document.body.classList.remove('body-fixed');
  document.body.style.paddingRight = `${PADDING}px`;
};