import { Server } from "../model/Server.type";

export const ASCENDING = 'ascending';
export const DESCENDING = 'descending';

export const sortData = (data: Server[], sortConfig: { key: string; direction: string }) => {
    return [...data].sort((a, b) => {
        if (a[sortConfig.key as keyof Server] < b[sortConfig.key as keyof Server]) {
            return sortConfig.direction === ASCENDING ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Server] > b[sortConfig.key as keyof Server]) {
            return sortConfig.direction === ASCENDING ? 1 : -1;
        }
        return 0;
    });
};
