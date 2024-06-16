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
import {HddDropDown} from "./components/dropdown/HddDropDown";
import {CpuCoolingDropDown} from "./components/dropdown/CpuCoolingDropDown";
import {FrameDropDown} from "./components/dropdown/FrameDropdown";
import {PowerUnitDropdown} from "./components/dropdown/PowerUnitDropdown";
import {CallGPT} from "./components/gptComponent/CallGPT";


function App() {
    let ssds = useSelector((state: RootState) => state.configurationCompatibility.ssd);
    let hdds = useSelector((state: RootState) => state.configurationCompatibility.hdd);

    console.log(hdds)
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
                    {hdds.length === 0 ? (
                        <HddDropDown hdd={null} chosenHdd={[]}/>
                    ) : (
                        hdds.map((hdd, index) => {
                            if (hdd === null) {
                                return <HddDropDown index={index} hdd={null} chosenHdd={hdds}/>
                            }
                            return (
                                <HddDropDown
                                    index={index}
                                    hdd={hdd}
                                    chosenHdd={hdds}
                                />
                            )

                        })
                    )}
                    <CpuCoolingDropDown/>
                    <FrameDropDown/>
                    <PowerUnitDropdown/>

                </div>
                <Advices/>
                <CallGPT/>

            </ComputerContextProvider>
        </div>

    );
}

export default App;