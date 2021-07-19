import React from 'react';

import { Form, Input, Button, Select, DatePicker, Divider, Checkbox } from 'antd';

import moment from 'moment';
import { useFormik } from 'formik';
import { IFormConstructor } from './interfaces';

import { INPUT_ELEMENTS, TYPE_OF_TEXTINPUT } from '../../../constants/constants';

import styles from './CustomForm.less';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CustomForm = <T, U>(props: IFormConstructor<T, U>): React.ReactElement => {
    const { submit } = props.formSettings;

    const initialValues = props.itemsSettings.map((item) => [item.name, item.defaultValue || '']);

    const formik = useFormik({
        initialValues: Object.fromEntries(initialValues),
        validationSchema: props.validation,
        onSubmit: (values) => {
            submit(values);
        },
    });

    const createInput = (inputType = 'input', index: number, name: string) => {
        const inputTypes = new Map([
            [
                TYPE_OF_TEXTINPUT.input,
                <Input
                    key={index}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                    defaultValue={formik.values[name]}
                    onBlur={formik.handleBlur}
                />,
            ],
            [
                TYPE_OF_TEXTINPUT.password,
                <Input.Password
                    key={index}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                    defaultValue={formik.values[name]}
                    onBlur={formik.handleBlur}
                />,
            ],
            [
                TYPE_OF_TEXTINPUT.textarea,
                <Input.TextArea
                    key={index}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                    defaultValue={formik.values[name]}
                    onBlur={formik.handleBlur}
                />,
            ],
            [
                TYPE_OF_TEXTINPUT.search,
                <Input.Search
                    key={index}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                    defaultValue={formik.values[name]}
                    onBlur={formik.handleBlur}
                />,
            ],
        ]);
        return (
            <>
                {inputTypes.get(inputType)}
                {formik.errors[name] && <span className={styles.error}>{formik.errors[name]}</span>}
            </>
        );
    };

    const createSelect = (options = [{ value: 'no data', label: 'no data' }], name: string) => (
        <>
            <Select
                defaultValue={formik.values[name]}
                value={formik.values[name]}
                onChange={(value) => formik.setFieldValue(name, value)}
                options={options}
            />
            {formik.errors[name] && <span className={styles.error}>{formik.errors[name]}</span>}
        </>
    );

    const createDate = (name: string, dateFormat = 'YYYY/MM/DD') => (
        <>
            <DatePicker
                name={name}
                defaultValue={moment()}
                onChange={(value) => formik.setFieldValue(name, value)}
                value={formik.values[name]}
                format={dateFormat}
            />
            {formik.errors[name] && <span className={styles.error}>{formik.errors[name]}</span>}
        </>
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

    const createCheckBox = (name: string) => (
        <>
            <Checkbox defaultChecked={formik.values[name]} onChange={formik.handleChange} name={name} />
            {formik.errors[name] && <span className={styles.error}>{formik.errors[name]}</span>}
        </>
    );

    const items = props.itemsSettings.map((item, index) => {
        const formElements = new Map([
            [
                INPUT_ELEMENTS.input,
                <Form.Item key={index} name={item.name} label={item.label}>
                    {createInput(item.inputType, index, item.name)}
                </Form.Item>,
            ],
            [
                INPUT_ELEMENTS.select,
                <Form.Item key={index} name={item.name} label={item.label}>
                    {createSelect(item.optionsForSelect, item.name)}
                </Form.Item>,
            ],
            [
                INPUT_ELEMENTS.date,
                <Form.Item key={index} name={item.name} label={item.label}>
                    {createDate(item.name, item.dateFormat)}
                </Form.Item>,
            ],
            [
                INPUT_ELEMENTS.button,
                <Form.Item {...tailLayout} key={index}>
                    {createButton(item.defaultValue, item.htmlType)}
                </Form.Item>,
            ],
            [
                INPUT_ELEMENTS.checkbox,
                <Form.Item key={index} name={item.name} label={item.label}>
                    {createCheckBox(item.name)}
                </Form.Item>,
            ],
            [INPUT_ELEMENTS.divider, <Divider key={index} />],
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
