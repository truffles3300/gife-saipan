const intro=document.getElementById("intro");
const main=document.getElementById("main");
const music=document.getElementById("music");
const heartbeat=document.getElementById("heartbeat");
const volume=document.getElementById("volume");
const gallery=document.getElementById("gallery");
const reading=document.getElementById("readingMode");
const lines=document.querySelectorAll(".line");

let playing=false;
let galleryOpen=false;

/* OPEN LETTER */
function openLetter(){
intro.style.opacity="0";

setTimeout(()=>{
intro.style.display="none";
main.classList.add("show");
fadeInMusic();
},900);
}

/* MUSIC */
function toggleMusic(){
playing?fadeOutMusic():fadeInMusic();
}

function fadeInMusic(){
music.volume=0;
music.play();
playing=true;

let v=0;
let fade=setInterval(()=>{
if(v<volume.value){
v+=0.02;
music.volume=v;
}else clearInterval(fade);
},80);
}

function fadeOutMusic(){
let fade=setInterval(()=>{
if(music.volume>0.02){
music.volume-=0.02;
}else{
music.pause();
playing=false;
clearInterval(fade);
}
},80);
}

volume.addEventListener("input",()=>{
music.volume=volume.value;
});

/* GALLERY */
function toggleGallery(){

const imgs=gallery.querySelectorAll("img");

if(!galleryOpen){

gallery.classList.add("show");
galleryOpen=true;

music.volume*=0.4;
heartbeat.volume=0.25;
heartbeat.play();

imgs.forEach((img,i)=>{
setTimeout(()=>{
img.style.opacity="1";
img.style.transform="translateY(0) scale(1)";
img.style.filter="blur(0)";
},i*400);
});

}else{

imgs.forEach((img,i)=>{
setTimeout(()=>{
img.style.opacity="0";
img.style.transform="translateY(70px) scale(.85)";
img.style.filter="blur(10px)";
},i*120);
});

setTimeout(()=>{
gallery.classList.remove("show");
},700);

heartbeat.pause();
music.volume=volume.value;
galleryOpen=false;
}
}

/* READING MODE */
function openReading(){

reading.classList.add("show");
document.body.classList.add("locked");

heartbeat.volume=0.2;
heartbeat.play();

lines.forEach((line,i)=>{
setTimeout(()=>{
line.style.opacity="1";
line.style.transform="translateY(0)";
},i*1000);
});
}

function closeReading(){

reading.classList.remove("show");
document.body.classList.remove("locked");

heartbeat.pause();

lines.forEach(line=>{
line.style.opacity="0";
line.style.transform="translateY(25px)";
});
}