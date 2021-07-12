import React from 'react';
import InputComponent from '../../base/Input/InputComponent';
import styles from './AdminModalContent.less';
import { useTranslation } from 'react-i18next';
import { IAdminModalContent } from './interfaces';
import CustomForm from '../CustomForm/CustomForm';
import indexValidation from '../../../validation/indexValidation';

const AdminModalContent = (props: IAdminModalContent): JSX.Element => {
    const { isModal, title, setProjectTitle, addAssignee } = props;
    const { t } = useTranslation();

    return (
        <div className={styles.forModal}>
            {isModal ? (
                <InputComponent
                    type="text"
                    label=""
                    value={title}
                    onChange={(event) => {
                        setProjectTitle(event.target.value);
                    }}
                    withoutSubstitution={true}
                />
            ) : (
                <CustomForm
                    validation={indexValidation.newAssigneeValidation}
                    formSettings={{ submit: addAssignee }}
                    itemsSettings={[
                        {
                            type: 'input',
                            label: t('description.name'),
                            name: 'name',
                            inputType: 'input',
                        },
                        {
                            type: 'input',
                            label: t('description.mail'),
                            name: 'email',
                            inputType: 'input',
                        },
                        {
                            type: 'button',
                            label: 'add',
                            name: 'add',
                            defaultValue: t('description.add'),
                            htmlType: 'submit',
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default AdminModalContent;
