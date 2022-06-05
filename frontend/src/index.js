import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* In order to have chakra working we have to wrap app inide chakra provider tags */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

