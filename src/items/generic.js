export const ITEM_CLASS = 'gustavo-item';

export const createGenericItemContainer = () => {
  const container = document.createElement('div');
  container.classList.add(ITEM_CLASS);
  return container;
};
