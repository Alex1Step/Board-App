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
import InputComponent from '../components/base/Input/InputComponent';

describe('Date Component', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn();
        render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
        expect(screen).toMatchSnapshot();
    });

    it('Rendering with props "withoutSubstitution" correctly', () => {
        const spy = jest.fn();
        render(<InputComponent withoutSubstitution={true} type="text" label="textinput" value="" onChange={spy} />);
        expect(document.querySelector('input')).toBeInTheDocument();
        expect(screen.queryByTestId('span-with-input')).not.toBeInTheDocument();
    });

    it('Rendering with wrong prop "type" correctly (by default type="text")', () => {
        const spy = jest.fn();
        render(<InputComponent type="wrongtype" label="textinput" value="" onChange={spy} />);
        expect(screen.getByTestId('input-test').getAttribute('type')).toBe('text');
    });

    it('show span at first and doesn`t show input', () => {
        const spy = jest.fn();
        render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
        expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
        expect(screen.getByTestId('input-test')).toHaveClass('inputHide');
    });

    it('hide span and show input after click on span', () => {
        const spy = jest.fn();
        render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
        expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('span-with-input'));
        expect(screen.getByTestId('input-test')).toHaveClass('inputShow');
        expect(screen.getByTestId('input-test')).not.toHaveClass('inputHide');
        expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
    });

    it('hide span and show textarea after click on span', () => {
        const spy = jest.fn();
        render(<InputComponent type="textarea" label="area" value="" onChange={spy} />);
        expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('span-with-input'));
        expect(document.querySelector('textarea')).toHaveClass('inputShow');
        expect(document.querySelector('textarea')).not.toHaveClass('inputHide');
        expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
    });

    it('hide input and show span when input unfocused', () => {
        const spy = jest.fn();
        render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
        expect(screen.getByTestId('span-with-input')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('span-with-input'));
        expect(screen.getByTestId('input-test')).toHaveClass('inputShow');
        expect(screen.getByTestId('input-test')).not.toHaveClass('inputHide');
        expect(screen.getByTestId('span-with-input')).toHaveClass('textHide');
        userEvent.click(document.body);
        expect(screen.getByTestId('input-test')).not.toHaveClass('inputShow');
        expect(screen.getByTestId('input-test')).toHaveClass('inputHide');
        expect(screen.getByTestId('span-with-input')).not.toHaveClass('textHide');
    });

    it('onChange function works', async () => {
        const spy = jest.fn();
        render(<InputComponent type="text" label="textinput" value="" onChange={spy} />);
        userEvent.click(screen.getByTestId('span-with-input'));
        userEvent.type(screen.getByTestId('input-test'), 'hello');
        expect(spy.mock.calls.length).toBeGreaterThan(0);
    });
});
