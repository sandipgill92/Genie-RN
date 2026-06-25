/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import SignUp from '../src/screens/SignUp/SignUp';

test('shows validation error when signup fields are empty', () => {
  const navigation = { navigate: jest.fn() };
  let testRenderer;

  ReactTestRenderer.act(() => {
    testRenderer = ReactTestRenderer.create(
      <SignUp navigation={navigation} />
    );
  });

  const root = testRenderer.root;
  const registerButton = root.findByProps({ testID: 'register-button' });

  ReactTestRenderer.act(() => {
    registerButton.props.onPress();
  });

  const errorText = root.findByProps({ testID: 'error-text' });
  expect(errorText.props.children).toBe(
    'Please enter both email/mobile and password.'
  );
  expect(navigation.navigate).not.toHaveBeenCalled();
});
