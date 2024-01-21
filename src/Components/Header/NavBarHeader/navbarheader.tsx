// Import Mantine Components
import {AppShell, Burger, Group, Title, Tabs, ThemeIcon} from "@mantine/core";

// Import Tabler Icons
import { IconPokeball } from '@tabler/icons-react';

// Import NavBar Buttons
import {LightDarkButton} from "../../Button/LightDarkButton/lightdarkbutton.tsx";
import {GitHubButton} from "../../Button/GitHubButton/githubbutton.tsx";

// Import Mantine Hooks
import { useDisclosure } from '@mantine/hooks';

// Import CSS
import classes from "./navbarheader.module.css"

export function NavBarHeader()
{
    // const iconStyle = { width: rem(12), height: rem(12) };
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Header>
            <Tabs
                classNames={classes}
                styles={{
                    root: {
                        // backgroundColor: 'white',
                        highlightOnHover:false,
                    },

                    tab: {
                        // color: 'blue',
                        // borderBottomColor:'yellow',
                        // borderBlockColor:'yellow',
                        borderStyle:'none',
                        // border

                    },

                    tabLabel: {
                        // color: 'purple',
                    },

                    list: {
                        // color:"yellow",
                        borderColor: 'var(--_tab-border-color)',
                    }

                }}
            >

                <Tabs.List>
                    <Tabs.Tab value={"tab1"}>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                    </Tabs.Tab>

                    <Tabs.Tab value={"tab3"}>
                        <Title order={1} >
                            Pokemon Stat Calculator
                        </Title>
                    </Tabs.Tab>

                    <Tabs.Tab value={"tab4"}>
                        <ThemeIcon
                            radius="xl"
                            // color="vuvu"
                            variant="outline"
                            size="xl"
                            aria-label="Gradient action icon"
                            gradient={{ from: 'blue', to: 'cyan', deg: 360 }}
                            style={{ width: '50%', height: '50%' }}
                        >

                            <IconPokeball/>
                        </ThemeIcon>
                    </Tabs.Tab>

                    <Tabs.Tab value={"tab5"} ml={"auto"}>
                        <Group>
                            <GitHubButton/>
                            <LightDarkButton/>
                        </Group>
                    </Tabs.Tab>

                </Tabs.List>
            </Tabs>


            {/*<div>Logo</div>*/}
        </AppShell.Header>
    )
}