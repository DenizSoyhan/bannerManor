import { useEffect, useRef } from 'react';

function FunScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const funButton=document.getElementById("funButton");
    if (!funButton) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    console.log(windowHeight,windowWidth);

    canvas.height = windowHeight;
    canvas.width= windowWidth;

    canvas.style.width = `${windowWidth}px`;
canvas.style.height = `${windowHeight}px`;


    canvas.style.background = "2c2c2c"

    context.fillStyle = '#990000';

    class Circle {
        xpos: number;
        ypos: number;
        radius: number;
        color: string;
        lineWidth: number;
        //text: string;
        speed: number;
        cx: number;
        cy: number;
      
        constructor(
          xpos: number,
          ypos: number,
          radius: number,
          color: string,
          lineWidth: number = 0,
          //text: string,
          speed: number
        ) {
          this.xpos = xpos;
          this.ypos = ypos;
          this.radius = radius;
          this.color = color;
          this.lineWidth = lineWidth;
          //this.text = text;
          this.speed = speed;

          const angle = Math.random() * Math.PI * 2; // and these 3 will make them have the same speed
          this.cx = Math.cos(angle) * this.speed;
          this.cy = Math.sin(angle) * this.speed;
      
          /*this.cx = ((Math.random() - 0.5) * 2) * this.speed;
          this.cy = ((Math.random() - 0.5) * 2) * this.speed;*/ //these 2 lines causes the balls to go different speeds which is actually fine
        }
      
        draw(context: CanvasRenderingContext2D): void {
          context.beginPath();
          //context.strokeStyle = this.color;
          
          context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
          context.lineWidth = this.lineWidth;
          
          context.textAlign = 'center';
          context.textBaseline = 'middle';  
          context.font = "20px Monospace";
          //context.fillText(this.text, this.xpos, this.ypos + 5);
      
          context.fill();
          //context.stroke();
          context.closePath();
        }
      
        update(context: CanvasRenderingContext2D, windowWidth: number, windowHeight: number): void {
          this.draw(context);
      
          if ((this.xpos + this.radius) > windowWidth || (this.xpos) < 0 + this.radius) {
            this.cx = -this.cx;
          }
      
          if ((this.ypos + this.radius) > windowHeight || (this.ypos) < 0 + this.radius) {
            this.cy = -this.cy;
          }
      
          this.xpos = this.xpos + this.cx;
          this.ypos = this.ypos + this.cy;
        }
        
      }

    
    
    
    var allCircles:Circle[] = [];
    
    /*let randomSpawnPoint = function(min:number, max:number){
        let result = Math.random() * (max - min) + min;
        return result;
    }*/

    let updateCircle=function(){
    
        requestAnimationFrame(updateCircle);
        context.clearRect(0,0,windowWidth,windowHeight)
        
        allCircles.forEach(element =>{
            
    
            element.update(context, windowWidth,windowHeight);
        })

    }

    


    function ball(): void{
        let rad=20;

        //let randomX=randomSpawnPoint(rad,windowWidth-rad);
        //let randomY=randomSpawnPoint(rad,windowHeight-rad);
    
        const rect = funButton?.getBoundingClientRect();

        if(!rect) return;

        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        let aCircle=new Circle(buttonCenterX,buttonCenterY, rad, "#990000",5,4);
        allCircles.push(aCircle);
    }
    funButton.addEventListener("mousedown",()=>ball())



    updateCircle();
      

  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} ></canvas>
  );
}

export default FunScreen;
