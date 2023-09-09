import { useDispatch } from 'react-redux';
import { StoreDispatch } from '..';

export const useAppDispatch: () => StoreDispatch = useDispatch as () => StoreDispatch;