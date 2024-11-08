const dialog = document.getElementById('safari-dialog');
const close = document.getElementById('safari-close');
const ok = document.getElementById('safari-ok');

let hasSeenDialog = false;

export const checkSafari = () => {
  const isSafari = navigator.userAgent.includes('Safari/') && !navigator.userAgent.includes('Chrome/');
  if (isSafari && !hasSeenDialog) {
    dialog.showModal();
    hasSeenDialog = true;

    close.addEventListener('click', () => dialog.close(), { once: true });
    ok.addEventListener('click', () => dialog.close(), { once: true });

    return true;
  }

  return false;
};


