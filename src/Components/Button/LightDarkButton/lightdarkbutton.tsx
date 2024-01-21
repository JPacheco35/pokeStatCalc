import {useMantineColorScheme, useComputedColorScheme, ActionIcon} from "@mantine/core"
import { IconSun, IconMoon } from '@tabler/icons-react';

import cx from 'clsx';
import classes from "./lightdarkbutton.module.css"

export function LightDarkButton()
{
    // This Function is a wrapper for the built-in function for Setting/Clearing the Current Color Scheme
    const { setColorScheme } = useMantineColorScheme();

    // This Function Grabs the current Color Theme (Light/Dark)
    const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

    return(
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
        >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
    );
}