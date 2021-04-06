//인트로 함수 : 
//1. 타이틀 바꾸는 함수
//2. 타이틀 바꾸고 타이틀 내리는 함수 (클래스 받아서 내리기)
//3. 별빛 함수 
//4. 이미지 엘리먼트 생성해서 붙이기
//5.페이드 아웃으로 서서히 어두워지고 location으로 메인 연결

(function () {
    const body = document.querySelector('body');
    //바디 : 
    const section = document.querySelector('section');
    const textAniBox = document.querySelector('#intro1 .box');
    const skipBtn = document.querySelector('.introBtn');
    const profileImg = document.createElement('img');
    const intro1 = document.querySelector('#intro1');
    const gotoBtn = document.querySelector('.gotoBtn');
    profileImg.setAttribute('src', "./images/intro2.png");
    let funcCheck = false;
    //스킵버튼 누를때 한번만 사용하게 확인시켜줄 변수

    //타이틀 바꾸기 : 배열에 담아서 바꿔버리기
    const changtitleName = document.querySelector('.change-title');
    const titleArr = ['AMAZING','FANTASTIC','SMART','SURPRISE','BEAUTY','UNBELIVABLE','SURPRISE','BEAUTY','ART'];
    let titleIdx =0;
    let class_count =0;

    //페이드 인 함수

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
    

    // 1. 페이드인 - 페이드 액션 - 페이드 오퍼시티



    let requestTime1= 0;
    //1. 애니메이션 타이틀 바꾸기
    function changeTitle(){
        requestTime1++;
        //리퀘스트 애니메이션 시간
        if (requestTime1 % 50 === 0) {
            if(titleIdx == 8) {
                return false;
            };
            if(class_count >= 5){
                class_count =0;
            }
            titleIdx++;
            class_count ++;

            titleArr.forEach(function(){
                changtitleName.innerHTML = titleArr[titleIdx];
                changtitleName.className = 'title'+class_count;
            });
          }
        requestAnimationFrame(changeTitle);

          
}




    // // 2.텍스트 내용 바꾸는 함수
    function titleChange() {
        if (!funcCheck) {
            const changeTitle = document.querySelector('#intro1 h2'),
            artistText = document.createElement('span');
            artistText.style.opacity =0;
            changtitleName.style.opacity =0;
            changeTitle.innerHTML = "I'm Coding"
            artistText.innerHTML = 'ARTIST';
            artistText.style.marginLeft = '20px';
            changeTitle.appendChild(artistText);
            artistText.className = 'title3'
            fadeIn(changeTitle);
            fadeIn(artistText);
        }
        else return;

    }




    // //배경 컨트롤
    function introBgFunc() {
        // if(!funcCheck ){

        intro1.removeChild(intro1.childNodes[1]);
        const newIntroBg = document.createElement('div');
        profileImg.setAttribute('src', "./images/intro2.png");
        profileImg.classList.add('pf-img');
        profileImg.classList.add('opacityAni');
        function stars() {
            let count = 200;
            // 별 숫자
            let i = 0;
            while (i < count) {
                let star = document.createElement("i");
                let x = Math.floor(Math.random() * window.innerWidth);
                let y = Math.floor(Math.random() * window.innerHeight);
                let duration = Math.random() * 2;
                let size = Math.random() * 3;
                star.style.left = x + 'px';
                star.style.top = y + 'px';
                star.style.width = 1 + size + 'px';
                star.style.height = 1 + size + 'px';
                star.style.animationDelay = duration + 's';
                star.style.animationDuration = 2 + duration + 's';
                newIntroBg.appendChild(star);
                i++;
            }
        };
        stars();
        newIntroBg.classList.add('background-box');
        intro1.classList.add('opacityAni');
        intro1.insertBefore(newIntroBg, intro1.firstChild);
        const bgImgItem = document.createElement('div');
        bgImgItem.classList.add('bg-img-item');
        profileImg.classList.add('pf-img');
        newIntroBg.insertBefore(bgImgItem, newIntroBg.firstChild);
        bgImgItem.appendChild(profileImg);
        setTimeout(function () {
            newIntroBg.insertBefore(profileImg, newIntroBg.firstChild);
        }, 3000);


    }


    // //스킵 버튼누르면 할 함수 : 배경바꾸고, 타이틀바꾸고 내리고, 스크롤 나타내기

    function introBtnHandler() {
        titleChange();
        introBgFunc();
        textAniBox.classList.add('box-ani');
        skipBtn.style.display = 'none';
        profileImg.classList.add('floatAni');
        setTimeout(function(){
            document.querySelector('.gotoBtn').style.opacity =1;
            document.querySelector('.gotoBtn').style.visibility ='visible';
        },3000);

    }

    let headerCheck = false;
    function introFunc() {
        changeTitle();
        setTimeout(function () {
            if (!funcCheck) {
                setTimeout(function () {
                    titleChange();

                }, 500);
                // 타이틀 바꾸기

                //타이틀 내리기
                setTimeout(function () {
                    //텍스트 내려가는 애니메이션
                    skipBtn.style.display = 'none';
                    textAniBox.classList.add('box-ani');
                }, 1500);

                // // 배경바꾸기, 버튼지우기
                setTimeout(function () {
                    introBgFunc();
                    profileImg.classList.add('floatAni');
                }, 1500);
                setTimeout(function () {
                    gotoBtn.style.opacity =1;
                    gotoBtn.style.visibility ='visible';
                }, 6500);

            }
            //스크롤 함수

            // 사진 나타내기
            //스크롤 생겨서 해더 만들기
        }, 8000);
    }
    introFunc();


    // // 스킵함수

    skipBtn.addEventListener('click', function () {
        introBtnHandler();
        funcCheck = true;
    });

    gotoBtn.addEventListener('click',function(){
        fadeOut(intro1,100);
        location.replace('index-main.html');
    });


   











    //스트롤할 때 해더 생기기 


})();
