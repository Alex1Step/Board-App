import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './InputComponent.less';
import { IinputProps } from './interfaces';

const InputComponent = (props: IinputProps): JSX.Element => {
    const [hideShow, setHideShow] = useState(1);

    const inputType: string = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    let clsInput = [styles.inputHide];
    let clsP = [styles.textShow];
    if (hideShow === 0) {
        clsInput = [styles.inputShow];
        clsP = [styles.textHide];
    }

    return props.withoutSubstitution ? (
        <Input type={inputType} id={htmlFor} value={props.value} onChange={props.onChange} autoFocus={true} />
    ) : (
        <div className={styles.inputContainer}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <span
                className={clsP.join(' ')}
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {props.value}
            </span>
            <Input
                ref={(ref) => ref?.focus()}
                className={clsInput.join(' ')}
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                onBlur={() => setHideShow(1)}
            />
        </div>
    );
};

export default InputComponent;
