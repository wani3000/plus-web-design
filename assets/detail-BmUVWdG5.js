import{n as e,t}from"./initStoreDownloadModal-BLs9pEwj.js";document.querySelector(`#app`)?.remove(),document.body.insertBefore(e(),document.body.firstChild),document.querySelector(`.mobile-header`)?.remove();var n=document.createElement(`template`);n.innerHTML=`
  <header class="detail-mobile-header" aria-label="모바일 상세 네비게이션">
    <div class="detail-mobile-header__inner">
      <button class="detail-mobile-header__back" type="button" aria-label="뒤로가기" data-detail-back>
        <span class="detail-mobile-header__back-icon" aria-hidden="true">‹</span>
      </button>
    </div>
  </header>
`,document.body.insertBefore(n.content,document.body.firstChild),document.addEventListener(`click`,e=>{if(!e.target.closest?.(`[data-detail-back]`))return;e.preventDefault();let t=document.referrer&&new URL(document.referrer,window.location.href).origin===window.location.origin;if(window.history.length>1&&t){window.history.back();return}window.location.href=`./`}),t();