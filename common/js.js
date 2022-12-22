// -------------------------------------------- styling input floor--------------------------
let footer = document.getElementById('footer');
let inputEmail = document.getElementById('footer__input');
let buttonSubmit = document.getElementById('footer__button-submit');
let buttonText = document.getElementById('footer__text-button');

let activity = true; // shadowing mode

inputEmail.addEventListener('change', demonstrate);
let regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

function demonstrate() {
   console.log('innerText: ', inputEmail.value);
   if (regExpEmail.test(inputEmail.value)) {
      console.log('validation is succseed');
   } else {
      console.log('validation denied');
      buttonSubmit.style.borderColor = '#D31414';
      buttonText.style.color = '#D31414';
      inputEmail.style.borderColor = '#D31414';
   }
}

function resetStyle() {
   buttonSubmit.style.borderColor = '#333B41';
   buttonText.style.color = '#000000';
   inputEmail.style.borderColor = '#F9804B';
   console.log('resetStyle');
}

footer.onclick = function (event) {
   console.log('footer was clicked');
   let target = event.target;
   // console.log('event.target: ', event.target);
   // console.log('this: ', this);
   // console.log('target.tagName: ', target.tagName);
   if (target == buttonText) {} else if (target == buttonSubmit) {} else resetStyle();
}
//-------------------------------burgerMenu--------------------------------------------
function openMenu() {
   
   let burgerMenu = document.querySelector('.header__burger-menu');
   let header = document.querySelector('.header');
   let headerLogo = document.querySelector('.header__logo');
   let shiftMenu = document.querySelector('.header__shift-menu');
   burgerMenu.classList.toggle('header__open-burger');
   header.classList.toggle('header-white');
   headerLogo.classList.toggle('header__logo-away');
   shiftMenu.classList.toggle('header__shift-menu-activ');
   // ----------------- shadowing option ----------------------------------
   shadowCover.classList.toggle('shadow_active'); //header
   footer.classList.toggle('footer_shadow');

   if (activity === true) {
      activity = false;
      shadowCover.style.height = (shadowCourtnHeight*2) + 'px';
   } else if (activity === false) {
      activity = true;
      shadowCover.style.height = 0 + 'px';
   }
}
// --------------------------------shadowing page (menuBurger) -----------------------------
let pageHeight = document.querySelector('.page').offsetHeight;
let footerHeight = footer.offsetHeight;
let shadowCourtnHeight = pageHeight + footerHeight;
var shadowCover = document.querySelector('.shadow');

function closeShadow() {
   openMenu();
}
// -------------------------------- sortingCardsArr -------------------------------------------------
let arrRandIndex = [];
let width_6 = 6,
    width_4 = 4;
let arrTwoDimens = [];
let collectionCards = document.querySelectorAll('.services__sets-animal');
let ammountCards = collectionCards.length;
let bodyPage = document.querySelector('.wrapper');
let arrAmmounts;

function indexRand() {
   arrRandIndex.push(getRandomInt(ammountCards));
   for (let i = 0; ammountCards > i; i++) {
      let index = getRandomInt(ammountCards);
      if (arrRandIndex.includes(index)) {
         i--;
      } else {
         arrRandIndex[i] = index;
      }
   }
 // console.log('arrRandIndex:', arrRandIndex);
}
indexRand();

function sortingCards__II(restrain) {
   let index = 0;
     arrTwoDimens.length = 0;
   for (let i = 0; arrAmmounts > i; i++) {
      arrTwoDimens.push([]);
      arrTwoDimens[i].length = restrain;
      for (let j = 0; restrain != j; j++) {
         // arrTwoDimens[i][j] = arrRandIndex.pop();
         arrTwoDimens[i][j] = arrRandIndex[index];
         index++;
         if (i === 0) {
            collectionCards[arrTwoDimens[i][j]].classList.add('active');
         }
         else{
            collectionCards[arrTwoDimens[i][j]].classList.remove('active');
         }
      }
   }
}

function sortingCards__I() {
   if (bodyPage.offsetWidth < 970) {
      arrAmmounts = Math.trunc(ammountCards / width_4);
      sortingCards__II(width_4);
   } else if (bodyPage.offsetWidth >= 970) {
      arrAmmounts = Math.trunc(ammountCards / width_6);
      sortingCards__II(width_6);
   }
 //  console.log('arrTwoDimens: ', arrTwoDimens);
}
sortingCards__I();

window.addEventListener('resize', function () {
   collectionCards.forEach(function (item, index) {
      collectionCards[index].classList.remove('active');
   });
   sortingCards__I();
   firstDimens = 0;
  // console.log(arrTwoDimens.length);
})
// --------------------------------randomizeCardsOrder-----------------------------------------------


let arrIndex = [];
let arrInactiv = [];

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}
(function visibling() {
   let count = ammountCards;
   let arrCards = [];
   while (count !== 0) {
      let index = getRandomInt(ammountCards);
      if (arrCards.includes(index)) {

      } else {
         arrCards.push(index);
         collectionCards[index].style.order = count;
         count--;
      }
   }
}());

// -------------------------------slideShow------------------------------------------

let rigthButton = document.querySelector('.services__circle-arrow-R');
let leftButton = document.querySelector('.services__circle-arrow-L');
let firstDimens = 0;
let permission = true;
let monitoring;
let container = document.querySelector('.services__container');
let animInterval = 1100;

rigthButton.onclick = toRight;
function toRight() {
   monitoring = 'right';
   if (permission === true) {
      hide('to-right');
      setTimeout(triger_R,animInterval);
   }
}
leftButton.onclick = toLeft;
function toLeft() {
   monitoring = 'left';
   if (permission === true) {
      hide('to-left');
      setTimeout(triger_L,animInterval);
   }
}

function checkCount() {
   if (firstDimens >= arrTwoDimens.length) {
      firstDimens = 0;
   }
   if (firstDimens < 0) {
      firstDimens = arrTwoDimens.length - 1;
   }
}

let count = 0;
function correctDimens() {
   if (arrTwoDimens[firstDimens].length === count) {
      count = 0;
      if (monitoring == 'left') {
         firstDimens--;
      }
      else if (monitoring == 'right') {
         firstDimens++;
      }
   }
}
function triger_L(){
   show('from-right');
}

function triger_R(){
   show('from-left');
}

function hide(direction) {
   if(arrTwoDimens[firstDimens] == 'undefined'){
      console.log({firstDimens});
   }
   if(permission === true){
      permission = false;
       arrTwoDimens[firstDimens].forEach(function (item, index) {
      collectionCards[arrTwoDimens[firstDimens][index]].classList.add('active', direction);
   });

   setTimeout(function deletingCss() {
         arrTwoDimens[firstDimens].forEach(function (item, index) {
            collectionCards[arrTwoDimens[firstDimens][index]].classList.remove('active', direction);
            count++;
            correctDimens();
            checkCount();
         })
         permission = true;
      }, animInterval);
   }
}

function show(direction){
   if(permission === true){
      permission = false;
       arrTwoDimens[firstDimens].forEach(function (item, index) {
      collectionCards[arrTwoDimens[firstDimens][index]].classList.add('active', direction);
   });
   console.log('show');
   setTimeout(function deletingCss() {
      arrTwoDimens[firstDimens].forEach(function (item, index) {
         collectionCards[arrTwoDimens[firstDimens][index]].classList.remove(direction);
      })
      permission = true;
   }, animInterval);
   }
}


// -------------------------------- sldeShow/swiping ----------------------------
 const swipeDetect = (el) =>{
   let startX = 0;
   let startY = 0;
   let distX = 0;
   let distY = 0;
   let startTime = 0;
   let elapsedTime = 0;

   let thresholdX = 150;
   let restraintY = 100;
   let allowedTime = 300;

   surfacePets.addEventListener('mousedown', function(e){
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      console.log({startX,startY,startTime});
      e.preventDefault();
    }, false);

    surfacePets.addEventListener('mouseup',function(e){
      elapsedTime = new Date().getTime() - startTime;
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      if(elapsedTime <= allowedTime){
         if (Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraintY){
               if(distX > 0){
            toRight();
         }
         else{
            toLeft();
         }
         }
      }
      e.preventDefault();
    },false);

    surfacePets.addEventListener('touchstart', function(e){
      console.log('check');
        if (e.target.classList.contains('services__circle-arrow-L')) {
         toLeft();
        }
        else if(e.target.classList.contains('services__circle-arrow-R')) {
         toRight();
        }
        var touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surfacePets.addEventListener('touchmove', function(e){
      e.preventDefault();
     // console.log(e);
  }, false);

  surfacePets.addEventListener('touchend', function(e){
   var touchobj = e.changedTouches[0];
   distX = touchobj.pageX - startX;
   distY = touchobj.pageY - startY;
   elapsedTime = new Date().getTime() - startTime;
   if (elapsedTime <= allowedTime){
       if (Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraintY){
           if (distX > 0) {
            toRight();
           }
           else {
            toLeft();
           }
       }
   }
   e.preventDefault();
}, false);

 }
 var surfacePets = document.querySelector('.services__container');
 swipeDetect(surfacePets);

 // -------------------------------swiperTestimonials-----------------------------------------------
 const swiperTestimonials = (el) =>{
 let surfaceTestimonials = document.querySelector('.testimonials__wrap-feedback-card');
 const lineDecor = document.querySelector('.testimonials__line-decor');
 const lineMarker = document.querySelector('.testimonials__line-marker');
 const wrapLine = document.querySelector('.testimonials__wrap-line');
 const collectTestimon = document.querySelectorAll('.testimonials__card');
 let body = document.querySelector('.body');
 let markerHover, markerSpot;
 let startX, moveX, equivalStep, prcntProgr = '0%';
 let visiblingCards = 4;
 let segment = 75;
 let stepPxl = 297;
 let stepCount = collectTestimon.length - visiblingCards;
 let stepPrcnt = 100 / (stepCount+1);
 lineMarker.style.left = prcntProgr;
 prcntProgr = prcntProgr.replace('%','');

 let pxlProgress = 0;
 let restrainPxl = 0;
 let iteratorCalc = 0;

 termsChanging();

lineDecor.onclick = function clickProgress(e){
  lineClicked = true;
  checkSwipe = false;
  startX = e.offsetX;
  if(markerClicked == false){
   interCalc(startX);
  }
  else{
   markerClicked = false;
  }
};

let markerClicked = false;
lineMarker.onclick = function(){
   markerClicked = true;
}
function interCalc(xCoord){
   let direction;
   prcntProgr = prcntProgr.replace('%','');
   prcntProgr = Number(prcntProgr);
   if(xCoord > pxlProgress){
    direction = 'right';
    equivalStep = Math.trunc(xCoord/segment);
    equivalStep = equivalStep - restrainPxl;
   }
   else if(xCoord < pxlProgress){
         direction = 'left';
    pxlProgress = pxlProgress - xCoord;
    equivalStep = Math.trunc(pxlProgress/segment);
    if(equivalStep * segment < xCoord && checkSwipe == false){equivalStep++;}
    else if(pxlProgress/xCoord >= 1 && checkSwipe == false){equivalStep++;}
    if(equivalStep < 1){equivalStep = 1}
   }
   while(equivalStep > 0){
    if(direction == 'left'){
       prcntProgr = prcntProgr - stepPrcnt;
       iteratorCalc--;
       surfaceTestimonials.style.right = (iteratorCalc*stepPxl)+'px';
       equivalStep--;
       restrainPxl--;
    }
    else if(direction == 'right'){
       prcntProgr = prcntProgr + stepPrcnt;
       iteratorCalc++;
       surfaceTestimonials.style.right = (iteratorCalc*stepPxl)+'px';
       equivalStep--;
       restrainPxl++;
    }
   }
   pxlProgress = restrainPxl * segment;
   prcntProgr = prcntProgr + '%';
   lineMarker.style.left = prcntProgr;
   iteratorSlide = iteratorCalc;
}
//      ------------- line progress -----------------
lineMarker.addEventListener('mousedown',function(){
   markerSpot = true;
 });

lineMarker.addEventListener('mousemove',function(){
   if(markerSpot == true){
       markerHover = true;
   }
 });

lineMarker.addEventListener('mouseleave',function(){
  markerHover = false;
 });

 wrapLine.addEventListener('mousemove',function(e){
   if(markerHover == false && markerSpot == true){
      moveX = e.offsetX;
         interCalc(moveX);
   }
 });

wrapLine.addEventListener('mouseup',function(e){
   markerHover = false;
   markerSpot = false;
 });

 surfaceTestimonials.addEventListener('transitionend',function(){
   checkSwipe = false;
 })

 var iteratorSlide = 0;
 var progressSwipe;

 let distX, distY, startY,
     startTime, elapsedTime;

 let thresholdX = 150;
 let restraintY = 100;
 let allowedTime = 300;

 function leftSliding(){
   if(iteratorSlide < stepCount){

   iteratorSlide++;
   progressSwipe = segment * iteratorSlide;
   interCalc(progressSwipe);
   }
 }

 function rightSliding(){
   if(iteratorSlide > 0){
   iteratorSlide--;
   progressSwipe = segment * iteratorSlide;
   interCalc(progressSwipe);
   }
 }
//           ------------- touch-swiping-PC -----------------
var checkSwipe = false;
 surfaceTestimonials.addEventListener('mousedown', function(e){
   startX = e.pageX;
   startY = e.pageY;
   startTime = new Date().getTime();
   e.preventDefault();
 }, false);

 surfaceTestimonials.addEventListener('mouseup',function(e){
   elapsedTime = new Date().getTime() - startTime;
   distX = e.pageX - startX;
   distY = e.pageY - startY;
   if(elapsedTime <= allowedTime){
      if (Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraintY){
         checkSwipe = true;
            if(distX > 0){
         rightSliding();
      }
      else if(distX < 0){
         leftSliding();
      }
      }
   }
   e.preventDefault();
 },false);

 //         --------------- touch-swiping-Mobile ---------------
 let permissionScrollPage = 20;
 let startPageX, endPageX;
 switherTouch = true;
 surfaceTestimonials.addEventListener('touchstart', function(e){
   console.log("");
   var touchobj_start = e.changedTouches[0];
   startPageX = touchobj_start.pageX;
 });
 surfaceTestimonials.addEventListener('touchmove', function(e){
   var touchobj_end = e.changedTouches[0];
   endPageX = touchobj_end.pageX;
   let distance = Math.abs(endPageX - startPageX);

   if(permissionScrollPage > distance){
      if(switherTouch == true){
         swiping();
         switherTouch = false;
      }
      
   }
}, false);

function swiping(){


 surfaceTestimonials.addEventListener('touchstart', function(e){
   var touchobj = e.changedTouches[0];
   startX = touchobj.pageX;
   startY = touchobj.pageY;
   startTime = new Date().getTime();
   e.preventDefault();
});

surfaceTestimonials.addEventListener('touchmove', function(e){checkSwipe = true;
e.preventDefault();
}, false);

surfaceTestimonials.addEventListener('touchend', function(e){
var touchobj = e.changedTouches[0];
distX = touchobj.pageX - startX;
distY = touchobj.pageY - startY;
elapsedTime = new Date().getTime() - startTime;
if (elapsedTime <= allowedTime){
  if (Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraintY){
   
      if (distX > 0) {
         console.log('check');
         rightSliding();
      }
      else if(distX < 0){
         leftSliding();
         console.log('check-1');
      }
  }
}
e.preventDefault();
}, false);
}

 //                ------------------ pop-up ------------------
 let blockTestimon = document.querySelector('.testimonials__about');
 let popUpClicked = false;
 let popUp, wrapPopUp;
 let crossElement = "<div class='cross'></div>";
 collectTestimon.forEach(function(item,index){
   item.addEventListener('click',function(item){
      if(checkSwipe == false){
         if(popUpClicked == false){
        // console.log(item.target,'e.target');
        // console.log(this,'this');
         popUp = document.createElement('div');
         popUp = this.cloneNode(true);
         popUp.classList.add('pop-up');
         wrapPopUp = document.createElement('div');
         wrapPopUp.innerHTML = crossElement;
         wrapPopUp.classList.add('wrap-pop-up');
         wrapPopUp.appendChild(popUp);
         blockTestimon.appendChild(wrapPopUp);
         popUpClicked = true;
         }
         wrapPopUp.addEventListener('mousedown',function(item,index){
            if(item.target.classList.contains('wrap-pop-up') && popUpClicked == true
               || item.target.classList.contains('cross') && popUpClicked == true){
               wrapPopUp.remove();
               console.log(popUpClicked);
               popUpClicked = false;
            }
         });
      }
       popUp.addEventListener('mouseup',function(item,index){
         if(item.target.classList.contains('testimonials__text-feedback')){
            item.target.classList.add('scroll');
         }
        });
   });
 });
 collectTestimon.forEach(function(item,index){
   item.addEventListener('touchend',function(item){
      if(checkSwipe == false){
         if(popUpClicked == false){
         popUp = document.createElement('div');
         popUp = this.cloneNode(true);
         popUp.classList.add('pop-up');
         wrapPopUp = document.createElement('div');
         wrapPopUp.innerHTML = crossElement;
         wrapPopUp.classList.add('wrap-pop-up');
         wrapPopUp.appendChild(popUp);
         blockTestimon.appendChild(wrapPopUp);
         popUpClicked = true;
         }
         wrapPopUp.addEventListener('touchstart',function(item,index){
            if(item.target.classList.contains('wrap-pop-up') && popUpClicked == true
               || item.target.classList.contains('cross') && popUpClicked == true){
               wrapPopUp.remove();
               console.log(popUpClicked);
               popUpClicked = false;
            }
         });
      }
       popUp.addEventListener('touchend',function(item,index){
         if(item.target.classList.contains('testimonials__text-feedback')){
            item.target.classList.add('scroll');
         }
        });
   });
 });


//                  ---------------- adaptive -----------------


function termsChanging(){

   if(body.offsetWidth > 1216){
   visiblingCards = 4;
   stepCount = collectTestimon.length - visiblingCards;
   segment = lineDecor.offsetWidth / (stepCount+1);
   stepPrcnt = 100 / (stepCount+1);
   stepPxl = 297;
   }

   else if(body.offsetWidth < 1216 && body.offsetWidth > 981){
   visiblingCards = 3;
   stepCount = collectTestimon.length - visiblingCards;
   segment = lineDecor.offsetWidth / (stepCount+1);
   stepPrcnt = 100 / (stepCount+1);
   stepPxl = 324;
   // console.log({stepPrcnt});
   // console.log({segment});
   // console.log({stepCount});
   // console.log(lineDecor.offsetWidth);
   }
   else if(body.offsetWidth < 981){
      visiblingCards = 3;
      stepCount = Math.trunc(collectTestimon.length / visiblingCards);
      segment = lineDecor.offsetWidth / (stepCount+1);
      stepPrcnt = 100 / (stepCount+1);
      stepPxl = body.offsetWidth;
   }
}


 window.addEventListener('resize',function(){

   setTimeout(termsChanging, 1000);
 })
};
   ;
 swiperTestimonials(testimonialsContainer);
 var testimonialsContainer = document.querySelector('.testimonials__about');


