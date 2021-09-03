import React, { useReducer } from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// 1.
test('renders without errors', ()=>{
    render(<ContactForm/>);
});

// 2.
test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

// 3.
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'M');
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Mostella');
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(firstNameError).toBeInTheDocument();
    })
});

// 4.
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(firstNameError).toBeInTheDocument();
        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).toBeInTheDocument();
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
});

// 5.
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Mostella');
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(firstNameError).not.toBeInTheDocument();
        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).not.toBeInTheDocument();
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
});

// 6.
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Mostella');
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
});

// 7.
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'mason@mason.com');
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).toBeInTheDocument();
    })
});

// 8.
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Mostella');
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'mason@mason.com');
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const submitWorks = screen.queryByText('You Submitted:');
        expect(submitWorks).toBeInTheDocument();
        const firstNameSubmit = screen.queryByTestId('firstnameDisplay');
        expect(firstNameSubmit).toBeInTheDocument();
        const lastNameSubmit = screen.queryByTestId('lastnameDisplay');
        expect(lastNameSubmit).toBeInTheDocument();
        const emailSubmit = screen.queryByTestId('emailDisplay');
        expect(emailSubmit).toBeInTheDocument();
        const msgSubmit = screen.queryByTestId('messageDisplay');
        expect(msgSubmit).not.toBeInTheDocument();
    })
});

// 9.
test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Mason');
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Mostella');
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'mason@mason.com');
    const msgInput = screen.getByLabelText(/message/i);
    userEvent.type(msgInput, 'Test')
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const firstNameSubmit = screen.queryByTestId('firstnameDisplay');
        expect(firstNameSubmit).toBeInTheDocument();
        const lastNameSubmit = screen.queryByTestId('lastnameDisplay');
        expect(lastNameSubmit).toBeInTheDocument();
        const emailSubmit = screen.queryByTestId('emailDisplay');
        expect(emailSubmit).toBeInTheDocument();
        const msgSubmit = screen.queryByTestId('messageDisplay');
        expect(msgSubmit).toBeInTheDocument();
    })
});