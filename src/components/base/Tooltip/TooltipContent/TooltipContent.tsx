import React from 'react';
import styles from './TooltipContent.less';
import cn from 'classnames';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ITooltipContent } from './interfaces';

const TooltipContent = (props: ITooltipContent): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            <NavLink to={props.link} onClick={() => props.loadThisBoard(props.proj)}>
                <div
                    className={cn({
                        [styles.controlBtn]: true,
                        [styles.editButton]: true,
                    })}
                >
                    {t('description.editProject')}
                </div>
            </NavLink>
            <Button
                className={styles.controlBtn}
                type="primary"
                danger
                onClick={() => props.deleteCurrentProject!(props.proj)}
            >
                {t('description.deleteProject')}
            </Button>
        </div>
    );
};

export default TooltipContent;
