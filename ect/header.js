(function(){
    let headerCheck = false;
    window.addEventListener("scroll", function() {
       
        const introPage = document.querySelector('#intro1');
        const body = document.querySelector('body');
        if(!headerCheck){
            setTimeout(function(){
                introPage.remove();
            const header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0);
            headerCheck = true;

        });
        
        }

});


})();
