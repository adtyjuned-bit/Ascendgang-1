/* =======================================================
   ASCEND CHAMPIONSHIP
   script.js
   ======================================================= */


/* =======================================================
   🟢 EDIT DI SINI - TANGGAL EVENT
   Format:
   Tahun, Bulan-1, Tanggal, Jam, Menit, Detik
   Contoh:
   2026,10,15 = 15 November 2026
   ======================================================= */

const eventDate = new Date(2026,10,15,19,0,0).getTime();


/* =======================================================
   🔴 COUNTDOWN
   ======================================================= */

const countdown = setInterval(()=>{

const now = new Date().getTime();

const distance = eventDate - now;

const days = Math.floor(distance/(1000*60*60*24));

const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerHTML = days;

document.getElementById("hours").innerHTML = hours;

document.getElementById("minutes").innerHTML = minutes;

document.getElementById("seconds").innerHTML = seconds;

if(distance<0){

clearInterval(countdown);

document.getElementById("countdown").innerHTML="<h2>EVENT STARTED</h2>";

}

},1000);



/* =======================================================
   🔴 LOADING SCREEN
   ======================================================= */

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader=document.getElementById("loader");

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.style.display="none";

},600);

},1200);

});



/* =======================================================
   🔴 NAVBAR SCROLL EFFECT
   ======================================================= */

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){

header.style.background="rgba(0,0,0,.75)";

header.style.backdropFilter="blur(18px)";

}else{

header.style.background="rgba(0,0,0,.35)";

}

});



/* =======================================================
   🔴 HERO PARALLAX
   ======================================================= */

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero-content");

if(hero){

hero.style.transform=`translateY(${window.scrollY*-0.18}px)`;

}

});



/* =======================================================
   🔴 SCROLL ANIMATION
   ======================================================= */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.register-box,.match,.faq-item,.hero-content").forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});
