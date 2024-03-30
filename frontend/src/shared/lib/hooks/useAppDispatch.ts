import { useDispatch } from 'react-redux';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type AppDispatch } from '@/app/providers/StoreProvider/config/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
