import { useState } from "react";
import UserInfoTable from "./components/Table";
import { Dropdown } from "./components/DropDown";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import wingOptions from "../wingData.json";
import { PDFTronViewer } from "./components/PDFTronViewer";
import TextEditor from "./components/TextEditor";
const App = () => {
  const [wing, setWing] = useState(undefined);
  const handleChange = (event) => {
    setWing(event.target.value);
  };

  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button className="navBtn ">
                <nav>
                  <Link to="/editpdf">EDIT PDF</Link>
                </nav>
              </button>
              <button className="navBtn txtEdit">
                <nav>
                  <Link to="/texteditor">Text Editor</Link>
                </nav>
              </button>
              <Dropdown
                label="Wing: "
                options={wingOptions}
                value={wing}
                onChange={handleChange}
              />
              <UserInfoTable wing={wing} />{" "}
            </>
          }
        />
        <Route path="/editpdf" element={<PDFTronViewer />} />
        <Route
          path="/texteditor"
          element={
            <div className="App">
              <h1>Text Editor</h1>
              <TextEditor
                initialData="<p>Start writing here...</p>"
                placeholder="Type your content..."
                onChange={handleEditorChange}
              />
              <div>
                <h2>Editor Output:</h2>
                <div>{editorData}</div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
