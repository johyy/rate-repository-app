import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../../components/SignIn';
import React from 'react';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn();
        render(<SignIn onSubmit={onSubmit} />);
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'username');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign in'));

        expect(onSubmit).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
            username: 'username',
            password: 'password'
        })
      });
    });
  });
});