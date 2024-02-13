import {MotherboardDropDown} from "./components/dropdown/MotherboardDropDown"
import React from "react";
import {ProcessorDropDown} from "./components/dropdown/ProcessorDropDown";
import {RamDropDown} from "./components/dropdown/RamDropDown";
import {ComputerContextProvider} from "./context/ComputerConfigurationContext";
import {ComponentCard} from "./components/componentCard/ComponentCard";
import {ComponentCount} from "./components/Count/ComponentCount";
import Dropdown from "./Dropdown";
import {Advices} from "./components/Advices/Advices";


function App() {

    return (
        <div>
            <ComputerContextProvider>
                <div>
                    <MotherboardDropDown/>
                    <ProcessorDropDown/>
                    <RamDropDown/>
                </div>
                <Advices/>
            </ComputerContextProvider>
        </div>

    );
}

export default App;