 "use strict";

let c, ctx,  W, H, imgCar, widthCar, heightCar, speed, widthLine, heightLine, mouse, touch, p, playerEndY, imgCarReverse, cpt, speedSyncro,speedInterval, interval, alife, lines, cars, lifes, distFinish, textColor, imgCarF1, imgCarF2, imgCarF3, imgCarF4, imgCarF5, imgCarF6, imgCarF7, imgCarF8, imgCarF9, imgCarA1, imgCarA2, imgCarA3, imgCarA4, imgCarsF, imgCarsA;

window.onload = () => {
    c = document.getElementById("canvas");
    W = c.width =  window.innerWidth;
    H = c.height = window.innerHeight;
    ctx = c.getContext("2d");
    alife = true;
    lifes = 3;
    cpt = 0;
    distFinish = 2450;
    speed = 3;
    speedSyncro = 1;
    speedInterval = 4000;
    lines = [];
    widthLine = 10;
    heightLine = 100;
    cars = [];
    widthCar = 70;
    heightCar = 100;
    imgCar = new Image();
    imgCar.src = "https://image.flaticon.com/icons/svg/1698/1698104.svg";
    imgCarF1 = new Image();
    imgCarF1.src = "https://image.flaticon.com/icons/svg/171/171240.svg";
    imgCarF2 = new Image();
    imgCarF2.src = "https://image.flaticon.com/icons/svg/741/741407.svg";
    imgCarF3 = new Image();
    imgCarF3.src = "https://image.flaticon.com/icons/svg/214/214280.svg";
    imgCarF4 = new Image();
    imgCarF4.src = "https://image.flaticon.com/icons/svg/2149/2149509.svg";
    imgCarF5 = new Image();
    imgCarF5.src = "https://image.flaticon.com/icons/svg/2160/2160312.svg";
    imgCarF6 = new Image();
    imgCarF6.src = "https://image.flaticon.com/icons/svg/619/619127.svg";
    imgCarF7 = new Image();
    imgCarF7.src = "https://image.flaticon.com/icons/svg/619/619115.svg";
    imgCarF8 = new Image();
    imgCarF8.src = "https://image.flaticon.com/icons/png/128/198/198348.png";
    imgCarF9 = new Image();
    imgCarF9.src = "https://image.flaticon.com/icons/svg/198/198340.svg";
    imgCarA1 = new Image();
    imgCarA1.src = "https://image.flaticon.com/icons/svg/146/146269.svg";
    imgCarA2 = new Image();
    imgCarA2.src = "https://image.flaticon.com/icons/svg/198/198335.svg";
    imgCarA3 = new Image();
    imgCarA3.src = "https://image.flaticon.com/icons/svg/198/198344.svg";
    imgCarA4 = new Image();
    imgCarA4.src = "https://image.flaticon.com/icons/svg/198/198341.svg";
    imgCarsF = [];
    imgCarsA = [];
    imgCarsF = [imgCarF1, imgCarF2, imgCarF3, imgCarF4, imgCarF5, imgCarF6, imgCarF7, imgCarF8, imgCarF9];
    imgCarsA = [imgCarA1, imgCarA2, imgCarA3, imgCarA4];
    p = new Player();
    playerEndY = 0;
};
 
class Player{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }    
    
    draw() {
        ctx.beginPath();
        ctx.drawImage(imgCar, mouse.x-widthCar/2, mouse.y+playerEndY, widthCar, heightCar);
    }
        
    update() {
        mouse.y -= playerEndY;
        this.draw();
    }
}

class Line {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.rect(this.x, this.y, widthLine, heightLine);
        ctx.fill();
    }
    
    update() {
        this.y += speed + speedSyncro;
        this.draw();
    }
} 

class Car {
    constructor(x, y, speedCars, imgChoice) {
        this.x = x;
        this.y = y;
        this.speed = speedCars;
        this.imgChoice = imgChoice
    }
    
    draw() {
        ctx.beginPath();
        ctx.drawImage(this.imgChoice, this.x, this.y, widthCar, heightCar);
    }
    
    update() {
        this.y += this.speed + speedSyncro;
        this.draw();
    }

} 

const start = () => {
    first.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "block";
    infos.style.display = "block";
    interval = setInterval(drawCars, speedInterval);
    eventUser();
    createLinesStart();
    animate();
    drawCars();    
};

const random = (max=1, min=0) => Math.random() * (max - min) + min;

function drawCars(){
    let choiceCarF = Math.floor(Math.random() * (imgCarsF.length-1 ));
    let choiceCarA = Math.floor(Math.random() * (imgCarsA.length-1));
    let randomAddX1 = random((W-60)/4-widthCar/2, -(W-60)/4+widthCar/2+10);
    let randomAddX2 = random((W-60)/4-widthCar/2-10, -(W-60)/4+widthCar/2);
    let x1 = W/4-widthCar/2+randomAddX1;
    let x2 = W-W/4-widthCar/2+randomAddX2;
    let y = -100;
    let speed1 = 5;
    let speed2 = 1;
    cars.push( new Car(x1, y, speed1, imgCarsF[choiceCarF] )); 
    cars.push( new Car(x2, y, speed2, imgCarsA[choiceCarA] )); 
}

const eventUser = () => { 
   mouse = {
        x: W-W/4-widthCar/2,
        y: H-150
    };
    
    touch = {
        x: W-W/4-widthCar/2,
        y: H-150
    };
    
    c.addEventListener("mousemove", function(event){
        mouse.x = event.clientX;
        if(mouse.x<30+widthCar/2)mouse.x=30+widthCar/2;
        if(mouse.x>W-30-widthCar/2)mouse.x=W-30-widthCar/2;
    });

    c.addEventListener("touchmove", function(event){
        var touch = event.changedTouches[0];
        var touchX = parseInt(touch.clientX);
        event.preventDefault();
        mouse.x = touchX;
        if(mouse.x<30+widthCar/2)mouse.x=30+widthCar/2;
        if(mouse.x>W-30-widthCar/2)mouse.x=W-30-widthCar/2;
    });
};

const createLinesStart = () => { 
   for(let i=0;i<H+100;i+=heightLine+100){
       lines.push( new Line(W/2-widthLine/2, H-i));
   }
};

const createLines = () => {
    let rec =lines[lines.length-1].y;
    if(rec>-100){
        for(let i=0;i<H;i+=heightLine+100){
            lines.push( new Line(W/2-widthLine/2, rec-i));
        }
    }
};

const clear = () => { ctx.clearRect(0, 0, W, H); };

const drawBorders = () => { 
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(0, 0, 30, H);
    ctx.rect(W-30, 0, 30, H);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'silver';
    ctx.rect(25, 0, 5, H);
    ctx.rect(W-30, 0, 5, H);
    ctx.fill();
};

const checkCollision = () => { 
    if(lifes<=0){
        alife=false;
        clearInterval(interval);
        imgend.style.display = "block";
        canvas.style.display = "none";
        playagain.style.display = "block";
        
    }
    
    if(distFinish<=cpt*10){
        clearInterval(interval);
        speedSyncro = 0;
        playerEndY = 3;
        cars =[];
        setTimeout(function() { 
            alife=false;
            playagainwin.style.display= "block";
            imgwin.style.display = "block";
            canvas.style.display = "none";
            infos.style.display = "none";
        }, 2700);
    }
}    
const drawAllCars = () => {     
    for(var i = lines.length - 1; i >= 0; i--){
       lines[i].update();
        if(lines[i].y > H){
            lines.splice(i, 1);
            cpt++;
        }
    }
    
    for(var j = cars.length - 1; j >= 0; j--){
        cars[j].update();
        if(cars[j].y > H)cars.splice(j, 1);
        else{
            if(mouse.x-widthCar/2+widthCar-5>cars[j].x&&mouse.x-widthCar/2<cars[j].x+widthCar-5&&mouse.y<cars[j].y+90&&mouse.y+70>cars[j].y){
                cars.splice(j, 1);
                signalDead();
                lifes--;
            }
        }
    }
};

const checkSpeed = () => { 
    switch (cpt) {
        case 5:
            speedSyncro=2.5;
            break;
        case 10:
            clearInterval(interval);
            speedInterval = 2000;
            interval = setInterval(drawCars, speedInterval);
            break;
        case 20:
            speedSyncro=2.5;
            break;
        case 30:
            speedSyncro=3;
            break;
        case 40:
            speedSyncro=3.5;
            clearInterval(interval);
            speedInterval = 1500;
            interval = setInterval(drawCars, speedInterval);
            break;
        case 50:
            speedSyncro=4;
        case 70:
            speedSyncro=5;
            break; 
        case 150:
            speedSyncro=6;
            clearInterval(interval);
            speedInterval = 1000;
            interval = setInterval(drawCars, speedInterval);
            break;    
    }
};

const signalDead = () => {
    infos.style.backgroundColor="red";
    setTimeout(function() { 
        infos.style.backgroundColor="rgba(0, 0, 0, 0.7)";
    }, 100);
};

const animate = () => {
    clear();
    createLines();
    drawBorders();
    if(alife)drawAllCars();
    p.update();
    checkCollision();
    checkSpeed();
    miles.innerHTML = (distFinish - cpt*10<=0)?0+" miles":distFinish - cpt*10 + " miles";
    cptlife.innerHTML = lifes;
    window.requestAnimationFrame(animate);
};

const restart = () => {
    imgend.style.display = "none";
    playagainwin.style.display= "none";
    playagain.style.display = "none";
    imgwin.style.display = "none";
    canvas.style.display = "block";
    infos.style.display = "block";
    mouse.y = H-150;
    playerEndY = 0;
    cpt = 0;
    lifes = 3;
    speedSyncro = 0;
    alife = true
    lines = [];
    cars = [];
    clearInterval(interval);
    speedInterval = 4000;
    interval = setInterval(drawCars, speedInterval);
    createLinesStart();
    drawCars();    
};


