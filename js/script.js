const windowW = window.innerWidth || document.body.clientWidth
const bigTitle = document.querySelectorAll('.big-title>ul>li')
const mobilelist = document.querySelectorAll('.small-list>ul>li')

//메뉴
document.querySelector('.menu-list-01').addEventListener('mouseenter',()=>{
    document.querySelector('.menu-list-section').style.display='block';
    document.querySelector('.menu-list-area1').style.display='flex';
    document.querySelector('.menu-list-area2').style.display='none';
    document.querySelector('.menu-list-area3').style.display='none';
})

document.querySelector('.menu-list-02').addEventListener('mouseenter',()=>{
    document.querySelector('.menu-list-section').style.display='block';
    document.querySelector('.menu-list-area2').style.display='flex';
    document.querySelector('.menu-list-area1').style.display='none';
    document.querySelector('.menu-list-area3').style.display='none';
})
document.querySelector('.menu-list-03').addEventListener('mouseenter',()=>{
    document.querySelector('.menu-list-section').style.display='block';
    document.querySelector('.menu-list-area3').style.display='flex';
    document.querySelector('.menu-list-area1').style.display='none';
    document.querySelector('.menu-list-area2').style.display='none';
})

document.getElementById('header').addEventListener('mouseleave',()=>{
    document.querySelector('.menu-list-section').style.display='none';
})

//바메뉴
document.querySelector('.menu-bar').onclick = ()=>{
    document.getElementById('menu-area').style.left='0'
    document.body.classList.add("menuActive")
}
document.querySelector('.menu-bar2').onclick = ()=>{
    document.getElementById('menu-area').style.left='100%'
    document.body.classList.remove("menuActive")
   for(let j = 0; j < bigTitle.length; j++){
      bigTitle[j].classList.remove('on');
      }
    document.querySelector(".work-title").classList.add("on")
    document.querySelector(".work-list").classList.add("active")
    
    for(let i = 0; i < mobilelist.length; i++){
      mobilelist[i].classList.remove('on');
      mobilelist[0].classList.add('on');
      mobilelist[8].classList.add('on');
      mobilelist[14].classList.add('on');
    }
  
}

//saerch
document.getElementById('search2').onclick = ()=>{
    document.querySelector('.menu-header-area').style.display='none'
    document.querySelector('.menu-header-area-search').style.display='block'
}
document.querySelector('.menu-bar3').onclick = ()=>{
    document.querySelector('.menu-header-area').style.display='block'
    document.querySelector('.menu-header-area-search').style.display='none'
}

//모바일 메뉴 리스트
//빅타이틀
for(let i = 0; i < bigTitle.length; i++){
    bigTitle[i].addEventListener('click', function(e){
      e.preventDefault();
      for(let j = 0; j < bigTitle.length; j++){
        bigTitle[j].classList.remove('on');
      }
      this.classList.add('on');
      mobileToggle()
    });
  }

//작은 타이틀 전환
function mobileToggle(){
    if(document.querySelector(".work-title").classList.contains("on")){
      document.querySelector(".work-list").classList.add("active")
      for(let i = 0; i < mobilelist.length; i++){
        mobilelist[i].classList.remove('on');
        mobilelist[0].classList.add('on');
      }
    }else{ document.querySelector(".work-list").classList.remove("active")}

    if(document.querySelector(".participation-title").classList.contains("on")){
      document.querySelector(".participation-list").classList.add("active")
      for(let i = 0; i < mobilelist.length; i++){
        mobilelist[i].classList.remove('on');
        mobilelist[8].classList.add('on');
      }
    }else{ document.querySelector(".participation-list").classList.remove("active")}

    if(document.querySelector(".introduce-title").classList.contains("on")){
      document.querySelector(".introduce-list").classList.add("active")
      for(let i = 0; i < mobilelist.length; i++){
        mobilelist[i].classList.remove('on');
        mobilelist[14].classList.add('on');
      }
    }else{ document.querySelector(".introduce-list").classList.remove("active")}
}

//작은타이틀 토글
for(let i = 0; i < mobilelist.length; i++){
    mobilelist[i].querySelector('.small-list-title').addEventListener('click', function(e){
      e.preventDefault();
      for(let j = 0; j < mobilelist.length; j++){
        mobilelist[j].classList.remove('on');
      }
      this.parentNode.classList.add('on');
    });
  }

//자동 슬라이드
let list = document.querySelector('.slide-list');
let items = document.querySelectorAll('.slide-item');
const paginations = document.querySelector('.paginations');
const lastIndex = items.length - 1;
const prev = document.querySelector('.control-area>.container>.left');
const next = document.querySelector('.control-area>.container>.right');
const play = document.querySelector('.play');
const pause =  document.querySelector('.pause');
let selected = 0;
let interval;
let w;

//흰색 원 무한 재생
function rightBtnW(){
  next.classList.remove('active')
  void play.offsetWidth;
  next.classList.add('active')
}

whiteCricleInfinite();
function whiteCricleInfinite(){
    w = setInterval(rightBtnW,5000)
}

const setTransition = (value) => {
  list.style.transition = value;
};

const setTranslate = ({ index, reset }) => {
  if (reset) list.style.transform = `translate(-${list.clientWidth}px, 0)`;
  else list.style.transform = `translate(-${(index + 1) * list.clientWidth}px, 0)`;
};

const activePagination = (index) => {
  [...paginations.children].forEach((pagination) => {
    pagination.classList.remove('on');
  });
  paginations.children[index].classList.add('on');
};

const handlePagination = (e) => {
  if (e.target.dataset.num) {
    selected = parseInt(e.target.dataset.num);
    setTransition('all 0.3s linear');
    setTranslate({ index: selected });
    activePagination(selected);

    clearInterval(interval)
    autoplay({ duration: 5000 });
   
    clearInterval(w)
    rightBtnW();
    whiteCricleInfinite();

    if(play.classList.contains("on")){
      clearInterval(interval)
      clearInterval(w)
    }
  }
};
const handlePrev = () => {
  selected -= 1;
  setTransition('transform 0.3s linear');
  setTranslate({ index: selected });
  
  clearInterval(interval)
  autoplay({ duration: 5000 });

  clearInterval(w)
  rightBtnW();
  whiteCricleInfinite();

  if (selected < 0) {
    selected = lastIndex;
    setTimeout(() => {
      setTransition('');
      setTranslate({ index: selected });
    }, 300);
  }
  if (selected >= 0) activePagination(selected);

  if(play.classList.contains("on")){
    clearInterval(interval)
    clearInterval(w)
    clearInterval(interval)
  }
};

const handleNext = () => {
  selected += 1;
  setTransition('transform 0.3s linear');
  setTranslate({ index: selected });
  
  clearInterval(interval)
  autoplay({ duration: 5000 });
  
  clearInterval(w)
  rightBtnW();
  whiteCricleInfinite();

  if (selected > lastIndex) {
    selected = 0;
    setTimeout(() => {
      setTransition('');
      setTranslate({ index: selected });
    }, 300);
  }
  if (selected <= lastIndex) activePagination(selected);

  if(play.classList.contains("on")){
    clearInterval(interval)
    clearInterval(w)
    clearInterval(interval)
  }
};
const button = ()=>{
  prev.addEventListener('click', handlePrev);
  next.addEventListener('click', handleNext);
}

const makePagination = () => {
  if (items.length > 1) {
    for (let i = 0; i < items.length; i++) {
      const button = document.createElement('button');
      button.dataset.num = i;
      button.classList.add('pagination');
      if (i === 0) {
        button.classList.add('on');
      }
      paginations.appendChild(button);
      paginations.addEventListener('click', handlePagination);
    }
  }
};

const cloneElement = () => {
  list.prepend(items[lastIndex].cloneNode(true));
  list.append(items[0].cloneNode(true));
  setTranslate({ reset: true });
};

const autoplayIterator = () => {
  selected += 1;
  setTransition('all 0.3s linear');
  setTranslate({ index: selected });
  if (selected > lastIndex) {
    activePagination(0);
    clearInterval(interval);
    setTimeout(() => {
      selected = 0;
      setTransition('');
      setTranslate({ reset: true });
      autoplay({ duration: 5000 });
      clearInterval(w)
      whiteCricleInfinite();
    }, 300);
  }
  if (selected <= lastIndex) activePagination(selected);
};

const autoplay = ({ duration }) => {
  interval = setInterval(autoplayIterator, duration);
};

const render = () => {
  makePagination();
  cloneElement();
  button();
  autoplay({ duration: 5000 });
};
render();

//헤더 이미지 사이즈 조절
window.addEventListener(`resize`, function() {
  setTranslate({ index: selected })
});


//slide영역 높이
slideinterval()
function slideinterval(){
  if(windowW>=1200){
    setInterval(function(){
      let slideH =document.querySelector('.slide-img').clientHeight;
      document.getElementById('slide').style.height = slideH+'px'
    },100)
  }
}

//멈춤 재생 버튼

pause.onclick = ()=>{
  pause.style.display='none'
  pause.classList.remove('on');
  play.style.display='block'
  play.classList.add('on');
  clearInterval(interval)
  clearInterval(w)
}
play.onclick = ()=>{
  play.style.display='none'
  play.classList.remove('on');
  pause.style.display='block'
  pause.classList.add('on');
  autoplay({ duration: 5000 });
  rightBtnW();
  whiteCricleInfinite();
}



//후원금액
const amount = document.querySelectorAll('.amount > li > button')
const amountLi = document.querySelectorAll('.amount > li')
const period = document.querySelectorAll('.period-area>li')

for(let i = 0; i < amount.length; i++){
  amount[i].addEventListener('click', function(){
    for(let j = 0; j < amount.length; j++){
      amount[j].classList.remove('click');
    }
    this.classList.add('click');
  });
}

document.querySelector(".amount>li>.thirty_thousand").addEventListener("click", function() {
  document.querySelector(".period-area>li.fifty_thousand").classList.remove("active")
  document.querySelector(".period-area>li.hundred_thousand").classList.remove("active")
  document.querySelector(".period-area>li.thirty_thousand").classList.add("active")
  document.querySelector('.period-big').innerText ="30,000원"
});
document.querySelector(".amount>li>.fifty_thousand").addEventListener("click", function() {
  document.querySelector(".period-area>li.thirty_thousand").classList.remove("active")
  document.querySelector(".period-area>li.hundred_thousand").classList.remove("active")
  document.querySelector(".period-area>li.fifty_thousand").classList.add("active")
  document.querySelector('.period-big').innerText ="50,000원"
});
document.querySelector(".amount>li>.hundred_thousand").addEventListener("click", function() {
  document.querySelector(".period-area>li.thirty_thousand").classList.remove("active")
  document.querySelector(".period-area>li.fifty_thousand").classList.remove("active")
  document.querySelector(".period-area>li.hundred_thousand").classList.add("active")
  document.querySelector('.period-big').innerText ="100,000원"
});

//뉴스 슬라이드

let newsItemsW=document.querySelector('.news-bottom>ul>li').scrollWidth;

document.querySelector('.right-btn').onclick=()=>{
  document.querySelector('.news-bottom').scrollLeft += newsItemsW+30;
}
document.querySelector('.left-btn').onclick=()=>{
  document.querySelector('.news-bottom').scrollLeft -= newsItemsW+30;
}

//이벤트 배너 슬라이드

function event_area(){
  let eventItemsW=document.querySelector('.evet-banner>ul>li').scrollWidth;
  document.querySelector('.evnet-right-btn').onclick=()=>{
    document.querySelector('.evet-banner').scrollLeft += eventItemsW;
  }
  document.querySelector('.evnet-left-btn').onclick=()=>{
    document.querySelector('.evet-banner').scrollLeft -= eventItemsW;
  }
}
setInterval(event_area,100)

//후원자 슬라이드
let peopleItemsW=document.querySelector('.people-bottom>ul>li').scrollWidth;

document.querySelector('.people-right-btn').onclick=()=>{
  document.querySelector('.people-bottom').scrollLeft += newsItemsW+80;
}
document.querySelector('.people-left-btn').onclick=()=>{
  document.querySelector('.people-bottom').scrollLeft -= newsItemsW+80;
}


//후원 기업 로고 슬라이드
setInterval(() => {
  document.querySelector('.enterprise').scrollLeft+=document.querySelector('.enterprise>ul>li').scrollWidth;}, 2500);
  