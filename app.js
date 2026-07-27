const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let current = new Date();

const restPattern = [
  [2,3], // 화·수
  [1,2], // 월·화
  [0,1], // 일·월
  [6,0], // 토·일
  [5,6], // 금·토
  [4,5], // 목·금
  [3,4]  // 수·목
];

function getRestDays(year, month){

    // 2026년 7월을 기준으로 몇 번째 분기인지 계산
    const months = (year - 2026) * 12 + (month - 7);
    const quarterIndex = Math.floor(months / 3);

    // 7개 패턴 반복
    const index = ((quarterIndex % 7) + 7) % 7;

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
        calendar.appendChild(document.createElement("div"));
    }

    for(let d=1; d<=last.getDate(); d++){

        let div=document.createElement("div");
        div.className="day";

        let date=new Date(year,month,d);

        if(off.includes(date.getDay())){
            div.classList.add("off");
        }

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