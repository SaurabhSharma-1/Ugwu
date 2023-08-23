const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
    y: 0,
    duration:1,
    stagger: 0.2
    })
    .from(".faltu", {
        y: "10",
        opacity: 0,
        duration: 0.7,
        ease: Expo.easeInOut,
    })
    .from("#home-footer", {
        y: "10",
        opacity: 0,
        ease: Expo.easeInOut,
    }) 
}

var timeout;

function cck(){

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){

    clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8, 1.4, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.4, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    MouseFollower(xscale,yscale);

    timeout = setTimeout(function(){
        document.querySelector(
            "#minicircle").style.transform = `translate(
                ${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    },100);

    });

}

function MouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

MouseFollower();
cck();
firstPageAnim();



document.querySelectorAll("#elem").forEach(function(deto){

    var rotate = 0;
    var diffrot = 0;

    deto.addEventListener("mouseleave", function(){

        gsap.to(deto.querySelector("img"), {
            opacity : 0,
            ease : Power3,
            duration:0.5
        });
    });


    deto.addEventListener("mousemove", function(dets){
        var ydiff = dets.clientY - deto.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(deto.querySelector("img"), {
            opacity : 1,
            ease : Power3,
            top : ydiff,
            left : dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });
});