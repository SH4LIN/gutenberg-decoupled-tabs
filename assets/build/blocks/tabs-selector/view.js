(()=>{const t={init(){this.handleDropDown=this.handleDropDown.bind(this),this.handleList=this.handleList.bind(this),this.tabsSelector=document.querySelector(".wp-block-decoupled-tabs-tabs-selector"),this.tabsSelector&&("drop-down"===(this.tabsSelector?.dataset?.selectorType||"drop-down")?this.handleDropDown():this.handleList())},handleDropDown(){const t=this.tabsSelector.querySelector("#tabs-selector");t&&t.addEventListener("change",(()=>{const e=new CustomEvent("tabChange",{detail:{value:t.value}});this.tabsSelector.dispatchEvent(e)}))},handleList(){const t=this.tabsSelector.querySelector(".tabs-selector-list");if(!t)return;const e=t.querySelectorAll("button");e&&e.forEach((t=>{t.addEventListener("click",(()=>{const e=new CustomEvent("tabChange",{detail:{value:t.dataset.tabId}});this.tabsSelector.dispatchEvent(e)}))}))}};document.addEventListener("DOMContentLoaded",(()=>{t.init()}))})();