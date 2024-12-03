import  { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
// import './App.css';

const PDFTronViewer = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    WebViewer.WebComponent(
      {
        path: '/webviewer/lib',
        initialDoc: '', // Default PDF
        licenseKey:'demo:1732691719358:7ec59cba0300000000cf145d824db4a63862688b1ebfc0370c8037a49e', // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current,
    ).then((inst) => {
      setInstance(inst);
    });
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (instance) {
          instance.UI.loadDocument(e.target.result, { filename: file.name });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="App">
      <div className="header">Pdf Editor</div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
      </div>
      <div  ref={viewer} style={{ height: '600px' }}></div>
    </div>
  );
};

export {PDFTronViewer};
