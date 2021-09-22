import './App.css';
import { Routes } from './Routes';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
function App() {
  return (
  <ThemeProvider theme={theme}>
      <Routes/>

  </ThemeProvider>
  );
}

export default App;
