import {Flex, Grid, Group, Image, NativeSelect, NumberInput, Stack, Button, Table, Center} from "@mantine/core";
import {useEffect, useState} from "react";
import PokeAPI from "pokeapi-typescript";

// import gen1 stats and names
import gen1Names from "./gen1Names.json";
import {hpStat,attackStat,defenceStat,speedStat,specialStat} from "./gen1Stats.json";

// default on load is lvl 5 bulbasaur
const value = await PokeAPI.Pokemon.fetch("bulbasaur");
//@ts-expect-error Code Breaks Otherwise
const initialSprite = value["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default

// hidden power types
const HPTypes = [
    'Fighting',
    'Flying',
    'Poison',
    'Ground',
    'Rock',
    'Bug',
    'Ghost',
    'Steel',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Psychic',
    'Ice',
    'Dragon',
    'Dark'
]

type Stats = {
    HP: number|string;
    ATK: number|string;
    DEF: number|string;
    SPD: number|string;
    SPC: number|string;
};

type hiddenPower = {
    type:string;
    power:string|number;
};


// entire gen1 stat calc form
export function Gen1StatForm()
{
    // current pokemon selected
    const [value, setValue] = useState('Bulbasaur');

    // animated sprite for current pokemon
    const [sprite, setSprite] = useState(initialSprite);

    // user entered pokemon level [1-100]
    const [level, setLevel] = useState<number>(5);

    // base stats of pokemon species selected
    const [baseStats,setBaseStats] = useState<number[]>([45,49,49,45,65])

    // user entered pokemon IVs
    const [IV, setIV] = useState<Stats>({HP:0, ATK:0, DEF:0, SPD:0, SPC:0});

    // user entered pokemon EVs
    const [EV, setEV] = useState<Stats>({HP:0, ATK:0, DEF:0, SPD:0, SPC:0});

    // final calculated pokemon stats
    const [finalStats, setfinalStats] = useState<Stats>({HP:'-', ATK:'-', DEF:'-', SPD:'-', SPC:'-'});

    // calculated hidden power typing and base power
    const [hiddenPower, sethiddenPower] = useState<hiddenPower>({type:'', power:''});


    // when user changes IV value, reset value to 0 if input is blank
    useEffect(() => {
        if(IV.HP == '') {IV.HP = 0}
        if(IV.ATK == '') {IV.ATK = 0}
        if(IV.DEF == '') {IV.DEF = 0}
        if(IV.SPD == '') {IV.SPD = 0}
        if(IV.SPC == '') {IV.SPC = 0}
        // console.log(IV.HP+","+IV.ATK+","+IV.DEF+","+IV.SPD+","+IV.SPC);
    }, [IV]);


    // when user changes EV value, reset value to 0 if input is blank
    useEffect(() => {
        if(EV.HP == '') {EV.HP = 0}
        if(EV.ATK == '') {EV.ATK = 0}
        if(EV.DEF == '') {EV.DEF = 0}
        if(EV.SPD == '') {EV.SPD = 0}
        if(EV.SPC == '') {EV.SPC = 0}
        // console.log(EV.HP+","+EV.ATK+","+EV.DEF+","+EV.SPD+","+EV.SPC);
    }, [EV]);


    // DEBUG: log current form values
    useEffect(() => {
        // console.log("level="+level);
    }, [level]);

    useEffect(() => {
        console.log("baseStats="+baseStats);
    }, [baseStats]);

    useEffect(() => {
        // console.log("value="+value);
    }, [value]);
    // DEBUG END


    // When the Sprite Value is updated
    useEffect(() => {
        // console.log("sprite="+sprite);

        // grab PokeAPI baseStats and new Sprite, and update those respective values
        PokeAPI.Pokemon.fetch(value.toLowerCase()).then(pokemon => {
            setBaseStats([hpStat[pokemon.id-1],attackStat[pokemon.id-1],defenceStat[pokemon.id-1],speedStat[pokemon.id-1],specialStat[pokemon.id-1]])

            // @ts-expect-error Breaks Otherwise
            setSprite(pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default);
        });
    }, [sprite]);


    // Update pokemon species value on value change
    const onValueChange = ({e}: { e: string }) => {
        setValue(e)
    };


    // Update species value, sprite when option is selected, reset finalStats and hiddenPower values
    const onSpeciesChange = ({e}: { e: string }) => {
        setValue(e)
        setSprite(e)
        setfinalStats({HP:'-',ATK:'-',DEF:'-',SPD:'-',SPC:'-'})
        sethiddenPower({type:'-',power:'-'})
    };


    // Runs when the user clicks the 'Calculate Stats' Button,
    // Performs Stat and Hidden Power Calculation
    const handleSubmit = () => {

        const finalStats = [0, 0, 0, 0, 0];
        const inputIV = [IV.HP,IV.ATK,IV.DEF,IV.SPD,IV.SPC]
        const inputEV = [EV.HP,EV.ATK,EV.DEF,EV.SPD,EV.SPC]

        // Calculate each of the final stats using Gen I and II formula
        // See https://bulbapedia.bulbagarden.net/wiki/Stat for equation
        for (let i = 0; i <= 4; i++)
        {
            finalStats[i] = ((baseStats[i] + (inputIV[i] as number))*2)
            finalStats[i] += Math.floor(Math.sqrt((inputEV[i] as number))/4)
            finalStats[i] *= level
            finalStats[i] /= 100
            finalStats[i] = Math.floor(finalStats[i])


            // Special Case: HP Stat Only
            if(i == 0) { finalStats[i] += (level+10) }

            // Case: Non-HP Stat
            else { finalStats[i] += 5; }
        }

        // Calculate hidden power typing using Gen I and II formula
        // See https://bulbapedia.bulbagarden.net/wiki/Hidden_Power_(move)/Calculation for full equation
        let hiddenPowerType = ((inputIV[1] as number) & 3)
        hiddenPowerType *= 4
        hiddenPowerType += (inputIV[2] as number)%4
        // console.log(type)
        // console.log("HP Type = "+HPTypes[type])

        // get Most Significant Bit of each of the Non-HP Stat
        const MSB = [0, 0, 0, 0];
        for (let i= 1; i<=4; i++) { MSB[i-1] = ((inputIV[i] as number)<8) ? 0:1 }

        // Calculate hidden power Base Power using Gen I and II formula
        // See https://bulbapedia.bulbagarden.net/wiki/Hidden_Power_(move)/Calculation for full equation
        let hiddenPowerPower = 0;
        hiddenPowerPower += (4 * (MSB[1]))
        hiddenPowerPower += (2 * (MSB[2]))
        hiddenPowerPower += (MSB[3])
        hiddenPowerPower += (8 * (MSB[0]))
        hiddenPowerPower *= 5
        hiddenPowerPower += (MSB[3])
        hiddenPowerPower /= 2
        hiddenPowerPower += 31
        hiddenPowerPower = Math.floor(hiddenPowerPower)
        // console.log("HP Power = " + power)

        // Update the Final Stats and Hidden Power values
        sethiddenPower({type:HPTypes[hiddenPowerType],power:hiddenPowerPower})
        setfinalStats({HP:finalStats[0],ATK:finalStats[1],DEF:finalStats[2],SPD:finalStats[3],SPC:finalStats[4]})
    };

    // React Component
    return(
        <Stack justify="center">
            <Group justify={"center"}>
                <Stack
                    h={'auto'}
                    w={'auto'}
                    bg="var(--mantine-color-body)"
                    align="center"
                    gap={"xl"}
                >
                    {/*Current Pokemon Animated Sprite*/}
                    <Image
                        src={sprite}
                        h={'auto'}
                        w={'auto'}
                        fit="cover"
                    />

                    <Grid grow justify={"center"}>
                        <Grid.Col span={6}>
                            {/*Species List Selector*/}
                            <NativeSelect
                                radius="md"
                                label="Species"
                                data={gen1Names.names}
                                defaultValue="Bulbasaur"
                                value={value}
                                onChange={event => {
                                    onValueChange({e: event.currentTarget.value})
                                    onSpeciesChange({e: event.currentTarget.value})
                                }}
                            />
                        </Grid.Col>

                        <Grid.Col span={2}>
                            {/*Level Selector*/}
                            <NumberInput
                                value={level}
                                // @ts-expect-error Breaks otherwise
                                onChange={setLevel}
                                size="xs"
                                radius="md"
                                label="Level:"
                                placeholder="Level"
                                clampBehavior="strict"
                                min={1}
                                max={100}
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                            />
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Group>

            <Grid grow>
                <Grid.Col span={2}>
                    {/*IVs Row Title*/}
                    <Flex
                        mih={50}
                        gap="xs"
                        justify="flex-end"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        IVs (0-15)
                    </Flex>
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*HP IV Input*/}
                    <NumberInput
                        value={IV.HP}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setIV({  ...IV,HP: e});
                        }}
                        size="xs"
                        radius="md"
                        label="HP"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={15}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*ATK IV Input*/}
                    <NumberInput
                        value={IV.ATK}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setIV({  ...IV,ATK: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Attack"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={15}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*DEF IV Input*/}
                    <NumberInput
                        value={IV.DEF}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setIV({  ...IV,DEF: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Defence"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={15}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*SPD IV Input*/}
                    <NumberInput
                        value={IV.SPD}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setIV({  ...IV,SPD: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Speed"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={15}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*SPC IV Input*/}
                    <NumberInput
                        value={IV.SPC}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setIV({  ...IV,SPC: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Special:"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={15}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>
            </Grid>

            <Grid grow>
                <Grid.Col span={2}>
                    {/*EVs Row Title*/}
                    <Flex
                        mih={50}
                        // bg="rgba(0, 0, 0, .3)"
                        gap="xs"
                        justify="flex-end"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        EVs (0-65535)
                    </Flex>
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*HP IV Input*/}
                    <NumberInput
                        value={EV.HP}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setEV({  ...EV,HP: e});
                        }}
                        size="xs"
                        radius="md"
                        label="HP"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={65535}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*ATK IV Input*/}
                    <NumberInput
                        value={EV.ATK}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setEV({  ...EV,ATK: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Attack"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={65535}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*DEF IV Input*/}
                    <NumberInput
                        value={EV.DEF}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setEV({  ...EV,DEF: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Defence"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={65535}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*SPD IV Input*/}
                    <NumberInput
                        value={EV.SPD}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setEV({  ...EV,SPD: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Speed"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={65535}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    {/*SPC IV Input*/}
                    <NumberInput
                        defaultValue={0}
                        value={EV.SPC}
                        onChange={e => {
                            if(e==''||0){e=0;}
                            setEV({  ...EV,SPC: e});
                        }}
                        size="xs"
                        radius="md"
                        label="Special:"
                        placeholder=""
                        clampBehavior="strict"
                        min={0}
                        max={65535}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>
            </Grid>

            <Grid grow>
                <Grid.Col span={4}>
                    {/*Calculate Stats Button*/}
                    <Button
                        variant="outline"
                        size={"sm"}
                        onClick={handleSubmit}
                    >
                        Calculate Stats
                    </Button>
                </Grid.Col>
            </Grid>

            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        {/*Level % [Pokemon] Title*/}
                        <Table.Th><Center>Level {level} {value} Stats </Center></Table.Th>
                    </Table.Tr>
                </Table.Thead>
            </Table>

            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th><Center>HP</Center></Table.Th>
                        <Table.Th><Center>Attack</Center></Table.Th>
                        <Table.Th><Center>Defence</Center></Table.Th>
                        <Table.Th><Center>Speed</Center></Table.Th>
                        <Table.Th><Center>Special</Center></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {/*Final Stats Display*/}
                    <Table.Tr>
                        <Table.Td>{finalStats.HP}</Table.Td>
                        <Table.Td>{finalStats.ATK}</Table.Td>
                        <Table.Td>{finalStats.DEF}</Table.Td>
                        <Table.Td>{finalStats.SPD}</Table.Td>
                        <Table.Td>{finalStats.SPC}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Table highlightOnHover withRowBorders={false}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th><Center>Hidden Power</Center></Table.Th>
                    </Table.Tr>
                    {/*Hidden Power Display*/}
                    <Table.Tr>
                        <Table.Th>
                            <Center>
                                <Table.Td>Type: {hiddenPower.type}</Table.Td>
                                <Table.Td>Power: {hiddenPower.power}</Table.Td>
                            </Center>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
            </Table>

        </Stack>

    );
}