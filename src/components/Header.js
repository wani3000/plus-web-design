export function Header() {
  const template = document.createElement('template');
  const piLogo = './io_pi.png';
  const homeHref = './';
  const googlePlayHref = 'https://play.google.com/store/apps/details?id=hw.dp.plus&hl=ko';
  const appleStoreHref = 'https://apps.apple.com/kr/app/%ED%8C%8C%EC%9D%B4/id6755743981';
  const googlePlayLogo = 'https://www.figma.com/api/mcp/asset/c1269f60-c578-4fa6-934d-c540a1afcd7c';
  const appleLogo = 'https://www.figma.com/api/mcp/asset/9522aba2-6fb0-4e8e-8b20-f634d3780b7d';
  const pathname = window.location.pathname;
  const isTest2 = pathname.endsWith('/test2.html') || pathname.endsWith('test2.html');
  const isTest3 = pathname.endsWith('/test3.html') || pathname.endsWith('test3.html');
  const isTest1 = !isTest2 && !isTest3;
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
      <a class="header__nav-item${isTest1 ? ' is-active' : ''}" href="./">테스트1</a>
      <a class="header__nav-item${isTest2 ? ' is-active' : ''}" href="./test2.html">테스트2</a>
      <a class="header__nav-item${isTest3 ? ' is-active' : ''}" href="./test3.html">테스트3</a>
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
  `;

  return template.content;
}
