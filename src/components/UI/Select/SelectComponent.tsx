import React, { useState } from 'react';
import styles from './Select.less';
import { IinputProps } from './interfaces';

const SelectComponent = (props: IinputProps): JSX.Element => {
    const [hideShow, setHideShow] = useState(1);

    const inputType: string = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;
    let optionsForSelect: Array<React.ReactNode> = [];
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
            <span className={clsP.join(' ')} onClick={() => setHideShow(0)}>
                {props.value}
            </span>
            <select
                ref={(ref) => ref?.focus()}
                id={htmlFor}
                value={props.value}
                className={clsSelect.join(' ')}
                onChange={props.onChange}
                onBlur={() => setHideShow(1)}
            >
                {optionsForSelect}
            </select>
        </div>
    );
};

export default SelectComponent;
