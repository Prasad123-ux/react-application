import { ChakraProvider, ColorModeScript,theme } from '@chakra-ui/react';
import React, { StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
// import { ColorModeSwitcher, } from './ColorModeSwitcher';
// import {theme} from './Navbar.js/theme'
//  import  {theme} from './theme.js'
//  import theme from './Componants/theme.js'
//  import Navbar from './Componants/Navbar.js'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme} >
    {/* <ColorModeSwitcher> */}
    <App />
    {/* <Navbar/> */}
    {/* </ColorModeSwitcher> */}
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
