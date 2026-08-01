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

    let quarter = 0;

    if(month >= 10){
        quarter = 1;
    }else if(month >= 1 && month <= 3){
        quarter = 2;
    }else if(month >= 4 && month <= 6){
        quarter = 3;
    }

    const totalQuarter = (year - 2026) * 4 + quarter;
    const index = ((totalQuarter % 7) + 7) % 7;

    return restPattern[index];
}

// ===== 오전/오후 계산 =====

// 기준 : 2026년 7월 30일 = 오후조 시작
const shiftBase = new Date(2026,6,30);

function getShift(date){

    let workCount = 0;

    for(let d=new Date(shiftBase); d<=date; d.setDate(d.getDate()+1)){

        const off = getRestDays(d.getFullYear(), d.getMonth()+1);

        if(!off.includes(d.getDay())){
            workCount++;
        }

    }

    const cycle = Math.floor((workCount-1)/5);

    return cycle % 2 === 0 ? "오후" : "오전";

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

        const isOff = off.includes(date.getDay());

        if(isOff){
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

        let text = isOff ? "휴무" : getShift(date);

        div.innerHTML=`
            <div class="date">${d}</div>
            <div class="shift">${text}</div>
        `;

        calendar.appendChild(div);
    }

}