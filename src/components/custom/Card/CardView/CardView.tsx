import React from 'react';
import styles from './CardView.less';
import { Divider } from 'antd';
import ButtonComponent from '../../../base/Button/ButtonComponent';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ICardView } from './interfaces';

const CardView = (props: ICardView): JSX.Element => {
    const { taskInfo, deleteFunc } = props;
    const { taskName, deadlineDate, priority, assignee, description } = taskInfo;

    const { t } = useTranslation();

    return (
        <>
            <span className={styles.infoLine}>
                {t('description.task')} {taskName}
            </span>
            <Divider className={styles.dividerCustom} dashed={true} />
            <span className={styles.infoLine}>
                {t('description.deadline')} {deadlineDate}
                {new Date(deadlineDate) < new Date() ? (
                    <span
                        className={cn({
                            [styles.attention]: true,
                            [styles.blink]: true,
                        })}
                    >
                        {t('description.attention')}
                    </span>
                ) : null}
            </span>
            <Divider className={styles.dividerCustom} dashed={true} />
            <span className={styles.infoLine}>
                {t('description.priority')} {priority}
            </span>
            <Divider className={styles.dividerCustom} dashed={true} />
            <span className={styles.infoLine}>
                {t('description.assignee')} {assignee}
            </span>
            <Divider className={styles.dividerCustom} dashed={true} />
            <span className={styles.infoLine}>
                {t('description.description')} {description}
            </span>
            <Divider className={styles.dividerCustom} dashed={true} />
            <div className={styles.cardButtonContainer}>
                <ButtonComponent onClick={deleteFunc} message={t('description.deleteTask')} />
            </div>
        </>
    );
};

export default CardView;