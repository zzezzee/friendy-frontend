import { Route, Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';

export default function App() {
  return ((
    <div>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  ));
}
