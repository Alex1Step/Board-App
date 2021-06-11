import React, { useState, useRef } from "react"
import styles from './Select.less'

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement })=>void
}

const Select = (props: InputProps) => {
    const [hideShow, setHideShow] = useState(1);

    const inputType: string = props.type || "text";
    const htmlFor: string = `${inputType}-${Math.random()}`;
    let optionsForSelect: any;
    if (inputType === "select") {
        let options = ["High", "Medium", "Low"]
        optionsForSelect = options.map( (opt, i) => <option key={i} value={opt}>{opt}</option> )
    }

    let clsSelect = [styles.selectHide];
    let clsP = [styles.textShow];
    if (hideShow===0) {
        clsSelect = [styles.selectShow];
        clsP = [styles.textHide];
    }

    return (
            <React.Fragment>
                <label htmlFor={htmlFor}>{props.label}</label>
                <p className={clsP.join(' ')} onClick={ () => {
                    setHideShow (0)
                }
                }>
                    {props.value}
                </p>
                <select 
                    ref = {(ref) => ref?.focus()}
                    id={htmlFor}
                    value={props.value}
                    className={clsSelect.join(' ')}
                    onChange={props.onChange}
                    onBlur={ () => {setHideShow (1)} }
                >
                    {optionsForSelect}
                </select>
            </React.Fragment>    
    )
}

export default Select