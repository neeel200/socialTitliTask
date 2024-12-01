import { useState } from "react";
import UserInfoTable from "./components/Table";
import { Dropdown } from "./components/DropDown";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import wingOptions from "../wingData.json";
import { PDFTronViewer } from "./components/PDFTronViewer";
const App = () => {
  const [wing, setWing] = useState(undefined);
  const handleChange = (event) => {
    setWing(event.target.value);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button className="navBtn">
                <nav>
                  <Link to="/editpdf">EDIT PDF</Link>
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
      </Routes>
    </div>
  );
};

export default App;
