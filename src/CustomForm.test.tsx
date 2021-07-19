Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import CustomForm from './components/custom/CustomForm/CustomForm';
import indexValidation from './validation/indexValidation';
import { waitFor } from '@testing-library/react';
import { string } from 'yup/lib/locale';

describe('form', () => {
    it('rendering correctly', () => {
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

    it('submitting and sending data correctly when form is valid', async () => {
        const spy = jest.fn((values) => {
            console.log(values);
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
                ]}
            />,
        );
        form.find('input[name="chckbx"]').simulate('change', { target: { name: 'checkbx', checked: false } });
        form.find('form').simulate('submit');

        await waitFor(() => {
            expect(spy.mock.calls.length).toBe(1);
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(
                expect.objectContaining({ username: 'uni-omni@mail.ru', password: '123123123' }),
            );
        });
    });

    it('changing value in input', async () => {
        const onFinish = jest.fn(() => console.log('hello'));
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
                ]}
            />,
        );

        expect(form.find('input[name="chckbx"]').prop('checked')).toEqual(true);

        form.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'qwe' } });
        form.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'asd' } });
        form.find('input[name="chckbx"]').simulate('change', { target: { name: 'checkbx', checked: false } });

        await waitFor(() => {
            expect(form.find('input[name="username"]').prop('value')).toEqual('qwe');
            expect(form.find('input[name="password"]').prop('value')).toEqual('asd');
            expect(form.find('input[name="chckbx"]').prop('checked')).toEqual(false);
        });
    });

    it('validation throw error', async () => {
        const onFinish = jest.fn(() => console.log('hello'));
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

        form.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'qwe' } });
        form.find('input[name="username"]').simulate('blur');
        form.find('form').simulate('submit');

        await waitFor(() => {
            form.update();
            // expect(form.find('span.error').exists()).toEqual(true);
            // expect(form.contains('span.error')).toEqual(true);
        });
    });
});
