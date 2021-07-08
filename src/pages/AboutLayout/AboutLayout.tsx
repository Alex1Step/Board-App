import React from 'react';
import FormConstructor from '../../helper/FormConstructor/FormConstructor';
import styles from './AboutLayout.less';

import GreetingView from '../../components/custom/GreetingView/GreetingView';

const AboutLayout: React.FC = () => {
    return (
        <div className={styles.about}>
            <GreetingView />
            <FormConstructor
                formSettings={{ className: 'temp', formName: 'temp1', submit: () => console.log('true') }}
                itemsSettings={[
                    { type: 'input', label: 'input', name: 'input2', defaultValue: 'input3' },
                    { type: 'input', label: 'input', name: 'input2' },
                    { type: 'divider', label: 'divider1', name: 'divider2', defaultValue: 'divider3' },
                    {
                        type: 'select',
                        label: 'select1',
                        name: 'select2',
                        defaultValue: 'select3',
                        optionsForSelect: [
                            { value: '1', text: 'one' },
                            { value: '2', text: 'two' },
                            { value: '3', text: 'three' },
                        ],
                    },
                    {
                        type: 'select',
                        label: 'select1',
                        name: 'select2',
                        optionsForSelect: [
                            { value: '1', text: 'one' },
                            { value: '2', text: 'two' },
                            { value: '3', text: 'three' },
                        ],
                    },
                    {
                        type: 'select',
                        label: 'select1',
                        name: 'select2',
                        defaultValue: 'select3',
                    },
                    { type: 'divider', label: 'divider1', name: 'divider2', defaultValue: 'divider3' },
                    {
                        type: 'date',
                        label: 'date1',
                        name: 'date1',
                        defaultValue: '2015/01/01',
                        dateFormat: 'YYYY/MM/DD',
                    },
                    {
                        type: 'date',
                        label: 'date1',
                        name: 'date1',
                        defaultValue: '2015/01/01',
                    },
                    {
                        type: 'date',
                        label: 'date1',
                        name: 'date1',
                        dateFormat: 'YYYY/MM/DD',
                    },
                    { type: 'divider', label: 'divider1', name: 'divider2', defaultValue: 'divider3' },
                    {
                        type: 'button',
                        label: 'button1',
                        name: 'button2',
                        defaultValue: 'button3',
                        htmlType: 'submit',
                    },
                    {
                        type: 'button',
                        label: 'button1',
                        name: 'button2',
                        defaultValue: 'button3',
                        htmlType: 'reset',
                    },
                    { type: 'divider', label: 'divider1', name: 'divider2', defaultValue: 'divider3' },
                    {
                        type: 'checkbox',
                        label: 'check1',
                        name: 'check2',
                        onChange: () => console.log('from checkbox'),
                        checkBoxText: 'new checkbox',
                        defaultChecked: false,
                    },
                ]}
            />
        </div>
    );
};

export default AboutLayout;
