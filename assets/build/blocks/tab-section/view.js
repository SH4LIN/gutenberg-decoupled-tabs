(()=>{const t={init(){this.handleTabChange=this.handleTabChange.bind(this),this.hideAllTabContents=this.hideAllTabContents.bind(this),this.tabSections=document.querySelectorAll(".wp-block-decoupled-tabs-tab-section"),this.tabSections&&(this.tabsSelector=document.querySelector(".wp-block-decoupled-tabs-tabs-selector"),this.tabsSelector?this.tabsSelector.addEventListener("tabChange",this.handleTabChange):this.hideAllTabContents())},hideAllTabContents(){this.tabSections.forEach((t=>{const e=t.querySelectorAll(".wp-block-decoupled-tabs-tab-content");e&&e.forEach((t=>{t.setAttribute("aria-hidden",!0)}))}))},handleTabChange(t){if(!t?.detail?.value)return;const e=t.detail.value;this.tabSections.forEach((t=>{const a=t.querySelectorAll(".wp-block-decoupled-tabs-tab-content");a&&a.forEach((t=>{t.setAttribute("aria-hidden",t.dataset.tabContentId!==e)}))}))}};document.addEventListener("DOMContentLoaded",(()=>{t.init()}))})();