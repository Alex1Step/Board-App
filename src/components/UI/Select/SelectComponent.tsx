import React, { useState } from 'react';
import { Select } from 'antd';
import styles from './Select.less';
import store from '../../../redux/store';

interface InputProps {
    type: string;
    label: string;
    value: string;
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement }) => void;
}

const SelectComponent = (props: InputProps) => {
    const [hideShow, setHideShow] = useState(1);

    const inputType: string = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;
    let optionsForSelect: any;
    if (inputType === 'select') {
        const options = ['High', 'Medium', 'Low'];
        optionsForSelect = options.map((opt, i) => (
            <option key={i} value={opt}>
                {opt}
            </option>
        ));
    }

    let clsSelect = [styles.selectHide];
    let clsP = [styles.textShow];
    if (hideShow === 0) {
        clsSelect = [styles.selectShow];
        clsP = [styles.textHide];
    }

    return (
        <div className={styles.selectContainer}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <span
                className={clsP.join(' ')}
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {props.value}
            </span>
            <select
                ref={(ref) => ref?.focus()}
                id={htmlFor}
                value={props.value}
                className={clsSelect.join(' ')}
                onChange={props.onChange}
                onBlur={() => {
                    setHideShow(1);
                }}
            >
                {optionsForSelect}
            </select>
        </div>
    );
};

export default SelectComponent;
