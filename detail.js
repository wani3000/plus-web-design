import { Header } from './src/components/Header.js'
import { initStoreDownloadModal } from './src/initStoreDownloadModal.js'

document.querySelector('#app')?.remove();
document.body.insertBefore(Header(), document.body.firstChild);
document.querySelector('.mobile-header')?.remove();

const template = document.createElement('template');
template.innerHTML = `
  <header class="detail-mobile-header" aria-label="모바일 상세 네비게이션">
    <div class="detail-mobile-header__inner">
      <button class="detail-mobile-header__back" type="button" aria-label="뒤로가기" data-detail-back>
        <span class="detail-mobile-header__back-icon" aria-hidden="true">‹</span>
      </button>
    </div>
  </header>
`;
document.body.insertBefore(template.content, document.body.firstChild);

document.addEventListener('click', (event) => {
  const backButton = event.target.closest?.('[data-detail-back]');
  if (!backButton) return;

  event.preventDefault();
  const hasSameOriginReferrer =
    document.referrer &&
    new URL(document.referrer, window.location.href).origin === window.location.origin;

  if (window.history.length > 1 && hasSameOriginReferrer) {
    window.history.back();
    return;
  }

  window.location.href = './';
});

initStoreDownloadModal();
