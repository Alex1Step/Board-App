import React from 'react';
import { IFormConstructor, ISelectOptions } from './interfaces';
import { Form, Input, Button, Select, DatePicker, Divider, Checkbox } from 'antd';
import moment from 'moment';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CustomForm = (props: IFormConstructor): JSX.Element => {
    const { formName, submit } = props.formSettings;

    const createInput = (defaultValue = '', flag = '') => {
        switch (flag) {
            case '':
                return <Input defaultValue={defaultValue ? defaultValue : ''} />;
                break;
            case 'password':
                return <Input.Password defaultValue={defaultValue ? defaultValue : ''} />;
                break;
            case 'textarea':
                return <Input.TextArea defaultValue={defaultValue ? defaultValue : ''} />;
                break;
            case 'search':
                return <Input.Search defaultValue={defaultValue ? defaultValue : ''} />;
                break;
            default:
                break;
        }
    };
    const createOptions = (option: ISelectOptions, index: number) => (
        <Option key={index} value={option.value}>
            {option.text}
        </Option>
    );
    const createSelect = (defaultValue = '', options = [{ value: 'no data', text: 'no data' }]) => (
        <Select defaultValue={defaultValue}>{options.map((option, index) => createOptions(option, index))}</Select>
    );
    const createDate = (defaultValue = new Date().toISOString().slice(0, 10), dateFormat = 'YYYY/MM/DD') => (
        <DatePicker defaultValue={moment(defaultValue, dateFormat)} format={dateFormat} />
    );
    const createButton = (textOnButton = 'button', htmlType = 'submit') =>
        htmlType === 'submit' ? (
            <Button type="primary" htmlType="submit">
                {textOnButton}
            </Button>
        ) : (
            <Button type="primary" htmlType="reset">
                {textOnButton}
            </Button>
        );

    const createCheckBox = (
        onChange = () => {
            console.log('can`t work');
        },
        checkBoxText = 'checkbox',
        defaultChecked = true,
    ) => (
        <Checkbox defaultChecked={defaultChecked} onChange={onChange}>
            {checkBoxText}
        </Checkbox>
    );

    const items = props.itemsSettings.map((item, index) => {
        switch (item.type) {
            case 'input':
                return (
                    <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
                        {createInput(item.defaultValue, item.flag)}
                    </Form.Item>
                );
                break;
            case 'select':
                return (
                    <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
                        {createSelect(item.defaultValue, item.optionsForSelect)}
                    </Form.Item>
                );
                break;
            case 'date':
                return (
                    <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
                        {createDate(item.defaultValue, item.dateFormat)}
                    </Form.Item>
                );
                break;
            case 'button':
                return (
                    <Form.Item {...tailLayout} key={index}>
                        {createButton(item.defaultValue, item.htmlType)}
                    </Form.Item>
                );
                break;
            case 'checkbox':
                return (
                    <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
                        {createCheckBox(item.onChange, item.checkBoxText, item.defaultChecked)}
                    </Form.Item>
                );
                break;
            case 'divider':
                return <Divider key={index} />;
                break;
            default:
                break;
        }
    });
    return (
        <div>
            <Form {...layout} name={formName} onFinish={submit}>
                {items}
            </Form>
        </div>
    );
};

export default CustomForm;
