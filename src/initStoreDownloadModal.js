import QRCode from 'qrcode'

const STORE_LINKS = {
  google: {
    label: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=hw.dp.plus&hl=ko'
  },
  apple: {
    label: 'App Store',
    href: 'https://apps.apple.com/kr/app/%ED%8C%8C%EC%9D%B4/id6755743981'
  }
};

let modalRoot = null;
let dimmed = null;
let panel = null;
let qrImage = null;
let storeText = null;
let activeTrigger = null;

const getStoreType = (button) => {
  const explicit = button.dataset.store;
  if (explicit === 'google' || explicit === 'apple') return explicit;

  const label = button.textContent?.toLowerCase() ?? '';
  if (label.includes('google')) return 'google';
  if (label.includes('app store')) return 'apple';
  return null;
};

const ensureModal = () => {
  if (modalRoot) return;

  modalRoot = document.createElement('div');
  modalRoot.className = 'store-modal';
  modalRoot.setAttribute('aria-hidden', 'true');
  modalRoot.innerHTML = `
    <div class="store-modal__dimmed" data-store-close="true"></div>
    <div class="store-modal__panel" role="dialog" aria-modal="true" aria-labelledby="store-modal-title" tabindex="-1">
      <button class="store-modal__close" type="button" aria-label="팝업 닫기" data-store-close="true">
        <img src="./ic_close_24.png" alt="" />
      </button>
      <div class="store-modal__qr-wrap">
        <img class="store-modal__qr-image" alt="앱 다운로드 QR 코드" />
      </div>
      <p class="store-modal__app-name">파이</p>
      <p class="store-modal__title" id="store-modal-title">앱 다운로드</p>
      <p class="store-modal__store"></p>
      <p class="store-modal__body">휴대폰으로 QR코드를 촬영하여<br>파이 앱을 다운 받을 수 있습니다</p>
    </div>
  `;

  document.body.appendChild(modalRoot);

  dimmed = modalRoot.querySelector('.store-modal__dimmed');
  panel = modalRoot.querySelector('.store-modal__panel');
  qrImage = modalRoot.querySelector('.store-modal__qr-image');
  storeText = modalRoot.querySelector('.store-modal__store');

  modalRoot.addEventListener('click', (event) => {
    const closeTarget = event.target.closest('[data-store-close="true"]');
    if (closeTarget) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalRoot && !modalRoot.hasAttribute('hidden')) {
      closeModal();
    }
  });
};

const openModal = async (storeType, trigger) => {
  ensureModal();
  const store = STORE_LINKS[storeType];
  if (!store) return;

  activeTrigger = trigger;
  storeText.textContent = store.label;
  qrImage.src = await QRCode.toDataURL(store.href, {
    width: 220,
    margin: 1,
    color: {
      dark: '#141415',
      light: '#FFFFFF'
    }
  });

  modalRoot.removeAttribute('aria-hidden');
  modalRoot.classList.add('is-open');
  document.body.classList.add('store-modal-open');
  panel.focus?.({ preventScroll: true });
};

const closeModal = () => {
  if (!modalRoot) return;
  modalRoot.classList.remove('is-open');
  modalRoot.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('store-modal-open');
  if (activeTrigger instanceof HTMLElement) {
    activeTrigger.focus({ preventScroll: true });
  }
  activeTrigger = null;
};

export function initStoreDownloadModal() {
  ensureModal();

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.store-button');
    if (!button) return;

    const storeType = getStoreType(button);
    if (!storeType) return;

    event.preventDefault();
    await openModal(storeType, button);
  });
}
