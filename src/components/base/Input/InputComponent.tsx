import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './InputComponent.less';
import { IinputProps } from './interfaces';
import cn from 'classnames';

const InputComponent = (props: IinputProps): JSX.Element => {
    const { type, label, value, onChange, withoutSubstitution } = props;

    const [hideShow, setHideShow] = useState(1);

    const inputType: string = type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return withoutSubstitution ? (
        <Input type={inputType} id={htmlFor} value={value} onChange={onChange} autoFocus={true} />
    ) : (
        <div className={styles.inputContainer}>
            <label htmlFor={htmlFor}>{label}</label>
            <span
                className={cn({
                    [styles.textShow]: hideShow === 1,
                    [styles.textHide]: hideShow === 0,
                })}
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {value}
            </span>
            <Input
                ref={(ref) => ref?.focus()}
                className={cn({
                    [styles.inputHide]: hideShow === 1,
                    [styles.inputShow]: hideShow === 0,
                })}
                type={inputType}
                id={htmlFor}
                value={value}
                onChange={onChange}
                onBlur={() => setHideShow(1)}
            />
        </div>
    );
};

export default InputComponent;
