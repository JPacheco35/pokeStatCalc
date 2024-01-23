import {Grid, Group, Image, NumberInput, rem, Stack} from "@mantine/core";
import {SpeciesForm} from "./SpeciesForm/speciesform.tsx";

// Import PokeAPI Pokedex
import PokeAPI from "pokeapi-typescript";

// const value = PokeAPI.Pokemon.list(10,33);
const value = await PokeAPI.Pokemon.fetch("pikachu");
console.log(value);

const sprite = value["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default;
console.log(sprite);


// Part of Form with Species and Level
export function PokeLevelForm()
{
    return(
        <Group>
            <Stack
                h={'auto'}
                w={'auto'}
                bg="var(--mantine-color-body)"
                align="center"
                gap={"xl"}
            >
                <Image
                    src={sprite}
                    h={rem(120)}
                    w={rem(130)}
                    fit="contain"
                />

                <Grid grow justify={"center"}>
                    <Grid.Col span={4}>
                        <SpeciesForm
                            data={['Abra','Ditto','Seel','Voltorb']}
                            // data={['Archen','Drifloon','Seviper','Tinkatuff']}
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <NumberInput
                            size="xs"
                            radius="md"
                            label="Level:"
                            placeholder="Level"
                            clampBehavior="strict"
                            min={1}
                            max={100}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Group>
    );
}