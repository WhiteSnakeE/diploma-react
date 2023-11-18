import {MotherboardDropDown} from "./components/dropdown/MotherboardDropDown"
import React from "react";
import {ProcessorDropDown} from "./components/dropdown/ProcessorDropDown";
import {RamDropDown} from "./components/dropdown/RamDropDown";

function App() {

  return (
      <div>
          <div>
              <MotherboardDropDown/>
          </div>
          <div>
              <ProcessorDropDown/>
          </div>
          <div>
             <RamDropDown/>
          </div>
      </div>

  );
}

export default App;