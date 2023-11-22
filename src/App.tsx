import {MotherboardDropDown} from "./components/dropdown/MotherboardDropDown"
import React, {useState} from "react";
import {ProcessorDropDown} from "./components/dropdown/ProcessorDropDown";
import {RamDropDown} from "./components/dropdown/RamDropDown";
import {ComputerContextProvider} from "./context/ComputerConfigurationContext";


function App() {

    const [motherboard, setMotherBoard] = useState({
        _id: "yourDefaultMotherboardId",
        name: "YourDefaultMotherboardName",
        price: 0,
        platform: null,
        max_TDP_proccesor: "YourDefaultTDP",
        memory: null,
        network_and_multimedia: null,
        expansion_slots: null,
        internal_interfaces: null,
        status: null,
    });

  return (
      <div>
          <ComputerContextProvider>
              <div>
                  <MotherboardDropDown/>
              </div>
          </ComputerContextProvider>

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