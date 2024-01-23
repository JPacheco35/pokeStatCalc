import {Grid, Stack} from "@mantine/core";
import {PokeLevelForm} from "../PokeLevelForm/pokelevelform.tsx";

export function Gen1StatForm() {

    return (
        <Stack justify="center">

            <PokeLevelForm/>

            <Grid grow>
                <Grid.Col span={12/5}>HP</Grid.Col>
                <Grid.Col span={12/5}>ATK</Grid.Col>
                <Grid.Col span={12/5}>DEF</Grid.Col>
                <Grid.Col span={12/5}>SPC</Grid.Col>
                <Grid.Col span={12/5}>SPD</Grid.Col>
            </Grid>

            <Grid grow>
                <Grid.Col span={12/5}>HP</Grid.Col>
                <Grid.Col span={12/5}>ATK</Grid.Col>
                <Grid.Col span={12/5}>DEF</Grid.Col>
                <Grid.Col span={12/5}>SPC</Grid.Col>
                <Grid.Col span={12/5}>SPD</Grid.Col>
            </Grid>

        </Stack>
    );
}