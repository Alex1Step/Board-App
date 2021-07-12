import { Divider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DateComponent from '../../../base/DateComponent/DateComponent';
import InputComponent from '../../../base/Input/InputComponent';
import SelectComponent from '../../../base/Select/SelectComponent';
import styles from './CardForm.less';
import cn from 'classnames';
import { ICardForm } from './interfaces';

const CardForm = (props: ICardForm): JSX.Element => {
    const { taskInfo, assigneeArray, changeFunc, changeDateFunc } = props;
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = taskInfo;

    const { t } = useTranslation();

    return (
        <div
            className={cn({
                [styles.cardOnModal]: true,
            })}
        >
            <InputComponent
                type={'text'}
                label={t('description.task')}
                value={taskName}
                onChange={(event) => changeFunc(event, Number(fromBoard), id, 'taskName')}
            />
            <Divider className={styles.dividerCustom} dashed={true} />
            <DateComponent onChange={changeDateFunc} value={deadlineDate} label={'Deadline'} />
            {new Date(deadlineDate) < new Date() && (
                <span
                    className={cn({
                        [styles.attention]: true,
                        [styles.blink]: true,
                    })}
                >
                    {t('description.attention')}
                </span>
            )}
            <Divider className={styles.dividerCustom} dashed={true} />
            <SelectComponent
                type={'select'}
                options={['High', 'Medium', 'Low']}
                labelForOptions={[`${t('description.high')}`, `${t('description.medium')}`, `${t('description.low')}`]}
                label={t('description.priority')}
                value={priority}
                onChange={(event) => changeFunc(event, Number(fromBoard), id, 'priority')}
            />
            <Divider className={styles.dividerCustom} dashed={true} />
            <SelectComponent
                type={'select'}
                options={[...assigneeArray]}
                labelForOptions={[...assigneeArray]}
                label={t('description.assignee')}
                value={assignee}
                onChange={(event) => changeFunc(event, Number(fromBoard), id, 'assignee')}
            />
            <Divider className={styles.dividerCustom} dashed={true} />
            <InputComponent
                withWrap={true}
                type={'textarea'}
                label={t('description.description')}
                value={description}
                onChange={(event) => changeFunc(event, Number(fromBoard), id, 'description')}
            />
        </div>
    );
};

export default CardForm;
