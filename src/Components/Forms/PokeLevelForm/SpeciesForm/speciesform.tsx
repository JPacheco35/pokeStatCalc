import {Autocomplete} from "@mantine/core";

interface SpeciesFormProps {
    data: string[]
}

export function SpeciesForm({data}: SpeciesFormProps)
{
    return(
        <Autocomplete
            label="Species"
            placeholder="Species"
            data={data}
        />
    );
}