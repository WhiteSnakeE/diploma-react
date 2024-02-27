import {MotherboardDropDown} from "./components/dropdown/MotherboardDropDown"
import React from "react";
import {ProcessorDropDown} from "./components/dropdown/ProcessorDropDown";
import {RamDropDown} from "./components/dropdown/RamDropDown";
import {ComputerContextProvider} from "./context/ComputerConfigurationContext";
import {Advices} from "./components/Advices/Advices";
import {VideocardDropDown} from "./components/dropdown/VideocardDropDown";
import {useSelector} from "react-redux";
import {RootState} from "./api/store";
import {SsdDropDown} from "./components/dropdown/SsdDropdown";


function App() {
    let ssds = useSelector((state: RootState) => state.configurationCompatibility.ssd);

    console.log(ssds)

    return (
        <div>
            <ComputerContextProvider>
                <div>
                    <MotherboardDropDown/>
                    <ProcessorDropDown/>
                    <RamDropDown/>
                    <VideocardDropDown/>
                    {ssds.length === 0 ? (
                        <SsdDropDown ssd={null} chosenSsd={[]}/>
                    ) : (
                        ssds.map((ssd, index) => {

                            if (ssd === null) {
                                return <SsdDropDown index={index} ssd={null} chosenSsd={ssds}/>
                            }
                            return (
                                <SsdDropDown
                                    index={index}
                                    ssd={ssd}
                                    chosenSsd={ssds}
                                />
                            )

                        })
                    )}

                </div>

                <Advices/>

            </ComputerContextProvider>
        </div>

    );
}

export default App;