import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';

function MainContainer() {

    const contentRef = useRef<HTMLDivElement>(null);
    const realContentRef = useRef<HTMLDivElement>(null);
    const [contentText, setContentText] = useState<string>("bannerManor");
    //could be usefull in the future
    //const [realContentText, setRealContentText] = useState<string>("bannerManor");

    const [contentWidth, setContentWidth] = useState<number>(600);
    const [contentHeight, setContentHeight] = useState<number>(200);


    function addSpans(): void {
        const visibleContainer: HTMLDivElement | null = contentRef.current;
        const container: HTMLDivElement | null = realContentRef.current;

        if (!visibleContainer || !container) return;

        const newText: string = visibleContainer.innerText;
        container.innerHTML = ""; // clears previous spans

        newText.split("").forEach((letter: string) => {
            const span: HTMLSpanElement = document.createElement("span");
            span.textContent = letter;
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

        const optionBar = document.getElementById("height") as HTMLInputElement;; 

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

    function handleDownload(): void {
        const element: HTMLElement | null = document.querySelector('.realContent');
        if (element) {
            html2canvas(element).then(canvas => {
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

                <div className="widthInfo">
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

                <div className="heightInfo">
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
            </div>
            {/*<textarea className="optionCollection" onChange={handleContentChange} value={contentV}></textarea>*/}
            <div className="content" style={{ height: `${contentHeight}px`, width: `${contentWidth}px` }} contentEditable={true} spellCheck={false} ref={contentRef}>
                bannerManor
            </div>

            <button className="downloadButton"  onClick={handleDownload}>Download</button>


            <div className="realContent" style={{ height: `${contentHeight}px`, width: `${contentWidth}px` }} ref={realContentRef}>

            </div>

        </div>



    )
}

export default MainContainer;
