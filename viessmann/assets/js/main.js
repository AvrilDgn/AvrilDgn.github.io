class Accordion{constructor(a,b){this._el="string"==typeof a?document.querySelector(a):a;let c={alwaysOpen:!0,duration:350,itemClass:"accordion__item",headerClass:"accordion__header",bodyClass:"accordion__body"};this._config=Object.assign(c,b),this.addEventListener()}addEventListener(){this._el.addEventListener("click",c=>{let a=c.target.closest("."+this._config.headerClass);if(a){if(!this._config.alwaysOpen){let b=this._el.querySelector(".show");b&&b!==a.parentElement&&this.toggle(b)}this.toggle(a.parentElement)}})}show(b){let a=b.querySelector("."+this._config.bodyClass);if(a.classList.contains("collapsing")||b.classList.contains("show"))return;a.style.display="block";let c=a.offsetHeight;a.style.height=0,a.style.overflow="hidden",a.style.transition=`height ${this._config.duration}ms ease`,a.classList.add("collapsing"),b.classList.add("slidedown"),a.offsetHeight,a.style.height=`${c}px`,window.setTimeout(()=>{a.classList.remove("collapsing"),b.classList.remove("slidedown"),a.classList.add("collapse"),b.classList.add("show"),a.style.display="",a.style.height="",a.style.transition="",a.style.overflow=""},this._config.duration)}hide(b){let a=b.querySelector("."+this._config.bodyClass);!a.classList.contains("collapsing")&&b.classList.contains("show")&&(a.style.height=`${a.offsetHeight}px`,a.offsetHeight,a.style.display="block",a.style.height=0,a.style.overflow="hidden",a.style.transition=`height ${this._config.duration}ms ease`,a.classList.remove("collapse"),b.classList.remove("show"),a.classList.add("collapsing"),window.setTimeout(()=>{a.classList.remove("collapsing"),a.classList.add("collapse"),a.style.display="",a.style.height="",a.style.transition="",a.style.overflow=""},this._config.duration))}toggle(a){a.classList.contains("show")?this.hide(a):this.show(a)}}class Modal{constructor(b){let a={backscroll:!0,linkAttrName:"data-modal",closeOnOverlay:!0,closeOnEsc:!0,closeBtnAttrName:"data-modal-close",catchFocus:!0,fixedSelectors:"*[data-fixed]",formData:{},beforeOpen(){},afterClose(){}};this.config=Object.assign(a,b),a.formData instanceof Object&&Object.keys(a.formData).length>0&&(this.config.formData=Object.assign({},b.formData)),this.config.linkAttrName&&this.init(),this._closeAfterTransition=this._closeAfterTransition.bind(this)}init(){this.isOpened=!1,this.openedWindow=!1,this.starter=!1,this._nextWindows=!1,this._scrollPosition=0,this._reopenTrigger=!1,this._overlayChecker=!1,this._isMoved=!1,this._form=null,this._focusElements=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])',],this.eventsFeeler()}eventsFeeler(){document.addEventListener("click",a=>{let b=a.target.closest(`[${this.config.linkAttrName}]`);if(!this._isMoved&&b){a.preventDefault(),this.starter=b;let c=this.starter.getAttribute(this.config.linkAttrName);this._nextWindows=document.querySelector("#"+c),this.open();return}a.target.closest(`[${this.config.closeBtnAttrName}]`)&&this.close()}),this.config.closeOnOverlay&&(document.addEventListener("mousedown",a=>{(!(!this._isMoved&&a.target instanceof Element)||a.target.classList.contains("modal__wrapper"))&&(this._overlayChecker=!0)}),document.addEventListener("mouseup",a=>{if(!this._isMoved&&a.target instanceof Element&&this._overlayChecker&&a.target.classList.contains("modal__wrapper")){a.preventDefault(),this._overlayChecker=!this._overlayChecker,this.close();return}this._overlayChecker=!1})),window.addEventListener("keydown",a=>{if(!this._isMoved&&this.config.closeOnEsc&&27===a.which&&this.isOpened){a.preventDefault(),this.close();return}!this._isMoved&&this.config.catchFocus&&9===a.which&&this.isOpened&&this.focusCatcher(a)})}open(b){if(b&&("string"==typeof b?this._nextWindows=document.querySelector(b):this._nextWindows=b),!this._nextWindows){console.log("Warning: Modal selector is not found");return}if(this.isOpened){this._reopenTrigger=!0,this.close();return}if(this.openedWindow=this._nextWindows,this._form=this.openedWindow.querySelector("form"),this.config.beforeOpen(this),this._bodyScrollControl(),this._form instanceof HTMLElement&&Object.keys(this.config.formData).length>0)for(let c in this.config.formData){let a=document.createElement("input");a.type="hidden",a.name=c,a.value=this.config.formData[c],a.setAttribute("data-form-data","data-form-data"),this._form.appendChild(a)}this.openedWindow.classList.add("modal--active"),this.openedWindow.setAttribute("aria-hidden","false"),this.config.catchFocus&&this.focusControl(),this.isOpened=!0}close(){this.isOpened&&(this._form.querySelectorAll("input[data-form-data]").forEach(a=>{this._form.removeChild(a)}),this.openedWindow.classList.add("modal--moved"),this._isMoved=!0,this.openedWindow.addEventListener("transitionend",this._closeAfterTransition),this.openedWindow.classList.remove("modal--active"))}_closeAfterTransition(){this.openedWindow.classList.remove("modal--moved"),this.openedWindow.removeEventListener("transitionend",this._closeAfterTransition),this._isMoved=!1,this.openedWindow.setAttribute("aria-hidden","true"),this.config.catchFocus&&this.focusControl(),this._bodyScrollControl(),this.isOpened=!1,this.openedWindow.scrollTop=0,this.config.afterClose(this),this._reopenTrigger&&(this._reopenTrigger=!1,this.open())}focusControl(){let a=this.openedWindow.querySelectorAll(this._focusElements);this.isOpened&&this.starter?this.starter.focus():a.length&&a[0].focus()}focusCatcher(b){let d=this.openedWindow.querySelectorAll(this._focusElements),a=Array.prototype.slice.call(d);if(this.openedWindow.contains(document.activeElement)){let c=a.indexOf(document.activeElement);b.shiftKey&&0===c&&(a[a.length-1].focus(),b.preventDefault()),b.shiftKey||c!==a.length-1||(a[0].focus(),b.preventDefault())}else a[0].focus(),b.preventDefault()}_bodyScrollControl(){if(!this.config.backscroll)return;let d=document.querySelectorAll(this.config.fixedSelectors),b=Array.prototype.slice.call(d),a=document.documentElement;if(!0===this.isOpened){a.classList.remove("modal-opened"),a.style.marginRight="",b.forEach(a=>{a.style.paddingRight=""}),window.scrollTo(0,this._scrollPosition),a.style.top="";return}this._scrollPosition=window.pageYOffset;let c=window.innerWidth-a.clientWidth;a.style.top=`${-this._scrollPosition}px`,c&&(a.style.marginRight=`${c}px`,b.forEach(a=>{a.style.paddingRight=`${parseInt(getComputedStyle(a).paddingRight,10)+c}px`})),a.classList.add("modal-opened")}}document.addEventListener("DOMContentLoaded",function(j){let k=function(a){window.requestAnimationFrame(function(){a()})};new Modal;let a=document.querySelectorAll("input[name=phone]"),b=document.querySelectorAll("input[name=name]");a.forEach(a=>{let b=new IMask(a,{mask:"+{7} (000) 000-00-00",lazy:!0,placeholderChar:"_"});a.addEventListener("focus",function(){b.updateOptions({lazy:!1})},!0),a.addEventListener("blur",function(){b.updateOptions({lazy:!0}),b.masked.rawInputValue||(b.value="")},!0)}),b.forEach(a=>{let b=new IMask(a,{mask:/^\W+$/,lazy:!0});a.addEventListener("focus",function(){b.updateOptions({lazy:!1})},!0),a.addEventListener("blur",function(){b.updateOptions({lazy:!0}),b.masked.rawInputValue||(b.value="")},!0)});let c=document.querySelector(".header"),l=document.querySelector(".header__top"),d=c.querySelector(".header__menu-open-btn"),m=!1,n=document.documentElement,o=0;d.addEventListener("click",function(b){if(m=!m,c.classList.toggle("header--active"),m){o=window.pageYOffset;let a=window.innerWidth-n.clientWidth;n.style.top=`${-o}px`,a&&(n.style.marginRight=`${a}px`,l.style.paddingRight=`${parseInt(getComputedStyle(el).paddingRight,10)+a}px`),n.classList.add("modal-opened")}else n.classList.remove("modal-opened"),n.style.marginRight="",l.style.paddingRight="",window.scrollTo(0,o),n.style.top=""}),document.querySelectorAll(".nav__inner-menu").forEach(a=>{let b=a.closest(".nav__item"),c=function(){a.classList.add("nav__inner-menu--showed"),k(()=>{a.style.opacity=1,document.addEventListener("click",c=>{if(window.innerWidth>992){let a=c.target;a==b||b.contains(a)||d()}},{once:!0})})},d=function(){a.style.opacity=0,a.addEventListener("transitionend",function(){a.classList.remove("nav__inner-menu--showed")},{once:!0})};b.addEventListener("click",function(b){a.classList.contains("nav__inner-menu--showed")&&!b.target.contains(a)?d():c()})});let e=document.querySelectorAll(".departure__districts-item input"),f=document.querySelectorAll(".departure__map svg path"),p=function(a){let b=document.querySelector("#"+a.value);document.querySelector(".departure__map svg path.active").classList.remove("active"),b.classList.add("active");let c=new Modal({formData:{[a.name]:a.value}});c.open("#modal-feedback")};f.forEach(a=>{let b=a.id;if(b&&""!==b){let c=document.querySelector(".departure__districts-item input[value="+b+"]");c&&""!==c&&(a.addEventListener("mouseenter",function(a){c.classList.add("hover")}),a.addEventListener("mouseleave",function(a){c.classList.remove("hover")}),a.addEventListener("click",function(a){c.checked=!0,p(c)}))}}),e.forEach(a=>{let b=a.value;if(b&&""!==b){let c=document.querySelector("#"+b);c&&""!==c&&(a.parentElement.addEventListener("mouseenter",function(a){c.classList.add("hover")}),a.parentElement.addEventListener("mouseleave",function(a){c.classList.remove("hover")}),a.addEventListener("click",function(b){p(a)}))}});let q=1,g=document.querySelector(".quiz__step-btn.arrow-btn--prev"),h=document.querySelector(".quiz__step-btn.arrow-btn--next"),r=document.querySelectorAll(".quiz__step"),s=document.querySelector(".quiz__steps-count b");h.addEventListener("click",function(a){q>=3||(++q>=3&&(h.classList.add("arrow-btn--disabled"),h.setAttribute("disabled",!0)),g.classList.remove("arrow-btn--disabled"),g.removeAttribute("disabled"),r.forEach(a=>{+a.dataset.quizId===q?a.classList.add("active"):a.classList.remove("active")}),s.textContent="\u0448\u0430\u0433 "+q)}),g.addEventListener("click",function(a){q<=1||(--q<=1&&(g.classList.add("arrow-btn--disabled"),g.setAttribute("disabled",!0)),h.classList.remove("arrow-btn--disabled"),h.removeAttribute("disabled"),r.forEach(a=>{a.classList.remove("active"),+a.dataset.quizId===q&&a.classList.add("active")}),s.textContent="\u0448\u0430\u0433 "+q)}),new Accordion(".reasons__list",{alwaysOpen:!1,duration:350,itemClass:"reason",headerClass:"reason__head",bodyClass:"reason__body"}),new Swiper(".masters__slider",{spaceBetween:30,wrapperClass:"masters__list",slideClass:"masters__item",loop:!0,slidesPerView:1,navigation:{nextEl:".masters__arrows .arrow-btn--next",prevEl:".masters__arrows .arrow-btn--prev",disabledClass:"arrow-btn--disabled"},pagination:{el:".masters__pagination",bulletClass:"pagination__bullet",bulletActiveClass:"pagination__bullet--active",clickable:!0},breakpoints:{768:{slidesPerView:2},1200:{spaceBetween:30,slidesPerView:4}}});let i=document.querySelectorAll(".form"),t=function(b,c){let a=document.createElement("div"),d=b.parentElement;b.classList.add("form__input--fault"),a.textContent=c,a.classList.add("form__message"),d.appendChild(a),a.style.opacity=1,setTimeout(()=>{b.classList.remove("form__input--fault"),a.style.opacity=null,a.addEventListener("transitionend",function(){d.removeChild(a)})},3e3)},u=function(d){let a=document.createElement("div"),e=document.createElement("div"),b=document.createElement("div"),c=document.createElement("div");a.classList.add("thx"),e.classList.add("thx__icon"),b.classList.add("thx__title","title"),c.classList.add("thx__subtitle"),b.textContent="\u0421\u043F\u0430\u0441\u0438\u0431\u043E",c.textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit cursus nisi vel fermentum.",a.appendChild(e),a.appendChild(b),a.appendChild(c),d.style.opacity=0,d.addEventListener("transitionend",function(){this.style.display="none",a.style.opacity=0,this.parentElement.appendChild(a),k(()=>{a.style.opacity=1})})},v=function(a){let d=new FormData(a),b=new XMLHttpRequest,e=a.querySelector('[type="submit"]');b.open("POST","form.php",!0),b.setRequestHeader("accept","application/json");let c=a.querySelector(".form__status");c||((c=document.createElement("div")).classList.add("form__status"),a.appendChild(c)),d.append("page",document.title),e.disabled=!0,b.send(d),b.onreadystatechange=function(){if(4===b.readyState)switch(b.status){case 200:u(a);break;case 404:c.innerHTML="\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D",e.disabled=!1,k(()=>{c.classList.add("form__status--showed")});break;default:c.innerHTML=b.responseText,e.disabled=!1,k(()=>{c.classList.add("form__status--showed")})}}};i.forEach(a=>{a.addEventListener("submit",function(a){a.preventDefault();let b=this.querySelectorAll("input"),c=!1;b.forEach(a=>{"phone"===a.getAttribute("name")?a.value.length<18&&(c=!0,t(a,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430!")):a.value.langth<2&&(c=!0,t(a,"\u0418\u043C\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435!"))}),c||v(a.target)})})})