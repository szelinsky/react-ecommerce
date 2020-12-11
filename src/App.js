import { Main } from './pages/Main'
import { theme } from './theme'
import { ThemeProvider } from '@material-ui/core/styles';

export function App() {
  return (
    <ThemeProvider theme={theme}><Main /></ThemeProvider>
  );
}


