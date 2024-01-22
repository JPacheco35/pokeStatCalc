import {useMantineColorScheme, useComputedColorScheme, ActionIcon, Tooltip} from "@mantine/core"
import { IconBrush } from '@tabler/icons-react';
import {getThemeColor} from "@mantine/core";

import cx from 'clsx';
import classes from "./colorbutton.module.css"
import {useEffect} from "react";

export function ColorButton()
{
    // This Function is a wrapper for the built-in function for Setting/Clearing the Current Color Scheme
    // const { setColorScheme } = useMantineColorScheme();

    // This Function Grabs the current Color Theme (Light/Dark)
    // const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

    return(

        <ActionIcon
            // onClick={()}
            variant="default"
            size="xl"
            radius="md"
            aria-label="Toggle color scheme"
        >
            <Tooltip label="Dark Mode" offset={15}>
                <IconBrush className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </Tooltip>
        </ActionIcon>
    );
}