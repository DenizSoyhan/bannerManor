import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextHeight, faArrowsLeftRightToLine, faPaintbrush, faBorderTopLeft, faPalette, faItalic, faBold, faUnderline, faSpinner } from "@fortawesome/free-solid-svg-icons";
import FunButton from "./FunButton";

import "./index.css";

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

    const [bgColor, setBgColor] = useState<string>("#171717");

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
        "Playwrite RO",
        "Roboto Slab",
        "Playfair Display",
        "Coral Pixels",
        "Tagesschrift",
        "Wood Block CG"

    ];

    const fontSelectorRef = useRef<HTMLDivElement | null>(null);

    const [isItalic, setIsItalic] = useState<boolean>(false);
    const [isBold, setIsBold] = useState<boolean>(false);
    const [isUnderlined, setIsUnderlined] = useState<boolean>(false);

    const [borderColor, setBorderColor] = useState<string>("white");
    const [borderWidth, setBorderWidth] = useState<number>(0);
    const [borderStyle, setBorderStyle] = useState<string>("solid");
    const [borderRadius, setBorderRadius] = useState<number>(0);

    const borderStyles = [
        "none",
        "solid",
        "dashed",
        "dotted",
        "double",
        "groove",
        "ridge",
        "inset",
        "outset",

    ];

    const [borderStyleDropdownOpen, setBorderStyleDropdownOpen] = useState(false);
    const [hoveredBorderStyle, setHoveredBorderStyle] = useState<string | null>(null);

    const borderRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown container

    useEffect(() => {


        const handleClickOutside = (event: MouseEvent) => {
            // Check if click is outside font dropdown
            if (fontSelectorRef.current &&
                !fontSelectorRef.current.contains(event.target as Node)) {
                setFontDropdownOpen(false);
            }

            // Check if click is outside border dropdown - keep this as a separate condition
            if (borderRef.current &&
                !borderRef.current.contains(event.target as Node)) {
                setBorderStyleDropdownOpen(false);
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

    useEffect(() => {


        const handleItalic = (e: MouseEvent) => {
            const optionBar = document.getElementById("italic");

            if (!optionBar) return;

            if (optionBar.contains(e.target as Node)) {
                if (isItalic) {
                    setIsItalic(!isItalic);
                    optionBar?.classList.remove("active");
                } else {
                    setIsItalic(!isItalic);
                    optionBar?.classList.add("active");
                }
            }

        }

        document.addEventListener("mousedown", handleItalic);
        return () => {
            document.removeEventListener("mousedown", handleItalic);
        };
    }, [isItalic]);

    useEffect(() => {


        const handleBold = (e: MouseEvent) => {
            const optionBar = document.getElementById("bold");

            if (!optionBar) return;

            if (optionBar.contains(e.target as Node)) {
                if (isBold) {
                    setIsBold(!isBold);
                    optionBar?.classList.remove("active");
                } else {
                    setIsBold(!isBold);
                    optionBar?.classList.add("active");
                }
            }

        }

        document.addEventListener("mousedown", handleBold);
        return () => {
            document.removeEventListener("mousedown", handleBold);
        };
    }, [isBold]);

    useEffect(() => {

        const handleUnderline = (e: MouseEvent) => {
            const optionBar = document.getElementById("underline");

            if (!optionBar) return;

            if (optionBar.contains(e.target as Node)) {
                if (isUnderlined) {
                    setIsUnderlined(!isUnderlined);
                    optionBar?.classList.remove("active");
                } else {
                    setIsUnderlined(!isUnderlined);
                    optionBar?.classList.add("active");
                }
            }

        }

        document.addEventListener("mousedown", handleUnderline);
        return () => {
            document.removeEventListener("mousedown", handleUnderline);
        };
    }, [isUnderlined]);

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
        const newColor: string = e.target.value;
        setContentTextColor(newColor);

        const optionBar = document.getElementById("color") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newColor;
    }

    function handleBorderSize(e: React.ChangeEvent<HTMLInputElement>) {
        const newBorderSize: string = e.target.value;
        setBorderWidth(Number.parseInt(newBorderSize));

        const optionBar = document.getElementById("borderSize") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newBorderSize;
    }


    function handleBorderRadius(e: React.ChangeEvent<HTMLInputElement>) {
        const newBorderRadius: string = e.target.value;
        setBorderRadius(Number.parseInt(newBorderRadius));

        const optionBar = document.getElementById("borderRadius") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newBorderRadius;
    }

    function handleBorderColor(e: React.ChangeEvent<HTMLInputElement>) {
        const newBorderColor: string = e.target.value;
        setBorderColor(newBorderColor);

        const optionBar = document.getElementById("borderColor") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newBorderColor;
    }

    function handleBgColor(e: React.ChangeEvent<HTMLInputElement>) {
        const newBgColor: string = e.target.value;
        setBgColor(newBgColor);

        const optionBar = document.getElementById("bgColor") as HTMLInputElement;

        if (!optionBar) return;

        optionBar.value = newBgColor;
    }





    function handleDownload(): void {
        const element: HTMLElement | null = document.querySelector('.content');
        if (element) {
            html2canvas(element, {
                width: contentWidth,
                height: contentHeight,
                scale: 1, // prevent scaling based on device pixel ratio
                useCORS: true, // here for external fonts or images
                backgroundColor: 'transparent',
            }).then(canvas => {
                const link: HTMLAnchorElement = document.createElement('a');
                link.download = `${contentText}.png`;
                link.href = canvas.toDataURL("image/png");
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

        <FunButton></FunButton>
            <div className="allTheOptions"> 
                
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


                        <div className="info">
                            <FontAwesomeIcon icon={faPalette} />

                            <label className="colorPickerWrapper" style={{ backgroundColor: bgColor }}>
                                <input
                                    type="color"
                                    className="colorPicker"
                                    id="bgColor"
                                    value={`${bgColor}`}
                                    onChange={(e) => {
                                        handleBgColor(e);
                                    }}
                                />
                            </label>


                        </div>


                    </div>



                    <div className="optionContainer" id="borderOptions" ref={borderRef}>
                        <div className="info">

                            <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faBorderTopLeft} />
                            <div className="info">


                                <input

                                    type="number"
                                    id="borderSize"
                                    value={`${borderWidth}`}
                                    onChange={(e) => {
                                        handleBorderSize(e);
                                    }}
                                />
                                <span className="unit">px</span>

                            </div>


                            <div className="deneme">
                                <div
                                    className="borderStyleSelectorHeader"
                                    onClick={() => setBorderStyleDropdownOpen(!borderStyleDropdownOpen)}
                                    style={{
                                        padding: "2px",
                                        paddingLeft: "5px",
                                        backgroundColor: "#1e1e1e",
                                        border: "1px solid #555",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        width: "70px",
                                        height: "30px",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {borderStyle}
                                </div>
                                {borderStyleDropdownOpen && (
                                    <div
                                        id="borderSt"
                                        style={{
                                            marginTop: "2px",
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
                                        {borderStyles.map((bs) => (
                                            <div
                                                key={bs}
                                                onMouseEnter={() => setHoveredBorderStyle(bs)}
                                                onMouseLeave={() => setHoveredBorderStyle(null)}
                                                onClick={() => {
                                                    setBorderStyle(bs);
                                                    setBorderStyleDropdownOpen(false);

                                                }}
                                                style={{
                                                    minHeight: "25px",
                                                    width: "91%",
                                                    fontSize: "20px",
                                                    padding: "8px",
                                                    marginBottom: "4px",
                                                    borderRadius: "4px",
                                                    backgroundColor:
                                                        hoveredBorderStyle === bs || borderStyle === bs
                                                            ? "#727475"
                                                            : "transparent",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {bs}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>


                            <FontAwesomeIcon style={{ marginLeft: "15px" }} icon={faPaintbrush} />
                            <label className="colorPickerWrapper" style={{ backgroundColor: borderColor }}>
                                <input
                                    type="color"
                                    className="colorPicker"
                                    id="borderColor"
                                    value={`${borderColor}`}
                                    onChange={(e) => {
                                        handleBorderColor(e);
                                    }}
                                />
                            </label>


                        <FontAwesomeIcon icon={faSpinner} style={{marginRight:"5px", marginLeft:"16px"}}/>
                            <input 
                                type="number"
                                id="borderRadius"
                                value={`${borderRadius}`}
                                onChange={(e) => {
                                    handleBorderRadius(e);
                                }}
                                style={{cursor:"pointer"}}
                            />
                            <span className="unit">px</span>

                        </div>


                    </div>


                </div>



                <div className="optionCollection">

                    <div className="optionContainer" ref={fontSelectorRef}>
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
                                            display:"flex",
                                            alignItems:"center",
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
                                style={{cursor:"pointer"}}
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
                    <div className="optionContainer">

                        <div className="tStyleButton" id="italic">
                            <FontAwesomeIcon icon={faItalic} />
                        </div>
                        <div className="tStyleButton" id="bold">
                            <FontAwesomeIcon icon={faBold} />
                        </div>
                        <div className="tStyleButton" id="underline">
                            <FontAwesomeIcon icon={faUnderline} />
                        </div>

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
                    fontFamily: `${selectedFont}`,
                    fontWeight: isBold ? "bold" : "",
                    textDecoration: isUnderlined ? "underline" : "",
                    backgroundColor: `${bgColor}`,
                    borderColor: `${borderColor}`,
                    fontStyle: isItalic ? "italic" : "",
                    borderWidth: `${borderWidth}px`,
                    borderStyle: `${borderStyle}`,
                    borderRadius:`${borderRadius}px`,


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
                    fontFamily: `${selectedFont}`,
                    fontWeight: isBold ? "bold" : "",
                    textDecoration: isUnderlined ? "underline" : "",
                    fontStyle: isItalic ? "italic" : "",
                    backgroundColor: `${bgColor}`,
                    borderColor: `${borderColor}`,
                    borderWidth: `${borderWidth}px`,
                    borderStyle: `${borderStyle}`,
                    borderRadius:`${borderRadius}px`,
                }}

                ref={realContentRef}>

            </div>

        </div>



    )
}

export default MainContainer;
