const setupDialog = ({ toggle, close, dialog }) => {
  toggle.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  });

  close.addEventListener('click', () => {
    dialog.close();
  })
}

export default () => {
  [
    {
      dialog: document.getElementById('inventory-dialog'),
      toggle: document.getElementById('inventory-button'),
      close: document.getElementById('inventory-close'),
    },
    {
      dialog: document.getElementById('about-dialog'),
      toggle: document.getElementById('about-button'),
      close: document.getElementById('about-close'),
    },
    {
      dialog: document.getElementById('settings-dialog'),
      toggle: document.getElementById('settings-button'),
      close: document.getElementById('settings-close'),
    },
  ].forEach((dialogSettings) => setupDialog(dialogSettings));
};
