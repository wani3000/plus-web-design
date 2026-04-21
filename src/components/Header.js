export function Header() {
  const template = document.createElement('template');
  const piLogo = '/io_pi.png';
  const homeHref = './';
  const googlePlayHref = 'https://play.google.com/store/apps/details?id=hw.dp.plus&hl=ko&pli=1';
  const appleStoreHref = 'https://apps.apple.com/us/app/%ED%8C%8C%EC%9D%B4/id6755743981';
  const googlePlayLogo = '/ic_store_google.png';
  const appleLogo = '/ic_store_apple.png';
  template.innerHTML = `
<header class="header">
  <div class="header__inner">
    <div class="header__left">
      <a class="header__logo-wrap" href="${homeHref}" aria-label="PI 홈으로 이동" data-home-link>
        <span class="header__logo-frame">
          <img class="header__logo-image" src="${piLogo}" alt="PI" />
        </span>
      </a>
    </div>

    <nav class="header__nav" aria-label="주요 메뉴">
      <a class="header__nav-item is-active" href="./">홈</a>
    </nav>

    <div class="header__stores">
      <a class="store-button" href="${googlePlayHref}" data-store="google" aria-label="Google Play 다운로드">
        <span class="store-button__icon-frame" aria-hidden="true">
          <img class="store-button__icon-image" src="${googlePlayLogo}" alt="" />
        </span>
        <span class="store-button__label">Google Play</span>
      </a>
      <a class="store-button" href="${appleStoreHref}" data-store="apple" aria-label="App Store 다운로드">
        <span class="store-button__icon-frame" aria-hidden="true">
          <img class="store-button__icon-image store-button__icon-image--apple" src="${appleLogo}" alt="" />
        </span>
        <span class="store-button__label">App Store</span>
      </a>
    </div>
  </div>
</header>

<header class="mobile-header" aria-label="모바일 네비게이션">
  <div class="mobile-header__inner">
    <a class="mobile-header__brand" href="${homeHref}" aria-label="PLUS 홈" data-home-link>
      <span class="mobile-header__brand-mark" aria-hidden="true">
        <svg viewBox="0 0 492 404" role="img" aria-hidden="true">
          <path d="M155.64998 31.2375c18.02696 0 35.53993 3.11967 52.52499 9.35 17.3839 5.91069 32.71768 14.95706 45.95 27.1375 13.26157 11.86572 23.87942 26.67356 31.86249 44.37499 8.03027 17.46372 12 37.80899 12 60.96249-.00098 22.45018-3.814 42.41686-11.47501 59.85001l.01251.0125c-7.29611 17.36979-17.3981 32.18231-30.29998 44.38748-12.89591 12.19772-28.05542 21.42993-45.4375 27.6875-17.36281 6.24985-35.92203 9.375-55.65 9.375l-82.42499 0 0 89.08749-72.71249 0 0-372.22496 155.64998 0z m-82.93749 215.03748l79.86249 0c12.36063 0 22.73316-2.01151 31.1875-5.91249l.03749-.0125c8.90497-3.95851 16.08971-9.20424 21.61251-15.7l.05-.0625c5.89107-6.54704 10.33353-14.25396 13.29999-23.15001 2.98237-8.94714 4.47406-18.23695 4.475-27.86248 0-8.25548-1.32611-16.71172-3.9875-25.36251l0-.02501c-2.63289-8.88597-6.91997-16.95188-12.84999-24.19998-5.89259-7.20054-13.44719-13.12985-22.71251-17.76251-9.1245-4.56133-20.15425-6.89999-33.16249-6.89999l-77.81249 0 0 146.94998z m108.69999-2.15c-.11551.04429-.23394.08135-.35001.125 1.29234-.48605 2.55377-.99888 3.77501-1.5625l-3.425 1.4375z m36.52499-33.83749c.21489-.4556.45647-.90002.66251-1.3625l.17498-.41251c-.26336.60143-.55931 1.18512-.83749 1.77501z m273.78748 193.17497l-73.2125 0 0-271.36247 73.2125 0 0 271.36247z m0-330.24997l-73.2125 0 0-73.21249 73.2125 0 0 73.21249z"></path>
        </svg>
      </span>
    </a>

    <div class="mobile-header__right">
      <div class="mobile-header__stores" aria-label="앱 다운로드 스토어">
        <a class="store-button" href="${googlePlayHref}" data-store="google" aria-label="Google Play 다운로드">
          <span class="store-button__icon-frame" aria-hidden="true">
            <img class="store-button__icon-image" src="${googlePlayLogo}" alt="" />
          </span>
          <span class="store-button__label">Google Play</span>
        </a>
        <a class="store-button" href="${appleStoreHref}" data-store="apple" aria-label="App Store 다운로드">
          <span class="store-button__icon-frame" aria-hidden="true">
            <img class="store-button__icon-image store-button__icon-image--apple" src="${appleLogo}" alt="" />
          </span>
          <span class="store-button__label">App Store</span>
        </a>
      </div>
      <button class="mobile-header__download" type="button" data-store="google">
        앱 다운로드
      </button>
    </div>
  </div>
</header>
  `;

  return template.content;
}
