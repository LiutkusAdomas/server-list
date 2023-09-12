import { Server } from "../model/Server.type";
import { ServerResponse } from "../model/ServerResponse.type";
import { v4 } from 'uuid';
import latvia from '../assets/latvia.svg';
import japan from '../assets/japan.svg';
import lithuania from '../assets/lithuania.svg';
import singapore from '../assets/singapore.svg';
import germany from '../assets/germany.svg';
import uk from '../assets/uk.svg';
import us from '../assets/us.svg';

export const transformResponse = (data: ServerResponse[]): Server[] => {
    return data.map(item => ({
        id: v4(),
        name: item.name,
        distance: item.distance,
        flag: getFlag(item.name)
    }));
}

export const validateInput = (value: string): string | undefined => {
    if (value.length < 6) {
        return 'This field must be longer than 5 characters';
    }
    else if (value.length > 20) {
        return 'This field must be shorter than 20 characters';
    }
    else return undefined;
}

const getFlag = (name: string): string => {
    if (name.toLowerCase().includes('latvia'))
        return latvia;
    else if (name.toLowerCase().includes('japan'))
        return japan;
    else if (name.toLowerCase().includes('lithuania'))
        return lithuania;
    else if (name.toLowerCase().includes('singapore'))
        return singapore;
    else if (name.toLowerCase().includes('germany'))
        return germany;
    else if (name.toLowerCase().includes('united kingdom'))
        return uk;
    else if (name.toLowerCase().includes('united states'))
        return us;
    else
        return '';
}