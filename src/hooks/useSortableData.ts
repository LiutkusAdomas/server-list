import { useState, useMemo } from 'react';
import { Server } from '../model/Server.type';
import { ASCENDING, DESCENDING, sortData } from '../helpers/sorting';

export const useSortableData = (initialData: Server[] | undefined, initialConfig = { key: 'name', direction: ASCENDING }) => {
    const [sortConfig, setSortConfig] = useState(initialConfig);

    const sortedData = useMemo(() => {
        if (initialData) {
            return sortData(initialData, sortConfig)
        }
        return initialData;
    }, [initialData, sortConfig]);

    const requestSort = (key: string) => {
        let direction = ASCENDING;
        if (sortConfig.key === key && sortConfig.direction === ASCENDING) {
            direction = DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    return { sortedData, requestSort, sortConfig };
};