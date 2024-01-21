import './App.css'

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Layout } from "./Components/Layout/layout.tsx"


// Theme Styles for Everything in the App
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'indigo',
});

function App()
{
    return (
    <MantineProvider theme={theme} defaultColorScheme={"dark"}>
        <Layout></Layout>
    </MantineProvider>
  )
}
export default App
