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
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import DateComponent from '../components/base/DateComponent/DateComponent';
import { debug } from 'console';
import moment from 'moment';

describe('Date Component', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn();
        render(<DateComponent value="1987-05-07" onChange={spy} label="Date:" />);
        expect(screen).toMatchSnapshot();
    });

    it('show span at first and doesn`t show date input', () => {
        const spy = jest.fn();
        render(<DateComponent value="1987-05-07" onChange={spy} label="Date:" />);
        expect(screen.getByText('1987-05-07')).toBeInTheDocument();
        expect(document.querySelector('.datePicker')).toHaveClass('inputHide');
    });

    it('show span and date input', () => {
        const spy = jest.fn();
        render(<DateComponent value="1987-05-07" onChange={spy} label="Date:" />);
        expect(screen.getByText('1987-05-07')).toBeInTheDocument();
        userEvent.click(screen.getByText('1987-05-07'));
        expect(document.querySelector('.datePicker')).toHaveClass('inputShow');
        expect(document.querySelector('.datePicker')).not.toHaveClass('inputHide');
    });

    it('Dropdown panel showing', () => {
        const spy = jest.fn();
        render(<DateComponent value="1987-05-07" onChange={spy} label="Date:" />);
        expect(document.querySelector('.ant-picker-dropdown')).not.toBeInTheDocument();
        userEvent.click(screen.getByText('1987-05-07'));
        userEvent.click(screen.getByTestId('datepicker'));
        expect(document.querySelector('.ant-picker-dropdown')).toBeInTheDocument();
    });

    it('onChange function works', () => {
        const spy = jest.fn(() => console.log('!!!'));
        render(<DateComponent value="1987-05-07" onChange={spy} label="Date:" />);
        userEvent.click(screen.getByText('1987-05-07'));
        fireEvent.mouseDown(screen.getByTestId('datepicker'));
        fireEvent.change(screen.getByTestId('datepicker'), { target: { value: moment('1988-06-08') } });
        fireEvent.click(document.querySelector('.ant-picker-cell-selected'));
        expect(spy.mock.calls.length).toBeGreaterThan(0);
    });
});
