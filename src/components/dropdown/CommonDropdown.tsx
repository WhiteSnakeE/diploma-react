// import {MotherboardApi} from "../../api/motherboardApi";
// import React from "react";
// import {MotherboardDropDown} from "./MotherboardDropDown";
//
// export const CommonDropdown  = () => {
//     const {data: motherboards, error, isLoading} = MotherboardApi.useGetAllMotherBoardsQuery();
//     if (isLoading) {
//         return <p>Loading...</p>;
//     }
//
//     if (error) {
//         return <p>Error: Failed to fetch motherboards data</p>;
//     }
//
//     return (
//         <div>
//             <div>
//                <MotherboardDropDown motherboards={motherboards}/>
//             </div>
//         </div>
// }