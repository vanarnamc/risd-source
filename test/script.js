console.log('Hello,world');


let n = 'fuuuuuu';
let greet= 'rrrrrr';

let p= document.getElementById('my-text');

console.log(p);

p.innerText=`${n}${greet}`;


const isleapYear = function(year){
   let leapyearCheck = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
return leapyearCheck;
}
setInterval
(function(){
    let flip= Math.random();
    if (flip<.5){
        console.log('HEADS!!!');
    } else {
        console.log('TAILS!!!');
    }}, 500);

console.log(isleapYear(2029));