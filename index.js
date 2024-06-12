const viewpass=document.querySelector("[data-passdisplay]");
const slider=document.querySelector("[data-slider]");
const submitbtn=document.querySelector("[data-psgenbtn]");
const clrindicator=document.querySelector("[data-sindicator]");
const cpymsg=document.querySelector("[data-copyMsg]");
const upcase=document.querySelector("#upcase");
const lowcase=document.querySelector("#lowcase");
const number=document.querySelector("#Number");
const Symbol=document.querySelector("#Symbol");
const cpybtn =document.querySelector("[data-cpybtn]");
const lengthNum =document.querySelector("[data-lengthNum]");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbol ='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordlength=10;
let checkcount=0;
Handleslider();
setIndicator("#ccc");


function Handleslider(){

    slider.value=passwordlength;
    lengthNum.innerText=passwordlength;

}

function setIndicator(color) {
    clrindicator.style.backgroundColor = color;
    clrindicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    console.log("setindiexe");
}


function getRndInt(min,max){
       return Math.floor(Math.random()*(max-min))+min;
}

function Genrndnum(){
return getRndInt(0,9);
}


function GenLowcase(){

    return String.fromCharCode(getRndInt(97,123));
}

function GenUpcase(){

    return String.fromCharCode(getRndInt(65,91));
}

function GenSymbol() {
    const randNum = getRndInt(0, symbol.length);
    return symbol.charAt(randNum);
}



function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function PassStrength(){

let hasupr=false;
let haslwr=false;
let hasnum=false;
let hassym=false;
if(upcase.checked) hasupr=true;
if(lowcase.checked) haslwr=true;
if(number.checked) hasnum=true;
if(Symbol.checked) hassym=true;
console.log("setindiconese");
if (hasupr && haslwr && (hasnum || hassym) && passwordlength >= 8) {
    setIndicator("#0f0");
  } else if (
    (haslwr || hasupr) &&
    (hasnum || hassym) &&
    passwordlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
      await navigator.clipboard.writeText(viewpass.value);
      cpymsg.innerText = "copied";
  }
  catch(e) {
    cpymsg.innerText = "Failed";
  }
  //to make copy wala span visible
  cpymsg.classList.add("active");

  setTimeout( () => {
    cpymsg.classList.remove("active");
  },2000);

}

function handleCheckBoxChange() {
    checkcount= 0;
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });
}

slider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    Handleslider();
})

cpybtn.addEventListener('click',()=>{
    if(viewpass.value)
        {
            console.log("cpyexe")
            copyContent();
        }
})

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

submitbtn.addEventListener('click', () => {

if(checkcount <=0) return;

if(checkcount > passwordlength)
{
    passwordlength=checkcount;
    slider();
}


password="";

let funcArr = [];

if(upcase.checked)
    funcArr.push(GenUpcase);

if(lowcase.checked)
    funcArr.push(GenLowcase);

if(number.checked)
    funcArr.push(Genrndnum);

if(Symbol.checked)
    funcArr.push(GenSymbol);

for(let i=0;i<funcArr.length;i++)
    {
        password +=funcArr[i]();
    }

for(let i=0;i<passwordlength-funcArr.length;i++)
    {
        let rndinex=getRndInt(0,funcArr.length);
        password +=funcArr[rndinex]();
    }

    password = shufflePassword(Array.from(password));

    viewpass.value=password;
    PassStrength();
})































