import {
    AppShell,
    Box,
    NavLink
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";

// Data to fill each navbar link with
const data = [
    { label: 'Gen 1 Stat Calculator', route:'/gen1-stat-calc'},
    { label: 'Gen 2 Stat Calculator', route:'/gen2-stat-calc'},
];

const Navbar = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

    const items = data.map((item, index) =>
        (
            <NavLink
                label={item.label}
                key={item.label}
                active={index==active}
                onClick={() => { navigate(item.route); setActive(index)}}

                style={{ margin: '5px' }}
            />
        ));

    return (
        <AppShell.Navbar p="md" style={{ gap: '10px' }}>
            <Box w={220}>{items}</Box>
        </AppShell.Navbar>
    );
};

export default Navbar;