import { Route, Routes } from 'react-router-dom';
import {GitHubButton} from "../Button/GitHubButton/githubbutton.tsx";
import {LightDarkButton} from "../Button/LightDarkButton/lightdarkbutton.tsx";
import {Gen1StatCalc} from "../Calculators/Gen1StatCalc/Gen1StatCalc.tsx";

const RoutePaths = () => {
    return (
        <Routes>
            <Route path="*" element={<GitHubButton/>} />
            <Route path="/gen1-stat-calc" element={<Gen1StatCalc/>}/>
            <Route path="/gen2-stat-calc" element={<LightDarkButton/>} />
        </Routes>
    );
};

export default RoutePaths;