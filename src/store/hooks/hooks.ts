import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '..';

export const useAppDispatch: () => StoreDispatch = useDispatch as () => StoreDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector<RootState>;