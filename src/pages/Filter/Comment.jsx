import React from "react";

const Comment=(props)=>{return(
    <div>
        {/* Comment sections */}
        <div className="mt-4" >
            <h2 className="text-blue-500 font-bol text-2xl ml-10" >{props.fName} {props.lName}</h2>
            <p className="ml-14 font-light " >{props.text}</p>
        </div>
        {/* {carData.comments[0]["comment"]} */}
    </div>
)}
export default Comment