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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import i18n from './i18nForTests';
import { I18nextProvider } from 'react-i18next';
import SelectComponent from '../components/base/Select/SelectComponent';

describe('Date Component', () => {
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

    // it('hide span and show input after click on span', () => {
    //     const spy = jest.fn();
    //     render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
    //     expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
    //     userEvent.click(screen.getByTestId('span-with-input'));
    //     expect(screen.getByTestId('input-test')).toHaveClass('inputShow');
    //     expect(screen.getByTestId('input-test')).not.toHaveClass('inputHide');
    //     expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
    // });

    // it('hide span and show textarea after click on span', () => {
    //     const spy = jest.fn();
    //     render(<InputComponent type="textarea" label="area" value="" onChange={spy} />);
    //     expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
    //     userEvent.click(screen.getByTestId('span-with-input'));
    //     expect(document.querySelector('textarea')).toHaveClass('inputShow');
    //     expect(document.querySelector('textarea')).not.toHaveClass('inputHide');
    //     expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
    // });

    // it('hide input and show span when input unfocused', () => {
    //     const spy = jest.fn();
    //     render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
    //     expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
    //     userEvent.click(screen.getByTestId('span-with-input'));
    //     expect(screen.getByTestId('input-test')).toHaveClass('inputShow');
    //     expect(screen.getByTestId('input-test')).not.toHaveClass('inputHide');
    //     expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
    //     userEvent.click(document.body);
    //     expect(screen.getByTestId('input-test')).not.toHaveClass('inputShow');
    //     expect(screen.getByTestId('input-test')).toHaveClass('inputHide');
    //     expect(screen.getByTestId('span-with-input')).not.toHaveClass('textHide');
    // });

    // it('onChange function works', async () => {
    //     const spy = jest.fn();
    //     render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
    //     userEvent.click(screen.getByTestId('span-with-input'));
    //     userEvent.type(screen.getByTestId('input-test'), 'hello');
    //     expect(spy.mock.calls.length).toBeGreaterThan(0);
    // });
});
