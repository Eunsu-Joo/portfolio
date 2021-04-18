$(function () {
    function resizeImg(){
     const pfImg = $('.background-box').find('img');
     const bgContainer = $('.bg-img-container'),
      bgItem =  $('.bg-img-item'),
      bgImg = $('.pf-img');
      
     //1920 *1028
     let windowW = $(window).width(),
     windowH = $(window).height(),
     bRatio = windowW/ windowH,
     iRatio = 1920/1028;

     if(iRatio>bRatio){
         let imgW = windowH*iRatio,
         imgLeft = (windowW-windowH * iRatio)/2;
         bgItem.css({
             'height' : '100%',
             'width' : imgW ,
             'top' :0,
             'left' : imgLeft        
         })
     } else{
         bgItem.css({
             'height' : windowW/iRatio,
             'width' : '100%',
             'top' :(windowH-windowW/iRatio)/2,
             'left' : 0
         });
     };
     };
     resizeImg();
     
     $(window).resize(function(){
         resizeImg();
     })

 
 });

