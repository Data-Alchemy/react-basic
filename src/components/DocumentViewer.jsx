import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewer = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <ResizableBox
      width={300}
      height={750}
      minConstraints={[200, 300]}
      maxConstraints={[800, 1000]}
      axis="both"
      resizeHandles={['w']}
      style={{ overflow: 'hidden' }} // Ensure content doesn't overflow when resizing
    >
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px', position: 'relative' }}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <IconButton
          onClick={onClose} // Ensure using the onClose function from props
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </ResizableBox>
  );
};



export default DocumentViewer;
