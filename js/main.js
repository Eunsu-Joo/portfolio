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
        body = document.body,
        introduce = document.querySelector('#introduce'),
        profile = document.querySelector('#profile'),
        publishing = document.querySelector('#publishing'),
        samples = document.querySelector('#sample'),
        contact = document.querySelector('#contact'),
        puLeftBtn = document.querySelector('.pu-left-btn'),
        puRightBtn = document.querySelector('.pu-right-btn'),
        puImgSlide = document.querySelector('.pu-slide'),
        puSlideItem = document.querySelector('.pu-slideBox'),
        naviList = document.querySelectorAll('#header nav ul li'),
        section = document.querySelectorAll('section'),
        cloudTitle = document.querySelector('#sample h2'),
        clouds = document.querySelector('.clouds');

    //해더 함수
    function headerFunc() {
        fadeOut(header, 100);
        setTimeout(function () {
            fadeIn(header, 100);
            header.classList.add('sticky');
        }, 1000);
        setTimeout(function () {
            fadeIn(main,100);
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

    //인트로, 이력서 클릭 시 페이지 이동

    const gotoIntroBtn = document.querySelector('.gotoIntro');
    gotoIntroBtn.addEventListener('click', function () {
        location.href = 'index.html';
    })


    //퍼블리싱 클릭 시 article이동
    let slideWidth = puSlideItem.clientWidth;
    let i = 1;

    puRightBtn.addEventListener('click', function () {
        if (i == 6) return;
        puImgSlide.style.left = -slideWidth * i + 'px';
        i++;
    })
    puLeftBtn.addEventListener('click', function () {
        if (i == 1) return;
        puImgSlide.style.left = -slideWidth * (i - 2) + 'px';
        i--;
    })

    //스킬바 attribute가져오기
    const skillBars = document.querySelectorAll('.bar-progress');
    for (let i = 0; i < skillBars.length; i++) {
        const barWidth = skillBars[i].getAttribute('data-rate');
        skillBars[i].style.width = barWidth + '%';
    }


    // 스크롤 이벤트
    window.addEventListener('scroll', function () {
        //현재 스크롤 값
        let currentScroll = window.scrollY;
        /*1. intro : 0 , 2. profile : 970, 3. pub : 1936 , 4:sample : 2902 +- 시켜서 자연스럽게 이어지도록 설정
         */
        // 해더 스크롤
        if (currentScroll > 0) {
            introduce.classList.add('active');
            header.classList.add('active');
        } else {
            introduce.classList.remove('active');
            header.classList.remove('active');
        }

        // intro 스크롤에 따라 클래스 제어 - 프로필에 도달했을 떄
        if (currentScroll > profile.offsetTop) {
            document.querySelector('.move-area').classList.remove('active');

        } else {
            document.querySelector('.move-area').classList.add('active');
        }

        // profile 행성 클래스 제어
        if (currentScroll >= introduce.offsetTop && currentScroll < publishing.offsetTop + 100) {
            profile.classList.add('show');
        } else {
            profile.classList = 'remove';
        }

        //samplese 구름 클래스, 타이틀 제어
        if (currentScroll >= publishing.offsetTop + 200 && currentScroll < samples.offsetTop+50) {
            clouds.classList.add('cloudsAni');
            //parallax title
            cloudTitle.style.marginBottom = currentScroll - 1100 * 2 + 'px';
        } else {
            clouds.classList.remove('cloudsAni');
        }
        if (currentScroll>samples.offsetTop) {
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
            document.querySelector('#contact .img-container').classList.add('active');
        } else{
document.querySelector('#contact .img-container').classList.remove('active');
        }




        //네비게이션스크롤

        for (let i = 0; i < naviList.length; i++) {
            naviList[i].classList.remove('naviCurrent');
        }
        let currentScroll2 = 0;
        //1. 기준을 bottom(innerHeight)로 설정하기 위해 변수 선언

        if (beforeScroll < currentScroll) { // 내려갈 때
            currentScroll2 = currentScroll;
            //스크롤2 = 현재 스크롤

        } else { // 올라갈 때 - 기준을 bottom으로 할 떄
            currentScroll2 = currentScroll + window.innerHeight;
            //스크롤2 = 현재 스크롤의 기준을 innerHeight로 바꿈
        }


        if (currentScroll > profile.offsetTop - 120 && currentScroll2 <= publishing.offsetTop) {
            naviList[0].classList.add('naviCurrent');
        }

        if (currentScroll2 > publishing.offsetTop && currentScroll2 <= samples.offsetTop) {
            naviList[1].classList.add('naviCurrent');
        }

        if (currentScroll2 > samples.offsetTop && currentScroll2 <= contact.offsetTop) {
            naviList[2].classList.add('naviCurrent');
        }

        if (currentScroll2 > contact.offsetTop) {
            naviList[3].classList.add('naviCurrent');

        }
        beforeScroll = currentScroll;
    })

    let beforeScroll = 0;
    //1. 이전 스크롤과 현재 스크롤을 비교하기 위해 변수 선언
    

})();
