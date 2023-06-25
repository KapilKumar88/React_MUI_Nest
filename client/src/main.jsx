import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'; 5
import CssBaseline from '@mui/material/CssBaseline';

import './index.css'
import router from './routes';
import defaultTheme from './theme/default-theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
