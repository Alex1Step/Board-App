import React, { useState, useRef } from "react"
import styles from './Input.less'

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement })=>void,
    withoutSubstitution?: boolean
}

const Input = (props: InputProps) => {

    const [hideShow, setHideShow] = useState(1);
    const textInput = useRef<HTMLInputElement>(null);

    const inputType: string = props.type || "text";
    const htmlFor: string = `${inputType}-${Math.random()}`;

    let clsInput = [styles.inputHide];
    let clsP = [styles.textShow];
    if (hideShow===0) {
        clsInput = [styles.inputShow];
        clsP = [styles.textHide];
    }
    
    return (
            (props.withoutSubstitution===true)?
                (<React.Fragment>
                    <input
                        type={inputType}
                        id={htmlFor}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </React.Fragment>)
            :
                (<React.Fragment>
                    <label htmlFor={htmlFor}>{props.label}</label>
                    <p className={clsP.join(' ')} onClick={ () => {
                        setHideShow (0);
                        if (textInput.current !== null) {
                            textInput.current?.click()                                 
                        }
                    }
                    }>
                        {props.value}
                    </p>
                    <input 
                        ref={textInput}
                        className={clsInput.join(' ')}
                        type={inputType}
                        id={htmlFor}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={ () => {setHideShow (1)} }
                    />
                </React.Fragment>)
    )
}

export default Input