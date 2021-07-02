import React, { useState } from 'react';
import styles from './Select.less';
import { IselectProps } from './interfaces';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

const SelectComponent = (props: IselectProps): JSX.Element => {
    const { type, options, labelForOptions, label, value, onChange } = props;

    const [hideShow, setHideShow] = useState(1);

    const inputType: string = type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    const { t } = useTranslation();

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
                {label === t('description.priority')
                    ? value !== 'none'
                        ? labelForOptions[options.findIndex((elem) => elem === value)]
                        : 'none'
                    : value}
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
                        {labelForOptions[index]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
