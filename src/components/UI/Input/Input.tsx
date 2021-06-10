import React from "react"
import styles from './Input.less'

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

const Input = (props: InputProps) => {
    const inputType: string = props.type || "text";
    const htmlFor: string = `${inputType}-${Math.random()}`;
    return (
            <React.Fragment>
                <label htmlFor={htmlFor}>{props.label}</label>
                <input 
                    type={inputType}
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                />
            </React.Fragment>
    )
}

export default Input