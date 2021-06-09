import React from "react"

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>)=>void
}

const Input = (props: InputProps) => {
    const inputType: string = props.type || "text";
    const htmlFor: string = `${inputType}-${Math.random()}`;
    let optionsForSelect: any;
    if (inputType === "select") {
        let options = ["Height", "Medium", "Low"]
        optionsForSelect = options.map( (opt, i) => <option key={i} value={opt}>{opt}</option> )
    }
    return (  
            (inputType !== "select")
            ?
            <React.Fragment>
                <label htmlFor={htmlFor}>{props.label}</label>
                <input 
                    type={inputType}
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                />
            </React.Fragment>
            : 
            <React.Fragment>
                <label htmlFor={htmlFor}>{props.label}</label>
                <select 
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {optionsForSelect}
                </select>
            </React.Fragment>    
    )
}

export default Input