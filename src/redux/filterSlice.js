import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice(
	{
		name: 'filter',
		initialState: '',
		reducers: {
			changeFiler(state, action) {
				return (state = action.payload);
			}
		},
	},
);

export const { changeFiler } = filterSlice.actions;