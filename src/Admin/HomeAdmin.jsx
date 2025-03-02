import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import CarsAdmin from "./CarsAdmin";
import NearReservations from "./NearReservations";
import Chauffeurs from "./Chauffeurs";

const HomeAdmin =()=>{
    const [operation , setOperation] = useState(1)
    return(
        <div className="" >
            <NavbarAdmin operation={operation} setOperation={setOperation} />
            {/* <h1>Admin</h1> */}
            <div>
                {operation === 1 && <CarsAdmin />}
                {operation === 2 && <NearReservations />}
                {operation === 3 && <Chauffeurs />}
            </div>
        </div>
    )
}

export default HomeAdmin