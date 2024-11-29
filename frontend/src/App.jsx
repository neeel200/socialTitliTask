import { useState } from "react";
import UserInfoTable from "./components/Table";
import { Dropdown } from "./components/DropDown";
import "./App.css";
import wingOptions from "../wingData.json";

const App = () => {
  const [wing, setWing] = useState(undefined);
  const handleChange = (event) => {
    setWing(event.target.value);
  };

  return (
    <div>
      <Dropdown
        label="Wing: "
        options={wingOptions}
        value={wing}
        onChange={handleChange}
      />
      <UserInfoTable wing={wing}/>
    </div>
  );
};

export default App;
