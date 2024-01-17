import {MotherboardDropDown} from "./components/dropdown/MotherboardDropDown"
import React from "react";
import {ProcessorDropDown} from "./components/dropdown/ProcessorDropDown";
import {RamDropDown} from "./components/dropdown/RamDropDown";
import {ComputerContextProvider} from "./context/ComputerConfigurationContext";
import {ComponentCard} from "./components/componentCard/ComponentCard";


function App() {

  return (
      <div>
          <ComputerContextProvider>
              <div>
                  <MotherboardDropDown/>
                  <ProcessorDropDown/>
                  <RamDropDown/>
              </div>
          </ComputerContextProvider>
          <div>
          </div>
          <div>
          </div>
      </div>

  );
}

export default App;