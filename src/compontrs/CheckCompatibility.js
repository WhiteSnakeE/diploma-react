import axios from "axios";
import {useState} from "react";

export const CheckCompatibility = ({url, selectedObject}) => {

    const [isOkay, setIsOkay] = useState(false);
    const check = () => {
        axios.post("test/" + url, selectedObject)
            .then(response => setIsOkay(response.data))
    }

    return (
        <div>
            {check}
            <h1>
                {() => console.log(isOkay)}
                {isOkay}
            </h1>
        </div>
    );
}