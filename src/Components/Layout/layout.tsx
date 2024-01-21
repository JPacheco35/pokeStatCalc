import {AppShell, Burger, Group, Image, rem, Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IconHome } from '@tabler/icons-react';
import {LightDarkButton} from "../Button/LightDarkButton/lightdarkbutton.tsx";
// import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

// const gradient =
//     'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

export function Layout() {
    const [opened, { toggle }] = useDisclosure();

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
            <AppShell.Header
            >

                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />


                    <IconHome
                        style={{ width: rem(40), height: rem(40) }}
                        stroke={1.5}
                        color="black"
                    />


                    Header

                    <Image
                        radius={"md"}
                        h={20}
                        w={"auto"}
                        fit="contain"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                    />

                    <LightDarkButton/>

                </Group>

                {/*<div>Logo</div>*/}
            </AppShell.Header>


            {/*Left Side NavBar Section*/}
            <AppShell.Navbar>
                    <Button> Gen 1 Stat Calculator </Button>
                    <Button> Gen 2 Stat Calculator </Button>
            </AppShell.Navbar>


            {/*Center Main Content Section*/}
            <AppShell.Main>
                Main
            </AppShell.Main>


            {/*/!*Right Side Aside Section*!/*/}
            {/*<AppShell.Aside>*/}
            {/*    Aside*/}
            {/*</AppShell.Aside>*/}


            {/*Bottom Page Footer Section*/}
            <AppShell.Footer>
                Footer
            </AppShell.Footer>

        </AppShell>
    );
}