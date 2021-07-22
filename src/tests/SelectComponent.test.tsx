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

//with React-Testing-Library

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import i18n from './i18nForTests';
import { I18nextProvider } from 'react-i18next';
import SelectComponent from '../components/base/Select/SelectComponent';

describe('Select Component', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        expect(screen).toMatchSnapshot();
    });

    it('show span at first and doesn`t show input', () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        expect(screen.getByTestId('span-with-select')).toBeInTheDocument();
        expect(screen.getByTestId('select-test')).toHaveClass('selectHide');
    });

    it('hide span and show input after click on span', () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        expect(screen.getByTestId('span-with-select')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('span-with-select'));
        expect(screen.getByTestId('select-test')).toHaveClass('selectShow');
        expect(screen.getByTestId('select-test')).not.toHaveClass('selectHide');
        expect(screen.getByTestId('span-with-select')).toHaveClass('textHide');
    });

    it('hide input and show span when input unfocused', () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        expect(screen.getByTestId('span-with-select')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('span-with-select'));
        expect(screen.getByTestId('select-test')).toHaveClass('selectShow');
        expect(screen.getByTestId('select-test')).not.toHaveClass('selectHide');
        expect(screen.getByTestId('span-with-select')).toHaveClass('textHide');
        userEvent.click(document.body);
        expect(screen.getByTestId('select-test')).not.toHaveClass('selectShow');
        expect(screen.getByTestId('select-test')).toHaveClass('selectHide');
        expect(screen.getByTestId('span-with-select')).not.toHaveClass('selectHide');
    });

    it('have options elements', () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1sel"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        userEvent.click(screen.getByTestId('span-with-select'));
        expect(screen.getByTestId('select-test').children.length).toEqual(3);
    });

    it('onChange function works', async () => {
        const spy = jest.fn();
        render(
            <I18nextProvider i18n={i18n}>
                <SelectComponent
                    type="select"
                    label="select for test"
                    value="1sel"
                    options={['1', '2', '3']}
                    labelForOptions={['1sel', '2sel', '3sel']}
                    onChange={spy}
                />
            </I18nextProvider>,
        );
        userEvent.click(screen.getByTestId('span-with-select'));
        fireEvent.change(screen.getByTestId('select-test'), { target: { value: '1' } });
        expect(spy.mock.calls.length).toBeGreaterThan(0);
    });
});
