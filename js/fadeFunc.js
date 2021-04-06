function fadeIn(el, time) {
    el.style.opacity = 0;
    let last = +new Date();
    let tick = function () {
        el.style.opacity = + el.style.opacity + (new Date() - last) / time;
        last = +new Date();
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    tick();
}

function fadeIn(target){
    let level =0;
    let inTimer = null;
    inTimer = setInterval(function(){
        level = fadeInAction(target,level,inTimer);
    });
}
function fadeInAction(target,level,inTimer){
    level = level+0.1;
    changeOpacity(target,level);
    if(level>1) clearInterval(inTimer);
    return level;
}

function fadeOut(target){
    let level = 1;
    let outTimer = null;
    outTimer = setInterval(function(){
        level = fadeOutAction(target,level,outTimer);
    });
}

function fadeOutAction(target,level,outTimer){
    level = level-0.1;
    changeOpacity(target,level);
    if(level<0){
        clearInterval(outTimer);
    }
    return level;
}

function changeOpacity(target,level){
    let obj = target;
    obj.style.opacity = level;
    obj.style.Mozopacity = level;
    obj.style.KhtmlOpacity = level;
    obj.style.filter = 'alpha(opacity='+(level*100)+')';
}

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
    