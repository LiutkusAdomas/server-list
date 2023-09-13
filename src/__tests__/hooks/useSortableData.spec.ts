import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Server } from '../../model/Server.type';
import { useSortableData } from '../../hooks/useSortableData';

const initialData: Server[] = [
    { id: '2', name: 'Server 2', distance: 2, flag: '' },
    { id: '1', name: 'Server 1', distance: 1, flag: '' },
    { id: '3', name: 'Server 3', distance: 3, flag: '' }
]

describe('Use Sortable Data hook', () => {
    it('should have ascending by name data by default', () => {
        const { result } = renderHook(() => useSortableData(initialData));
        expect(result.current.sortedData![0].name).toEqual('Server 1');
        expect(result.current.sortedData![result.current.sortedData!.length - 1].name).toEqual('Server 3');
    });

    it('should have descending by name when clicked on name once', () => {
        const { result } = renderHook(() => useSortableData(initialData));
        act(() => result.current.requestSort('name'));
        expect(result.current.sortedData![0].name).toEqual('Server 3');
        expect(result.current.sortedData![result.current.sortedData!.length - 1].name).toEqual('Server 1');
    })

    it('should retain sorting when clicked twice', () => {
        const { result } = renderHook(() => useSortableData(initialData));
        act(() => result.current.requestSort('name'));
        act(() => result.current.requestSort('name'));
        expect(result.current.sortedData![0].name).toEqual('Server 1');
        expect(result.current.sortedData![result.current.sortedData!.length - 1].name).toEqual('Server 3');
    })

    it('should order by distance', () => {
        const { result } = renderHook(() => useSortableData(initialData));
        act(() => result.current.requestSort('distance'));
        expect(result.current.sortedData![0].distance).toEqual(1);
        expect(result.current.sortedData![result.current.sortedData!.length - 1].distance).toEqual(3);
    })

    it('should retain the list if the values are equal', () => {
        const data: Server[] = [
            { id: '2', name: 'Server 2', distance: 2, flag: '' },
            { id: '1', name: 'Server 2', distance: 2, flag: '' }
        ];
        const { result } = renderHook(() => useSortableData(data));
        expect(result.current.sortedData).toEqual(data);
    })

    it('should not break on undefined', () => {
        const data: Server[] | undefined = undefined;
        const { result } = renderHook(() => useSortableData(data));
        expect(result.current.sortedData).toBe(undefined);
    })
})