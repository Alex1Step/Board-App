import React, { useState } from 'react';
import styles from './Date.less';
import cn from 'classnames';
import { DatePicker } from 'antd';
import { Moment } from 'moment';

const DateComponent = (props: {
    value: string;
    onChange: (value: Moment | null, dateString: string) => void;
    label: string;
}): JSX.Element => {
    const { onChange, value, label } = props;

    const [hideShow, setHideShow] = useState(1);

    return (
        <div className={styles.inputDateContainer}>
            <label>{label}</label>
            <span
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {value}
            </span>
            <DatePicker
                className={cn({
                    [styles.datePicker]: true,
                    [styles.inputHide]: hideShow,
                    [styles.inputShow]: !hideShow,
                })}
                onChange={props.onChange}
                onBlur={() => setHideShow(1)}
            />
        </div>
    );
};

export default DateComponent;
