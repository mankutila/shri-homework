export const addBodyStyles = (state) => {
  document.body.classList.add('body-fixed');
  document.body.style.paddingRight = 40 + state.paddingRight + 'px';
};

export const removeBodyStyles = () => {
  document.body.classList.remove('body-fixed');
  document.body.style.paddingRight = '40px';
};