import React, { useState } from "react"
import { Input } from 'antd';
import styles from './InputComponent.less'

interface InputProps {
    type: string,
    label: string,
    value: string,
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement })=>void,
    withoutSubstitution?: boolean
}

const InputComponent = (props: InputProps) => {

    const [hideShow, setHideShow] = useState(1);

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
                    <Input
                        type={inputType}
                        id={htmlFor}
                        value={props.value}
                        onChange={props.onChange}
                        autoFocus={true}
                    />
                </React.Fragment>)
            :
                (<div className={styles["input-container"]}>
                    <label htmlFor={htmlFor}>{props.label}</label>
                    <span className={clsP.join(' ')} onClick={ () => {
                        setHideShow (0);
                    }
                    }>
                        {props.value}
                    </span>
                    <Input
                        ref = {(ref) => ref?.focus()}
                        className={clsInput.join(' ')}
                        type={inputType}
                        id={htmlFor}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={ () => {setHideShow (1)} }
                    />
                </div>)
    )
}

export default InputComponent