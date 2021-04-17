//인트로 끝나면 해더 딜레이 되면서 페이드인
//location으로 연결
//이 페이지에 사용할 함수
//1: 해더 페이지 딜레이 후 타임아웃 되서 해더 상단에 붙는 부분
(function () {
    //페이드 인 페이드아웃함수

    function fadeIn(target, time) {
        let level = 0,
            inTimer = null;
        inTimer = setInterval(function () {
            level = level + 0.1;
            changeOpacity(target, level);
            if (level > 1) {
                clearInterval(inTimer);
            }
        }, time)
    }
    function fadeOut(target, time) {
        let level = 1;
        let inTimer = null;
        inTimer = setInterval(function () {
            level = level - 0.1;
            changeOpacity(target, level);
            if (level < 0) {
                clearInterval(inTimer);
            }
        })
    }
    /**
     * opacity를 조절해 주는 함수 
     * @param {바꿔야 하는 엘리먼트} target 
     * @param {opacity 숫자} level 
     */
    function changeOpacity(target, level) {
        let obj = target;
        obj.style.opacity = level;
        obj.style.Mozopacity = level;
        obj.style.KhtmlOpacity = level;
        obj.style.filter = 'alpha(opacity=' + (level * 100) + ')';
    }

    //사용할 변수 선언
    const header = document.querySelector('#header'),
        main = document.querySelector('main'),
        body = document.body;
        const introduce = document.querySelector('#introduce'),
        profile = document.querySelector('#profile'),
        publishing = document.querySelector('#publishing'),
        samples = document.querySelector('#sample'),
        puLeftBtn = document.querySelector('.pu-left-btn'),
        puRightBtn = document.querySelector('.pu-right-btn'),
        puImgSlide = document.querySelector('.pu-slide'),
        puSlideItem = document.querySelector('.pu-slideBox'),
        naviList = document.querySelectorAll('#header nav ul li'),
        section = document.querySelectorAll('section');

    //해더 함수
    function headerFunc() {
        fadeOut(header, 100);
        setTimeout(function () {
            fadeIn(header, 100);
            header.classList.add('sticky');
        }, 1000);
        setTimeout(function () {
            fadeIn(main);
            document.body.classList.add('sticky');
        }, 2500)
    }

    //네비 클릭 시 해당 섹션이동, 네비 클래스 넣기
    function headerNaviFunc() {
        //클릭했을 때 스크롤 이동, 클래스 부여
        //네비 클릭 했을 때 할 함수 
        for (let i = 0; i < naviList.length; i++) {
            const navi = naviList[i]; // i: 0-> about me, 1-> web p.., 2-> samp.., 3->
            navi.addEventListener('click', function (e) {
                // naviList[i].classList.remove();
                // naviList.forEach((n, i) => { // ES6의 고차함수 (map, forEach, reduce, ...)
                //     n.classList.remove('naviCurrent');
                // });
                for (let ii = 0; ii < naviList.length; ii++) {
                    const n = naviList[ii];
                    n.classList.remove('naviCurrent');
                }
                // 1. 네비 리스트가 갖고 있는 클래스 지우기
                e.preventDefault();
                section[i + 1].scrollIntoView({ block: 'end', behavior: 'smooth' });
                //2. 클릭 했을 때 각각의 섹션으로 이동
                this.classList.add('naviCurrent');
                //3. 현재 클릭한 this의 클래스 부여
            })
        }
    }
    headerFunc();
    headerNaviFunc();


    //퍼블리싱 클릭 시 article이동
    let slideWidth = puSlideItem.clientWidth;
    let i = 1;

    puRightBtn.addEventListener('click', function () {
        if (i == 6) return;
        puImgSlide.style.left = -slideWidth * i + 'px';
        i++;
        console.log(i);
    })
    puLeftBtn.addEventListener('click', function () {
        if (i == 1) return;
        puImgSlide.style.left = -slideWidth * (i - 2) + 'px';
        i--;
        console.log(i);
    })




    //인트로, 이력서 클릭 시 페이지 이동

    const gotoIntroBtn = document.querySelector('.gotoIntro');
    gotoIntroBtn.addEventListener('click', function () {
        fadeOut(body, 500);
        location.href = 'index.html';
    })



    //life 배경이미지 슬라이드
    function changeBg() {
        const images = [
            'url("./images/bg1.jpg")',
            'url("./images/bg2.jpg")',
            'url("./images/bg3.jpg")',
            'url("./images/bg4.jpg")',
            'url("./images/bg5.jpg")',
            'url("./images/bg6.jpg")',
            'url("./images/bg7.jpg")',
            'url("./images/bg8.jpg")',
            'url("./images/bg9.jpg")',
            'url("./images/bg10.jpg")',
        ]

        const section = document.querySelector('#contact .img-container')
        const bg = images[Math.floor(Math.random() * images.length)];
        section.style.backgroundImage = bg;
    }

    let timer = setInterval(changeBg, 2000);

    //스킬바 attribute가져오기
    const skillBars = document.querySelectorAll('.bar-progress');
    console.log(skillBars);
    for (let i = 0; i < skillBars.length; i++) {
        const barWidth = skillBars[i].getAttribute('data-rate');
        console.log(barWidth);
        skillBars[i].style.width = barWidth + '%';
    }


    //구름 element
    const cloudTitle = document.querySelector('#sample h2');
    const clouds = document.querySelector('.clouds');

    // 스크롤 이벤트
    window.addEventListener('scroll', function () {
        //현재 스크롤 값
        let currentScroll = window.scrollY;

        /*1. intro : 0 , 2. profile : 970, 3. pub : 1936 , 4:sample : 2902 +- 시켜서 자연스럽게 이어지도록 설정
         */
        // 해더 스크롤
        if (currentScroll > 0) {
            introduce.classList.add('active');
        } else {
            introduce.classList.remove('active');
        }
        if (currentScroll >= 100) {
            header.style.backgroundColor = 'rgba(0,0,0,0.3)';
            //해더 스크롤 했을 때, 현재 스크롤 위치가 100 이상이면 배경색 변경
        } else {
            header.style.backgroundColor = 'inherit';
            //100 이하이면 배경은 inherit
        }

        // intro 스크롤에 따라 클래스 제어
        if (currentScroll > 750) {
            document.querySelector('.move-area').classList.remove('active');

        } else {
            document.querySelector('.move-area').classList.add('active');
        }

        // profile 행성 클래스 제어
        if (currentScroll >= 750 && currentScroll < 2336) {
            profile.classList.add('show');
        } else {
            profile.classList = 'remove';
        }

        //samplese 구름 클래스, 타이틀 제어
        if (currentScroll >= 1836 && currentScroll < 3152) {
            clouds.classList.add('cloudsAni');
            cloudTitle.style.marginBottom = currentScroll - 1150 * 2 + 'px';
        } else {
            clouds.classList.remove('cloudsAni');
        }
        if (3152 < currentScroll) {
            document.addEventListener('mousemove', function (e) {
                this.querySelectorAll('.layer').forEach(layer => {
                    //arrow function은 para가 하나일 경우 이렇게 쓸 수도 있음.
                    const speed = layer.getAttribute('data-speed');
                    //window.innerWidth/2 - 가운데를 기준으로 움직이게 하기 위해서
                    //speed/90 마우스 무브 속도
                    const x = -(window.innerWidth / 2 - e.clientX) * speed / 90;
                    const y = -(window.innerWidth / 2 - e.clientY) * speed / 90;
                    layer.style.transform = `translateX(${x}px) translateY(${y}px)`
                })
            })
        }
        console.log(currentScroll);
        //네비게이션스크롤
        for(let l=0 ; l<naviList.length ; l++){
            naviList[l].classList.remove('naviCurrent');
            if (currentScroll >882 && currentScroll <=2016) {
                naviList[0].classList.add('naviCurrent');
            } 
            if (currentScroll > 2016 && currentScroll <= 2900) {
                naviList[1].classList.add('naviCurrent');
            } 
            if (currentScroll > 2900 && currentScroll <= 3906) {
                naviList[2].classList.add('naviCurrent');
            } 
            if (currentScroll > 3906 && currentScroll <= 7000) {
                naviList[3].classList.add('naviCurrent');
            } 
        }

    })


})();
