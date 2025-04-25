import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextHeight, faArrowsLeftRightToLine  } from "@fortawesome/free-solid-svg-icons";


function MainContainer() {

    const contentRef = useRef<HTMLDivElement>(null);
    const realContentRef = useRef<HTMLDivElement>(null);
    const [contentText, setContentText] = useState<string>("bannerManor");
    //could be usefull in the future
    //const [realContentText, setRealContentText] = useState<string>("bannerManor");

    const [contentWidth, setContentWidth] = useState<number>(600);
    const [contentHeight, setContentHeight] = useState<number>(200);

    const [contentFontSize, setContentFontSize] = useState<number>(72);

    function addSpans(): void {
        const visibleContainer: HTMLDivElement | null = contentRef.current;
        const container: HTMLDivElement | null = realContentRef.current;

        if (!visibleContainer || !container) return;

        const newText: string = visibleContainer.textContent || "";
        container.innerHTML = ""; // clears previous spans

        newText.split("").forEach((letter: string) => {
            const span: HTMLSpanElement = document.createElement("span");
            span.textContent = letter === " " ? "\u00A0" : letter; // use non-breaking space for visible gaps otherwise innerText removes spaces
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

    function handleContentHeight(e:React.ChangeEvent<HTMLInputElement>): void {
        const newHeight = Number.parseInt(e.target.value);
        setContentHeight(newHeight);

        const optionBar = document.getElementById("height") as HTMLInputElement; 

        if(!optionBar) return;

        optionBar.value = newHeight.toString();
    }

    function handleContentWidth(e:React.ChangeEvent<HTMLInputElement>): void {
        const newWidth = Number.parseInt(e.target.value);
        setContentWidth(newWidth);

        const optionBar = document.getElementById("width") as HTMLInputElement;; 

        if(!optionBar) return;

        optionBar.value = newWidth.toString();
    }

    function handleContentFontSize(e:React.ChangeEvent<HTMLInputElement>): void{
        const newFontSize = Number.parseInt(e.target.value);
        setContentFontSize(newFontSize);

        const optionBar = document.getElementById("font") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newFontSize.toString();
    }

    function handleDownload(): void {
        const element: HTMLElement | null = document.querySelector('.realContent');
        if (element) {
            html2canvas(element,{
                width: contentWidth,
                height: contentHeight,
                scale: 1, // prevent scaling based on device pixel ratio
                useCORS: true, // here for external fonts or images
              }).then(canvas => {
                const link: HTMLAnchorElement = document.createElement('a');
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

    return (
        <div className="mainContainer">
            <div className="optionCollection">
                <div className="optionContainer" id="sizeOptions">

                <div className="info">
                <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
                <input
                    type="number"
                    id="width"
                    value={`${contentWidth}`}
                    onChange={(e) => {
                        handleContentWidth(e);
                    }}
                    />
                    <span className="unit">px</span>
                </div>

                <div className="info">
                <FontAwesomeIcon id="heightIcon" icon={faArrowsLeftRightToLine} />
                    <input
                    type="number"
                    id="height"
                    value={`${contentHeight}`}
                    onChange={(e) => {
                        handleContentHeight(e);
                    }}
                    />
                    <span className="unit">px</span>
                </div>


                </div>

                <div className="optionContainer" id="sizeOptions">

                <div className="info">
                <FontAwesomeIcon icon={faTextHeight} />
                <input
                    type="number"
                    id="font"
                    value={`${contentFontSize}`}
                    onChange={(e) => {
                        handleContentFontSize(e);
                    }}
                    />
                    <span className="unit">px</span>
                </div>




                </div>
            </div>
            {/*<textarea className="optionCollection" onChange={handleContentChange} value={contentV}></textarea>*/}
            <div className="content" 
            style={{ height: `${contentHeight}px`, 
            width: `${contentWidth}px` ,
            fontSize: `${contentFontSize}px`
            }} contentEditable={true} spellCheck={false} ref={contentRef}>
                bannerManor
            </div>

            <button className="downloadButton"  onClick={handleDownload}>Download</button>


            <div className="realContent" 
            style={{ height: `${contentHeight}px`,
            width: `${contentWidth}px` ,
            fontSize: `${contentFontSize}px`}} 

            ref={realContentRef}>

            </div>

        </div>



    )
}

export default MainContainer;
