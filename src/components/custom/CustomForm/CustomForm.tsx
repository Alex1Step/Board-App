import React from 'react';
import { IFormConstructor, ISelectOptions } from './interfaces';
import { Form, Input, Button, Select, DatePicker, Divider, Checkbox } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CustomForm = (props: IFormConstructor): JSX.Element => {
    const { submit } = props.formSettings;

    const initialValues = props.itemsSettings.map((item) => [item.name, item.defaultValue || '']);

    const formik = useFormik({
        initialValues: Object.fromEntries(initialValues),
        onSubmit: (values) => {
            submit(values);
        },
    });

    const createInput = (defaultValue = '', inputType = 'input', index: number, name: string) => {
        const inputTypes = new Map([
            ['input', <Input key={index} name={name} onChange={formik.handleChange} value={formik.values.username} />],
            [
                'password',
                <Input.Password key={name} name={name} onChange={formik.handleChange} value={formik.values.username} />,
            ],
            // ['textarea', <Input.TextArea key={Math.random()} defaultValue={defaultValue ? defaultValue : ''} />],
            // ['search', <Input.Search key={Math.random()} defaultValue={defaultValue ? defaultValue : ''} />],
        ]);
        return inputTypes.get(inputType);
    };
    // const createOptions = (option: ISelectOptions, index: number) => (
    //     <Option key={index} value={option.value}>
    //         {option.text}
    //     </Option>
    // );
    // const createSelect = (defaultValue = '', options = [{ value: 'no data', text: 'no data' }]) => (
    //     <Select defaultValue={defaultValue}>{options.map((option, index) => createOptions(option, index))}</Select>
    // );
    // const createDate = (defaultValue = new Date().toISOString().slice(0, 10), dateFormat = 'YYYY/MM/DD') => (
    //     <DatePicker defaultValue={moment(defaultValue, dateFormat)} format={dateFormat} />
    // );
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

    // const createCheckBox = (
    //     onChange = () => {
    //         console.log('can`t work');
    //     },
    //     checkBoxText = 'checkbox',
    //     defaultChecked = true,
    // ) => (
    //     <Checkbox defaultChecked={defaultChecked} onChange={onChange}>
    //         {checkBoxText}
    //     </Checkbox>
    // );

    const items = props.itemsSettings.map((item, index) => {
        const formElements = new Map([
            [
                'input',
                <Form.Item key={index} name={item.name} label={item.label}>
                    {createInput(item.defaultValue, item.inputType, index, item.name)}
                </Form.Item>,
            ],
            // [
            //     'select',
            //     <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
            //         {createSelect(item.defaultValue, item.optionsForSelect)}
            //     </Form.Item>,
            // ],
            // [
            //     'date',
            //     <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
            //         {createDate(item.defaultValue, item.dateFormat)}
            //     </Form.Item>,
            // ],
            [
                'button',
                <Form.Item {...tailLayout} key={index}>
                    {createButton(item.defaultValue, item.htmlType)}
                </Form.Item>,
            ],
            // [
            //     'checkbox',
            //     <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
            //         {createCheckBox(item.onChange, item.checkBoxText, item.defaultChecked)}
            //     </Form.Item>,
            // ],
            // ['divider', <Divider key={index} />],
        ]);
        return formElements.get(item.type);
    });

    return (
        <div>
            <Form {...layout} onFinish={formik.handleSubmit}>
                {items}
            </Form>
        </div>
    );
};

export default CustomForm;
