import React, { useState } from 'react';

import { DatePicker } from 'antd';

import { Moment } from 'moment';
import moment from 'moment';

import cn from 'classnames';

import styles from './Date.less';

const DateComponent = (props: {
    value: string;
    onChange: (value: Moment | null, dateString: string) => void;
    label: string;
}): React.ReactElement => {
    const { onChange, value, label } = props;

    const [hideShow, setHideShow] = useState(1);

    return (
        <div className={styles.inputDateContainer}>
            <label>{label}</label>
            <span
                className={styles.dateSpan}
                onClick={() => {
                    setHideShow(0);
                }}
            >
                {value}
            </span>
            <DatePicker
                data-testid="datepicker"
                className={cn({
                    [styles.datePicker]: true,
                    [styles.inputHide]: hideShow,
                    [styles.inputShow]: !hideShow,
                })}
                defaultValue={moment(new Date(), 'DD MMM, YYYY')}
                defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
                allowClear={false}
                autoFocus={true}
                showToday={false}
                dropdownClassName={styles['ant-picker-dropdown-placement-bottomRight']}
                onChange={onChange}
                onBlur={() => setHideShow(1)}
            />
        </div>
    );
};

export default DateComponent;
