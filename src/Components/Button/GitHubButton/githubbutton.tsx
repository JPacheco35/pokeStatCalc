import { ActionIcon, Tooltip } from "@mantine/core"
import { IconBrandGithub } from '@tabler/icons-react';

export function GitHubButton()
{
    return(
        // when icon is clicked, redirect to Github repo
        <ActionIcon
            onClick={() => window.location.replace('https://github.com/JPacheco35/pokeStatCalc')}
            variant="default"
            radius={'md'}
            size="xl"
            aria-label="Github-Repo-Link"
        >
            {/*on icon hover: tooltip saying source code*/}
            <Tooltip label="Source Code" offset={15}>
                <IconBrandGithub  stroke={1.5} />
            </Tooltip>

        </ActionIcon>
    );
}