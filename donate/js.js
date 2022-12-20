// ----------------- shadowDonateFooter ----------------------//

let footer = document.getElementById('footer');
let footerCourtain = document.querySelector('.footer__shadowing-donate');

let mainContainer = document.querySelector('.page-wrap');
let bodyCourtain = document.querySelector('.page-shadow');

let switcherShadow = false;

function activityShadowing(){
let heightFooter = footer.offsetHeight;
let heightMain = mainContainer.offsetHeight;
console.log(switcherShadow);
console.log({heightFooter},{heightMain});
    if(switcherShadow == false){
        bodyCourtain.style.height = heightMain + 'px';
        footerCourtain.style.height = heightFooter + 'px';
       switcherShadow = true;
    }
    else if(switcherShadow == true){
        bodyCourtain.style.height = 0 + 'px';
        footerCourtain.style.height = 0 + 'px';
       switcherShadow = false;
    }
}

function clickShadowDonate(){
    openMenu();
}
  function openMenu() {
    activityShadowing();
    let burgerMenu = document.querySelector('.header__burger-menu');
    let header = document.querySelector('.header');
    let headerLogo = document.querySelector('.header__logo');
    let shiftMenu = document.querySelector('.header__shift-menu');
    burgerMenu.classList.toggle('header__open-burger');
    header.classList.toggle('header-white');
    headerLogo.classList.toggle('header__logo-away');
    shiftMenu.classList.toggle('header__shift-menu-activ');

  }
// ------------------------- donation -------------------------------- //
const inputDollar = document.querySelector('.donation-manual__input');
let dietDays = document.querySelector('.day-period___number');
let dotDollar = document.querySelectorAll('.dollars-ammount__dots');
let block_2 = document.querySelector('.main-information');
let dollarAmmount = document.querySelectorAll('.dollars-ammount__dollars');

block_2.addEventListener('click', function (e) {
    if (e.target == inputDollar) {
        inputDollar.style.color = '#4B9200';
    } else {
        inputDollar.style.color = '#929699';
    }
});
let numberInp;
inputDollar.addEventListener('input', function () {
    numberInp = inputDollar.value;
    numberInp = parseFloat(numberInp);
    if (numberInp >= 1) {
        inputDollar.style.color = '#4B9200';
    } else if (numberInp <= 0) {
        inputDollar.style.color = '#D31414';
    } else {
        inputDollar.style.color = '#D31414';
    }
    let resultDay = numberInp / 250;
    if (resultDay <= 0) {
        dietDays.innerText = 0;
    } else if (resultDay > 0) {
        dietDays.innerText = resultDay;
    }
    dotDollar.forEach(function (item, index) {
        if(item.id == numberInp){
            emphasizing(item,index);
        }
    })
});

dotDollar.forEach(function (item, index) {
    item.addEventListener('click', function() {
        let dollar = item.id;
        inputDollar.value = dollar;
        let resultDay;
        resultDay = Number(inputDollar.value) / 250;

        if (resultDay <= 0) {
            dietDays.innerText = 0;
        }
        else if (resultDay > 0) {
            dietDays.innerText = resultDay;
        }
    })
});

let counter = 0;
let previousIndex;
initialDonate = 5;

dotDollar[initialDonate].insertAdjacentHTML('afterbegin', '<div class="activated-dots"></div>');

dotDollar.forEach(function (item, index) {
    item.addEventListener('click', function () {
        console.log({previousIndex},{index});
        emphasizing(item,index);
    })
});



function emphasizing(item,index){
    if (previousIndex != index || previousIndex == 'undefined'){
        item.insertAdjacentHTML('afterbegin', '<div class="activated-dots"></div>');
    }
    let circles = document.querySelectorAll('.activated-dots');
    console.log(circles);

    dollarAmmount[index].classList.add('recolor-donate');

    if (counter == 0 && index > initialDonate) {
        previousIndex = index;
        circles[0].remove();
        dollarAmmount[initialDonate].classList.remove('recolor-donate');
    }
    else if(counter == 0 && index < initialDonate){
         previousIndex = index;
         circles[1].remove();
         dollarAmmount[initialDonate].classList.remove('recolor-donate');
    }

    counter++;
    if (previousIndex < index) {
        circles[0].remove();
        dollarAmmount[previousIndex].classList.remove('recolor-donate');
    }
    else if (previousIndex > index) {
        circles[1].remove();
        dollarAmmount[previousIndex].classList.remove('recolor-donate');
    }
    previousIndex = index;
}