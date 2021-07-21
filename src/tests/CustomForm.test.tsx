Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

//with ENZYME

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import CustomForm from '../components/custom/CustomForm/CustomForm';
import indexValidation from '../validation/indexValidation';
import { waitFor } from '@testing-library/react';
import moment from 'moment';

describe('Form', () => {
    it('Form rendering correctly', () => {
        const onFinish = jest.fn();
        const rend = renderer
            .create(
                <CustomForm
                    validation={indexValidation.authSchema}
                    formSettings={{ submit: onFinish }}
                    itemsSettings={[
                        {
                            type: 'input',
                            label: 'mail',
                            name: 'username',
                            inputType: 'input',
                        },
                        {
                            type: 'input',
                            label: 'password',
                            name: 'password',
                            inputType: 'password',
                        },
                        {
                            type: 'button',
                            label: 'signin',
                            name: 'signin',
                            defaultValue: 'signIn',
                            htmlType: 'submit',
                        },
                    ]}
                />,
            )
            .toJSON();
        expect(rend).toMatchSnapshot();
    });

    it('Submitting and sending data correctly when form is valid', async () => {
        const spy = jest.fn((values) => {
            values;
        });
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: spy }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'uni-omni@mail.ru',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                        defaultValue: '123123123',
                    },
                    {
                        type: 'button',
                        label: 'signin',
                        name: 'signin',
                        defaultValue: 'signIn',
                        htmlType: 'submit',
                    },
                    {
                        type: 'checkbox',
                        label: 'remember',
                        name: 'chckbx',
                        defaultValue: 'true',
                    },
                    {
                        type: 'select',
                        label: 'select',
                        name: 'select',
                        defaultValue: '3',
                        optionsForSelect: [
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                        ],
                    },
                ]}
            />,
        );

        form.find('form').simulate('submit');

        await waitFor(() => {
            expect(spy.mock.calls.length).toBe(1);
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(
                expect.objectContaining({
                    username: 'uni-omni@mail.ru',
                    password: '123123123',
                    chckbx: 'true',
                    select: '3',
                }),
            );
        });
    });

    it('Changing value in input works', async () => {
        const onFinish = jest.fn();
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'first',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                        defaultValue: 'second',
                    },
                    {
                        type: 'button',
                        label: 'signin',
                        name: 'signin',
                        defaultValue: 'signIn',
                        htmlType: 'submit',
                    },
                    {
                        type: 'checkbox',
                        label: 'remember',
                        name: 'chckbx',
                        defaultValue: 'nope',
                    },
                    {
                        type: 'select',
                        label: 'select',
                        name: 'select',
                        optionsForSelect: [
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                        ],
                    },
                ]}
            />,
        );
        expect(form.find('input[name="username"]').prop('value')).toEqual('first');
        expect(form.find('input[name="password"]').prop('value')).toEqual('second');
        expect(form.find('input[name="chckbx"]').prop('checked')).toEqual(true);
        expect(form.find('input[role="combobox"]').prop('value')).toEqual('');

        form.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'qwe' } });
        form.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'asd' } });
        form.find('input[name="chckbx"]').simulate('change', { target: { name: 'checkbx', checked: false } });
        form.find('.ant-select-selector').simulate('mousedown');
        await waitFor(() => {
            form.update();
            expect(form.find('.ant-select-item')).toHaveLength(3);
        });
        form.find('.ant-select-item').first().simulate('click');

        await waitFor(() => {
            form.update();
            expect(form.find('input[name="username"]').prop('value')).toEqual('qwe');
            expect(form.find('input[name="password"]').prop('value')).toEqual('asd');
            expect(form.find('input[name="chckbx"]').prop('checked')).toEqual(false);
            expect(form.find('.ant-select-selection-item').text()).toEqual('1');
        });
    });

    it('Change value in datepicker works', async () => {
        const onFinish = jest.fn();
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'date',
                        label: 'date',
                        name: 'date',
                        dateFormat: 'YYYY/MM/DD',
                    },
                ]}
            />,
        );

        expect(form.find('input[name="date"]').prop('value')).toEqual('');

        form.find('input[name="date"]').simulate('mousedown');
        form.find('input[name="date"]').simulate('change', { target: { value: moment('1987-05-07') } });
        form.find('.ant-picker-cell-selected').simulate('click');

        await waitFor(() => {
            form.update();
            expect(form.find('input[name="date"]').prop('value')).toEqual('1987/05/07');
        });
    });

    it('Validation throw error and form doesn`t submitting', async () => {
        const onFinish = jest.fn();
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'first',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                        defaultValue: 'second',
                    },
                    {
                        type: 'button',
                        label: 'signin',
                        name: 'signin',
                        defaultValue: 'signIn',
                        htmlType: 'submit',
                    },
                ]}
            />,
        );

        expect(form.exists('.error')).toEqual(false);

        await waitFor(() =>
            form.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'qwe' } }),
        );

        await waitFor(() => form.find('input[name="username"]').simulate('blur'));

        await waitFor(() => {
            form.update();
        });

        await waitFor(() => {
            expect(form.find('span.error').at(0).exists()).toEqual(true);
            expect(onFinish.mock.calls.length).toBe(0);
        });
    });

    it('Reset button works correctly', async () => {
        const onFinish = jest.fn();
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'first',
                    },
                    {
                        type: 'button',
                        label: 'reset',
                        name: 'reset',
                        defaultValue: 'reset',
                        htmlType: 'reset',
                    },
                ]}
            />,
        );

        expect(form.find('input[name="username"]').prop('value')).toEqual('first');

        await waitFor(() => form.find('button').simulate('click'));

        await waitFor(() => {
            form.update();
            expect(form.find('input[name="username"]').prop('value')).toEqual('');
        });
    });
});
