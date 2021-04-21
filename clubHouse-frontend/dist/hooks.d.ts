import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';
export declare const useAppDispatch: () => import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
