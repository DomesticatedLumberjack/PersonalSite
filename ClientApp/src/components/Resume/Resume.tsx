import React, { useState } from "react";
import {Document, Page} from "react-pdf";

const Resume : React.FC = () => {
    const filePath = "Resume.pdf";
    const [numPages, setNumPages] = useState(undefined);

    const onDocLoadSuccess = ({numPages}: any) => {
        setNumPages(numPages);
    }

    return(
        <div style={{textAlign: "center"}}>
            <Document options={{workerSrc: "pdf.worker.js"}} file={filePath} onLoadSuccess={onDocLoadSuccess}>
                <Page scale={2} pageNumber={numPages}/>
            </Document>
        </div>
    )
}

export default Resume;