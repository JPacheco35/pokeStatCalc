import {Autocomplete, Grid, Group, Image, NumberInput, rem, Stack} from "@mantine/core";
import gen1Names from "./gen1Names.json";

// Import PokeAPI Pokedex
import PokeAPI from "pokeapi-typescript";
import {useEffect, useState} from "react";

// const value = PokeAPI.Pokemon.list(10,33);
const value = await PokeAPI.Pokemon.fetch("bulbasaur");
const initialSprite = value["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default


// Part of Form with Species and Level
export function PokeLevelForm()
{
    const [value, setValue] = useState('');
    const [species, setSpecies] = useState('');
    const [sprite, setSprite] = useState(initialSprite);

    useEffect(() => {
        console.log("value="+value);
    }, [value]);

    useEffect(() => {
        console.log("species="+species);
    }, [species]);

    useEffect(() => {
        console.log("value1="+value);
        console.log("species1="+species);
        console.log("sprite="+sprite);

        // const pokemon = PokeAPI.Pokemon.resolve(species)

        PokeAPI.Pokemon.fetch(species).then(pokemon => {
            console.log(pokemon['sprites']);
            console.log(pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default);
            setSprite(pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default);

        });

        // console.log(newPokemon);
        // setSprite(newPokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default)

        // const newPokemon = PokeAPI.Pokemon.fetch(species.toLowerCase());
        // console.log(newPokemon);
        //
        // setSprite(newPokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default)
        // console.log(sprite)
    }, [sprite]);


    const onValueChange = (e) => {
        var temp = e
        setValue(temp)
        console.log(e)
        // console.log("value="+value)
    };
    const onSpeciesChange = (e) => {
        // console.log(e)
        var temp = e
        setValue(temp)
        setSpecies(temp.toLowerCase())
        setSprite()
        console.log(e)
    };

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
                        <Autocomplete
                            withScrollArea={true}
                            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                            label="Species"
                            defaultValue="Bulbasaur"
                            placeholder="Species"
                            data={gen1Names.names}
                            value={value}
                            // onChange={onValueChange}
                            onChange={e => {
                                onValueChange(e);
                            }}
                            onOptionSubmit={e => {
                                onSpeciesChange(e);
                            }}
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