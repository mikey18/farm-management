import { createSlice } from '@reduxjs/toolkit';
// import { mockCropData } from "../data/mockData"

// Helper function to calculate growth progress based on planting and harvest dates
const calculateGrowthProgress = (plantingDate, expectedHarvestDate) => {
    try {
        const plantDate = new Date(plantingDate);
        const harvestDate = new Date(expectedHarvestDate);
        const currentDate = new Date();

        // If dates are invalid, return 0
        if (isNaN(plantDate) || isNaN(harvestDate)) {
            return 0;
        }

        // If harvest date is in the past, return 100%
        if (currentDate > harvestDate) {
            return 100;
        }

        // If planting date is in the future, return 0%
        if (currentDate < plantDate) {
            return 0;
        }

        // Calculate total duration and elapsed time
        const totalDuration = harvestDate - plantDate;
        const elapsedTime = currentDate - plantDate;

        // Calculate percentage
        const progress = Math.round((elapsedTime / totalDuration) * 100);

        // Ensure progress is between 0 and 100
        return Math.max(0, Math.min(100, progress));
    } catch (error) {
        console.error('Error calculating growth progress:', error);
        return 0;
    }
};

// Helper function to calculate expected harvest date based on crop type and planting date
export const calculateHarvestDate = (plantingDate, cropType) => {
    if (!plantingDate || !cropType) return null;

    const plantDate = new Date(plantingDate);
    let daysToHarvest = 90; // Default

    // Simplified logic - in a real app, this would be more sophisticated
    switch (cropType.toLowerCase()) {
        case 'corn':
            daysToHarvest = 80;
            break;
        case 'wheat':
            daysToHarvest = 120;
            break;
        case 'rice':
            daysToHarvest = 120;
            break;
        case 'tomatoes':
            daysToHarvest = 70;
            break;
        case 'potatoes':
            daysToHarvest = 100;
            break;
        case 'lettuce':
            daysToHarvest = 45;
            break;
        case 'carrots':
            daysToHarvest = 70;
            break;
        case 'strawberries':
            daysToHarvest = 60;
            break;
        default:
            daysToHarvest = 90;
    }

    const harvestDate = new Date(plantDate);
    harvestDate.setDate(harvestDate.getDate() + daysToHarvest);

    return harvestDate.toISOString().split('T')[0];
};

// Process crops to add growth progress
const processCrops = (crops) => {
    return crops.map((crop) => ({
        ...crop,
        progress: calculateGrowthProgress(
            crop.plantingDate,
            crop.expectedHarvestDate
        ),
        id:
            crop.id ||
            `crop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
};

// Initial state
const initialState = {
    crops: processCrops([]),
    loading: false,
    error: null,
};

const cropSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {
        addCrop: (state, action) => {
            // Generate a unique ID if not provided
            const newCrop = {
                ...action.payload,
                id:
                    action.payload.id ||
                    `crop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                progress: 0, // New crops start at 0% progress
            };

            state.crops.push(newCrop);

            // Recalculate progress for all crops
            state.crops = processCrops(state.crops);
        },

        updateCrop: (state, action) => {
            const { id, ...updates } = action.payload;
            const cropIndex = state.crops.findIndex((crop) => crop.id === id);

            if (cropIndex !== -1) {
                state.crops[cropIndex] = {
                    ...state.crops[cropIndex],
                    ...updates,
                };

                // Recalculate progress for all crops
                state.crops = processCrops(state.crops);
            }
        },

        deleteCrop: (state, action) => {
            state.crops = state.crops.filter(
                (crop) => crop.id !== action.payload
            );
        },

        setCrops: (state, action) => {
            state.crops = processCrops(action.payload);
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateGrowthProgress: (state) => {
            // Recalculate progress for all crops
            state.crops = processCrops(state.crops);
        },
    },
});

// Export actions
export const {
    addCrop,
    updateCrop,
    deleteCrop,
    setCrops,
    setLoading,
    setError,
    updateGrowthProgress,
} = cropSlice.actions;

// Selectors
export const selectAllCrops = (state) => state.crops.crops;
export const selectCropById = (state, cropId) =>
    state.crops.crops.find((crop) => crop.id === cropId);
export const selectLoading = (state) => state.crops.loading;
export const selectError = (state) => state.crops.error;

// Filter crops by search term
export const selectFilteredCrops = (state, searchTerm) => {
    if (!searchTerm) {
        return state.crops.crops;
    }

    const term = searchTerm.toLowerCase();
    return state.crops.crops.filter(
        (crop) =>
            crop.name.toLowerCase().includes(term) ||
            crop.variety.toLowerCase().includes(term)
    );
};

export default cropSlice.reducer;
