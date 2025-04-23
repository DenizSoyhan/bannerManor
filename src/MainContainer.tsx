import { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';

function MainContainer(){
    
    const contentRef = useRef<HTMLDivElement>(null);
    const realContentRef = useRef<HTMLDivElement>(null);
    const [contentText, setContentText] = useState<string>("bannerManor");
    //could be usefull in the future
    //const [realContentText, setRealContentText] = useState<string>("bannerManor");

    function addSpans(): void {
        const visibleContainer: HTMLDivElement | null = contentRef.current;
        const container:HTMLDivElement | null = realContentRef.current;
      
        if (!visibleContainer || !container) return;
      
        const newText:string = visibleContainer.innerText;
        container.innerHTML = ""; // clears previous spans
      
        newText.split("").forEach((letter:string) => {
          const span: HTMLSpanElement = document.createElement("span");
          span.textContent= letter;
          container.appendChild(span);
        });
      }

    useEffect(() => {
        const element: HTMLDivElement | null = contentRef.current;


        if (!element) return;

        addSpans();
      
        const handleInput = () => {
          const newText = element.innerText;
          setContentText(newText);
          //setRealContentText(newText);

          addSpans();

        };
      
        element.addEventListener("input", handleInput);
      
        return () => {
          element.removeEventListener("input", handleInput);
        };
      }, []);

    /*function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        let newContent:string = e.target.value;
        setContentText(newContent);
        const contentElement:Element | null = document.querySelector(".content")
        if(contentElement){
            contentElement.textContent = newContent;
        }
    }*/ //works different now. keep it here to look how to write .ts functions properly


function handleDownload():void {
  const element: HTMLElement | null = document.querySelector('.realContent');
  if (element) {
    html2canvas(element).then(canvas => {
      const link:HTMLAnchorElement = document.createElement('a');
      link.download = `${contentText}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}

/*
        <div className="realContent" contentEditable="true">
            <div id="realContentText" ref={contentRef}>bannerManor</div>
        </div> */

    return(
    <div className="mainContainer"> 
        <div className="optionCollection"></div>
    {/*<textarea className="optionCollection" onChange={handleContentChange} value={contentV}></textarea>*/}
        <div className="content" contentEditable={true} spellCheck={false} ref={contentRef}>
             bannerManor
        </div>

        <button className="downloadButton" onClick={handleDownload}>Download</button>
        
        
        <div className="realContent" contentEditable="true" ref={realContentRef}>

        </div> 

    </div>



    )
}

export default MainContainer;