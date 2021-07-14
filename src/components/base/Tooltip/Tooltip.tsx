import React, { useState } from 'react';

import cn from 'classnames';

import styles from './Tooltip.less';

const Tooltip = (props: { children: React.ReactElement; content: () => React.ReactElement }): React.ReactElement => {
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
