import {AppShell} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {NavBarHeader} from "../Header/NavBarHeader/navbarheader.tsx";
import Navbar from "../NavBar/navbar.tsx";
import Router from "../RoutePaths/routepaths.tsx";

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
            <Navbar/>


            {/*Center Main Content Section*/}
            <AppShell.Main>
                <Router></Router>
            </AppShell.Main>

            {/*Bottom Page Footer Section*/}
            <AppShell.Footer>
                Footer
            </AppShell.Footer>

        </AppShell>
    );
}