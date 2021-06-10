import React from "react"
import styles from './Select.less'

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement })=>void
}

const Select = (props: InputProps) => {
    const inputType: string = props.type || "text";
    const htmlFor: string = `${inputType}-${Math.random()}`;
    let optionsForSelect: any;
    if (inputType === "select") {
        let options = ["Height", "Medium", "Low"]
        optionsForSelect = options.map( (opt, i) => <option key={i} value={opt}>{opt}</option> )
    }
    return (
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

export default Select