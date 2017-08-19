import React from "react";

export default function (props) {
    console.log("RIGHT:", props.right);
    let secondaryClass = (props.right === true ? "bubble-right" : "bubble-left");
    return (
        <li className={`speech-bubble ${secondaryClass}`}
            key={props.key}>
            <div>
                {props.content}
            </div>

        </li>
    )
}