import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextHeight, faArrowsLeftRightToLine, faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";


function MainContainer() {

    const contentRef = useRef<HTMLDivElement>(null);
    const realContentRef = useRef<HTMLDivElement>(null);
    const [contentText, setContentText] = useState<string>("bannerManor");
    //could be usefull in the future
    //const [realContentText, setRealContentText] = useState<string>("bannerManor");

    const [contentWidth, setContentWidth] = useState<number>(600);
    const [contentHeight, setContentHeight] = useState<number>(200);

    const [contentFontSize, setContentFontSize] = useState<number>(72);
    const [contentTextColor, setContentTextColor] = useState<string>("antiquewhite");
    
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const [hoveredFont, setHoveredFont] = useState<string | null>(null);
    const [selectedFont, setSelectedFont] = useState<string | null>("Cantarell");
    
    const commonFonts: string[] = [
        "Cantarell",
        "Spectral",
        "monospace",
        "DejaVu Serif",
        "Courier",
        "Tuffy",
        "Comic Relief",
        "Cascadia Code",
        "Cal Sans",
        "Oswald",

    ];

    const fontSelectorRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      fontSelectorRef.current &&
      !fontSelectorRef.current.contains(event.target as Node)
    ) {
      setFontDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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

    function handleContentHeight(e: React.ChangeEvent<HTMLInputElement>): void {
        const newHeight = Number.parseInt(e.target.value);
        setContentHeight(newHeight);

        const optionBar = document.getElementById("height") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newHeight.toString();
    }

    function handleContentWidth(e: React.ChangeEvent<HTMLInputElement>): void {
        const newWidth = Number.parseInt(e.target.value);
        setContentWidth(newWidth);

        const optionBar = document.getElementById("width") as HTMLInputElement;;

        if (!optionBar) return;

        optionBar.value = newWidth.toString();
    }

    function handleContentFontSize(e: React.ChangeEvent<HTMLInputElement>): void {
        const newFontSize: number = Number.parseInt(e.target.value);
        setContentFontSize(newFontSize);

        const optionBar = document.getElementById("font") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newFontSize.toString();
    }

    function handleContentTextColor(e: React.ChangeEvent<HTMLInputElement>): void {
        const newColor = e.target.value;
        setContentTextColor(newColor);

        const optionBar = document.getElementById("color") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newColor;
    }

    function handleDownload(): void {
        const element: HTMLElement | null = document.querySelector('.realContent');
        if (element) {
            html2canvas(element, {
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

                



                <div className="optionContainer" id="sizeOptions" ref={fontSelectorRef}>
  <div
    className="fontSelectorHeader"
    onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
    style={{
      padding: "2px",
      paddingLeft: "5px",
      backgroundColor: "#1e1e1e",
      border: "1px solid #555",
      borderRadius: "8px",
      cursor: "pointer",
      fontFamily: selectedFont || "inherit",
      fontSize: "18px",
      width: "150px",
      height: "30px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
    }}
  >
    {selectedFont || "Choose Font"}
  </div>

  {fontDropdownOpen && (
    <div
      id="fontSelector"
      style={{
        marginTop: "8px",
        maxHeight: "200px",
        overflowY: "auto",
        border: "1px solid #555",
        borderRadius: "6px",
        padding: "5px",
        backgroundColor: "#2a2a2a",
        width: "200px",
        position: "absolute",
        zIndex: 10,
      }}
    >
      {commonFonts.map((font) => (
        <div
          key={font}
          onMouseEnter={() => setHoveredFont(font)}
          onMouseLeave={() => setHoveredFont(null)}
          onClick={() => {
            setSelectedFont(font);
            setFontDropdownOpen(false);

          }}
          style={{
            minHeight: "25px",
            width: "91%",
            fontFamily: font,
            fontSize: "20px",
            padding: "8px",
            marginBottom: "4px",
            borderRadius: "4px",
            backgroundColor:
              hoveredFont === font || selectedFont === font
                ? "#727475"
                : "transparent",
            cursor: "pointer",
          }}
        >
          {font}
        </div>
      ))}
    </div>
  )}



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

                    <div className="info">
                        <FontAwesomeIcon icon={faPaintbrush} />

                        <label className="colorPickerWrapper" style={{ backgroundColor: contentTextColor }}>
                            <input
                                type="color"
                                className="colorPicker"
                                id="color"
                                value={`${contentTextColor}`}
                                onChange={(e) => {
                                    handleContentTextColor(e);
                                }}
                            />
                        </label>


                    </div>




                </div>
            </div>
            {/*<textarea className="optionCollection" onChange={handleContentChange} value={contentV}></textarea>*/}
            <div className="content"
                style={{
                    height: `${contentHeight}px`,
                    width: `${contentWidth}px`,
                    fontSize: `${contentFontSize}px`,
                    color: `${contentTextColor}`,
                    fontFamily:`${selectedFont}`

                }} contentEditable={true} spellCheck={false} ref={contentRef}>
                bannerManor
            </div>

            <button className="downloadButton" onClick={handleDownload}>Download</button>


            <div className="realContent"
                style={{
                    height: `${contentHeight}px`,
                    width: `${contentWidth}px`,
                    fontSize: `${contentFontSize}px`,
                    color: `${contentTextColor}`,
                    fontFamily:`${selectedFont}`
                }}

                ref={realContentRef}>

            </div>

        </div>



    )
}

export default MainContainer;
