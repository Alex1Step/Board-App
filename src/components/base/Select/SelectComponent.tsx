import React, { useState } from 'react';

import { ArrowDownOutlined } from '@ant-design/icons';

import { IselectProps } from './interfaces';

import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import styles from './Select.less';

const SelectComponent = (props: IselectProps): React.ReactElement => {
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
            <div className={styles.selectContainer}>
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
                <div className={styles.selectIcon}>
                    <ArrowDownOutlined />
                </div>
            </div>
        </div>
    );
};

export default SelectComponent;
