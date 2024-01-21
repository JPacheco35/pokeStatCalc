import './App.css'

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Layout } from "./Components/Layout/layout.tsx"


// Theme Styles for Everything in the App
const theme = createTheme({
    // fontFamily: 'Open Sans, sans-serif',
    fontFamily: 'Grey-cliffCF, sans-serif',
    primaryColor: 'indigo',
    colors: {
        'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
        'vuvu': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
    },
    focusRing: 'never',
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
