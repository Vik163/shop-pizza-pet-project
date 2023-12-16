import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist'; // dist 6:40min
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

// 13_18 5min
export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        // @ts-ignore
        return useMemo(
                    // @ts-ignore
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
