import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './InputComponent.less';
import { IinputProps } from './interfaces';
import cn from 'classnames';
import { toUpper } from 'lodash';

const { TextArea } = Input;

const InputComponent = (props: IinputProps): JSX.Element => {
    const { withWrap, type, label, value, onChange, withoutSubstitution } = props;

    const [hideShow, setHideShow] = useState(1);

    const inputType: string = type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return withoutSubstitution ? (
        <Input type={inputType} id={htmlFor} value={value} onChange={onChange} autoFocus={true} />
    ) : (
        <div
            className={cn({
                [styles.inputContainer]: toUpper,
                [styles.wrapLabel]: withWrap,
                [styles.ifTextArea]: inputType === 'textarea',
            })}
        >
            <label htmlFor={htmlFor}>{label}</label>
            <span
                className={cn({
                    [styles.textShow]: hideShow,
                    [styles.textHide]: !hideShow,
                })}
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {value}
            </span>
            {inputType === 'textarea' ? (
                <TextArea
                    rows={3}
                    ref={(ref) => ref?.focus()}
                    className={cn({
                        [styles.inputHide]: hideShow,
                        [styles.inputShow]: !hideShow,
                    })}
                    id={htmlFor}
                    value={value}
                    onChange={onChange}
                    onBlur={() => setHideShow(1)}
                />
            ) : (
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
            )}
        </div>
    );
};

export default InputComponent;
