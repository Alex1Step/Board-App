import React, { useState } from 'react';
import styles from './Select.less';
import { IselectProps } from './interfaces';
import cn from 'classnames';

const SelectComponent = (props: IselectProps): JSX.Element => {
    const { type, options, label, value, onChange } = props;

    const [hideShow, setHideShow] = useState(1);

    const inputType: string = type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return (
        <div className={styles.selectContainer}>
            <label htmlFor={htmlFor}>{label}</label>
            <span
                className={cn({
                    [styles.textShow]: hideShow === 1,
                    [styles.textHide]: hideShow === 0,
                })}
                onClick={() => setHideShow(0)}
            >
                {value}
            </span>
            <select
                ref={(ref) => ref?.focus()}
                id={htmlFor}
                value={value}
                className={cn({
                    [styles.selectHide]: hideShow === 1,
                    [styles.selectShow]: hideShow === 0,
                })}
                onChange={onChange}
                onBlur={() => setHideShow(1)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
