const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let current = new Date();

const restPattern = [
  [2,3], // 화수
  [1,2], // 월화
  [0,1], // 일월
  [6,0], // 토일
  [5,6], // 금토
  [4,5], // 목금
  [3,4]  // 수목
];

function getRestDays(year, month){

    let baseYear=2026;
    let quarter;

    if(month>=7 && month<=9) quarter=0;
    else if(month>=10) quarter=1;
    else if(month<=3) quarter=2;
    else quarter=3;

    let index=((year-baseYear)*4+quarter)%7;

    if(index<0) index+=7;

    return restPattern[index];

}

function draw(){

calendar.innerHTML="";

let year=current.getFullYear();
let month=current.getMonth();

monthYear.textContent=`${year}년 ${month+1}월`;

const first=new Date(year,month,1);
const last=new Date(year,month+1,0);

const off=getRestDays(year,month+1);

for(let i=0;i<first.getDay();i++){

let div=document.createElement("div");
calendar.appendChild(div);

}

for(let d=1;d<=last.getDate();d++){

let div=document.createElement("div");

div.className="day";

let date=new Date(year,month,d);

if(off.includes(date.getDay()))
div.classList.add("off");

const today=new Date();

if(
today.getFullYear()==year &&
today.getMonth()==month &&
today.getDate()==d
){
div.classList.add("today");
}

div.innerHTML=d;

calendar.appendChild(div);

}

}

draw();

document.getElementById("prev").onclick=()=>{

current.setMonth(current.getMonth()-1);

draw();

}

document.getElementById("next").onclick=()=>{

current.setMonth(current.getMonth()+1);

draw();

}