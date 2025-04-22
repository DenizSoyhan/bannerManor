import { useState } from "react";

function MainContainer(){

    const [contentV, setContentV] = useState<string>("bannerManor");

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        let newContent:string = e.target.value;
        setContentV(newContent);
        const contentElement:Element | null = document.querySelector(".content")
        if(contentElement){
            contentElement.textContent = newContent;
        }
    }

    return(
    <div className="mainContainer"> 
        <div className="optionCollection"></div>
        <textarea className="optionCollection" onChange={handleContentChange} value={contentV}></textarea>
        <div className="content">bannerManor</div>
        <button className="downloadButton">Download</button>
        
    </div>


    )
}

export default MainContainer;