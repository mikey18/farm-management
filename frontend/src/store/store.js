import { configureStore } from '@reduxjs/toolkit';
import financialReducer from './financialSlice';
import cropReducer from './cropSlice';
import inventoryReducer from './inventorySlice';
import livestockReducer from './livestockSlice';

export const store = configureStore({
    reducer: {
        financial: financialReducer,
        crops: cropReducer,
        inventory: inventoryReducer,
        livestock: livestockReducer,
    },
});
