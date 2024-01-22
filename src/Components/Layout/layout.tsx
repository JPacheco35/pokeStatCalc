import {AppShell, Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {NavBarHeader} from "../Header/NavBarHeader/navbarheader.tsx";

// const iconStyle = { width: rem(12), height: rem(12) };

export function Layout() {
    const [opened, {}] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
            padding="md"
            // layout={"alt"}
        >

            {/*Top Header Section*/}
            <NavBarHeader/>


            Left Side NavBar Section
            <AppShell.Navbar>
                    <Button> Gen 1 Stat Calculator </Button>
                    <Button> Gen 2 Stat Calculator </Button>
            </AppShell.Navbar>


            {/*Center Main Content Section*/}
            <AppShell.Main>
                Main

            </AppShell.Main>

            {/*Bottom Page Footer Section*/}
            <AppShell.Footer>
                Footer
                {/*const handleClick = (color) => { setColor(color); };*/}

                {/*const swatches = Object.keys(theme.colors).map((color) => (*/}
                {/*<ColorSwatch key={color} component={UnstyledButton} color={theme.colors[color][5]} onClick={() => handleClick(color)}>*/}
                {/*    {(theme.primaryColor === color) && <CheckIcon width={10} />}*/}
                {/*</ColorSwatch>*/}
            </AppShell.Footer>

        </AppShell>
    );
}