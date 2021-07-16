/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../redux/store/index';

const render = (
  ui,
  {
    initialState,
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={configureStore(initialState)}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
