//인트로 끝나면 해더 딜레이 되면서 페이드인
//location으로 연결
//이 페이지에 사용할 함수
//1: 해더 페이지 딜레이 후 타임아웃 되서 해더 상단에 붙는 부분
(function(){
      //페이드 인 페이드아웃함수

      function fadeIn(target,time){
        let level = 0,
        inTimer = null;
        inTimer = setInterval(function(){
            level = level+0.1;
            changeOpacity(target,level);
            if(level>1){
                clearInterval(inTimer);
            }
        },time)
    }
    function fadeOut(target,time){
        let level =1;
        let inTimer = null;
        inTimer = setInterval(function(){
            level = level-0.1;
            changeOpacity(target,level);
            if(level<0){
                clearInterval(inTimer);
            }
        })
    }
/**
 * opacity를 조절해 주는 함수 
 * @param {바꿔야 하는 엘리먼트} target 
 * @param {opacity 숫자} level 
 */
    function changeOpacity(target,level){
        let obj = target;
        obj.style.opacity = level;
        obj.style.Mozopacity = level;
        obj.style.KhtmlOpacity = level;
        obj.style.filter = 'alpha(opacity='+(level*100)+')';
    }
    

    
    //해더 함수
    const header = document.querySelector('#header'),
    main = document.querySelector('main'),
    body = document.body;
    

    function headerFunc(a,b){
        
        fadeOut(header,100);
        setTimeout(function(){
        fadeIn(header,100);
            header.classList.add('sticky');
        },1000);
        setTimeout(function(){
            fadeIn(main);
            document.body.classList.add('sticky');
        },2500)
    }

    const introduce = document.querySelector('#introduce'),
    profile = document.querySelector('#profile'),
    publishing = document.querySelector('#publishing'),
    samples = document.querySelector('#sample'),
    puLeftBtn = document.querySelector('.pu-left-btn'),
    puRightBtn = document.querySelector('.pu-right-btn'),
    puImgSlide = document.querySelector('.pu-slide'),
    puSlideItem = document.querySelector('.pu-slideBox');

    let slideWidth = puSlideItem.clientWidth;
    let i=1;
    
    puRightBtn.addEventListener('click',function(){
        if(i==6) return ;
        puImgSlide.style.left = -slideWidth*i + 'px';
        i++;
        console.log(i);
    })
    puLeftBtn.addEventListener('click',function(){
        if(i==1) return ;
        puImgSlide.style.left = -slideWidth*(i-2) + 'px';
        i--;
        console.log(i);
    })

    let puIdx = 1;

    



    
    //인트로 클릭 시 인트로 페이지 이동

    const gotoIntroBtn = document.querySelector('.gotoIntro');
    gotoIntroBtn.addEventListener('click',function(){
        fadeOut(body,500);
        location.href='index.html';
    })
    const gotoResume = document.querySelector('.resumeBtn');
    gotoResume.addEventListener('click',function(){
        location.href='./resume/index.html';
    })
    headerFunc();
    //해더 함수 호출
    const cloudTitle = document.querySelector('#sample h2');
    const clouds = document.querySelector('.clouds');
    //구름 만들기 위한 html elements
    // 스크롤 이벤트
    window.addEventListener('scroll',function(){
        let currentScroll = window.scrollY;
        //현재 스크롤 값
        console.log(currentScroll);

        if(currentScroll>=100){
            header.style.backgroundColor = 'rgba(0,0,0,0.3)';
            //해더 스크롤 했을 때, 현재 스크롤 위치가 100 이상이면 배경색 변경
        } else{
            header.style.backgroundColor = 'inherit';
            //100 이하이면 배경은 inherit
        }
        if(currentScroll>280){
            document.querySelector('.move-area').classList.remove('active');
            
        } else{
            document.querySelector('.move-area').classList.add('active');
        }

        if(currentScroll>=500){
            document.querySelector('.code').classList.remove('code-ani');
            profile.classList.add('show');
        }
        if(currentScroll<350){
            profile.classList= 'remove';
            document.querySelector('.code').classList.add('code-ani');
            
        }

        if(currentScroll>1208){
            profile.classList= 'remove';
        }
        if(currentScroll>=1925&&currentScroll<3207) {
            clouds.classList.add('cloudsAni');
            cloudTitle.style.marginBottom = currentScroll-1050 *2 +'px';
            console.log(currentScroll);
            
        } else{
            clouds.classList.add('removeAni');
            clouds.classList.remove('cloudsAni');
           
        }

    })

 
    
    function headerNaviFunc(){
        const naviList = document.querySelectorAll('#header nav ul li'),
        section = document.querySelectorAll('section');
    //클릭했을 때 스크롤 이동, 클래스 부여

    //네비 클릭 했을 때 할 함수 
    for(let i=0 ; i<naviList.length ; i++){
        const navi = naviList[i]; // i: 0-> about me, 1-> web p.., 2-> samp.., 3->
        navi.addEventListener('click',function(e){
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
            section[i].scrollIntoView({ block: 'end',  behavior: 'smooth' });
            //2. 클릭 했을 때 각각의 섹션으로 이동
            this.classList.add('naviCurrent');
            //3. 현재 클릭한 this의 클래스 부여
        })

    }
    }

    headerNaviFunc();

})();
