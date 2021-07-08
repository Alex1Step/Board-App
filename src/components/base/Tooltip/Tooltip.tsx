import React, { useState } from 'react';
import styles from './Tooltip.less';
import cn from 'classnames';

const Tooltip = (props: { children: any; content: any }): JSX.Element => {
    const [show, setShow] = useState(false);

    return (
        <div className={styles.tooltipContainer} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div
                className={cn({
                    [styles.tooltipBox]: true,
                    [styles.visible]: show,
                })}
            >
                {props.content()}
                <span className={styles.tooltipArrow}></span>
                <span className={styles.tooltipUnderArrow}></span>
            </div>
            <div>{props.children}</div>
        </div>
    );
};

export default Tooltip;
