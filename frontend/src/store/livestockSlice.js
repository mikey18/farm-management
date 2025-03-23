import { createSlice } from '@reduxjs/toolkit';

// Initial empty state - no mock data
const initialState = {
    livestock: [],
    loading: false,
    error: null,
};

// Helper function to get type name from type ID
export const getTypeName = (typeId) => {
    const typeMap = {
        poultry: 'Poultry',
        goats: 'Goats',
        cows: 'Cows',
        sheep: 'Sheep',
        pigs: 'Pigs',
        horses: 'Horses',
        other: 'Other',
    };

    return typeMap[typeId] || 'Unknown';
};

// Helper function to calculate livestock statistics
export const calculateLivestockStats = (livestock) => {
    // Initialize counters
    const stats = {
        total: 0,
        poultry: 0,
        goats: 0,
        cows: 0,
        sheep: 0,
        pigs: 0,
        horses: 0,
        other: 0,
        // Trends (will be calculated based on previous month data in a real app)
        totalTrend: 0,
        poultryTrend: 0,
        goatsTrend: 0,
        cowsTrend: 0,
    };

    // Count livestock by type
    livestock.forEach((animal) => {
        stats.total++;

        // Increment the appropriate type counter
        if (stats[animal.type] !== undefined) {
            stats[animal.type]++;
        } else {
            stats.other++;
        }
    });

    // Calculate trends (in a real app, this would compare with previous period)
    // For this example, we'll generate some random trends
    stats.totalTrend = Math.round(Math.random() * 20 - 10);
    stats.poultryTrend = Math.round(Math.random() * 20 - 10);
    stats.goatsTrend = Math.round(Math.random() * 20 - 10);
    stats.cowsTrend = Math.round(Math.random() * 20 - 10);

    return stats;
};

const livestockSlice = createSlice({
    name: 'livestock',
    initialState,
    reducers: {
        addLivestock: (state, action) => {
            // Generate a unique ID if not provided
            const newLivestock = {
                ...action.payload,
                id:
                    action.payload.id ||
                    `livestock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                // Add typeName for display
                typeName: getTypeName(action.payload.type),
            };

            state.livestock.push(newLivestock);
        },

        updateLivestock: (state, action) => {
            const { id, ...updates } = action.payload;
            const livestockIndex = state.livestock.findIndex(
                (animal) => animal.id === id
            );

            if (livestockIndex !== -1) {
                // Update the livestock item
                state.livestock[livestockIndex] = {
                    ...state.livestock[livestockIndex],
                    ...updates,
                    // Update typeName if type has changed
                    typeName: updates.type
                        ? getTypeName(updates.type)
                        : state.livestock[livestockIndex].typeName,
                };
            }
        },

        deleteLivestock: (state, action) => {
            state.livestock = state.livestock.filter(
                (animal) => animal.id !== action.payload
            );
        },

        setLivestock: (state, action) => {
            // Add typeName to each livestock item
            state.livestock = action.payload.map((animal) => ({
                ...animal,
                typeName: getTypeName(animal.type),
            }));
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Export actions
export const {
    addLivestock,
    updateLivestock,
    deleteLivestock,
    setLivestock,
    setLoading,
    setError,
} = livestockSlice.actions;

// Selectors
export const selectAllLivestock = (state) => state.livestock.livestock;
export const selectLivestockById = (state, livestockId) =>
    state.livestock.livestock.find((animal) => animal.id === livestockId);
export const selectLoading = (state) => state.livestock.loading;
export const selectError = (state) => state.livestock.error;

// Select livestock statistics
export const selectLivestockStats = (state) => {
    return calculateLivestockStats(state.livestock.livestock);
};

// Filter livestock by type and search term
export const selectFilteredLivestock = (state, typeFilter, searchTerm) => {
    let filtered = state.livestock.livestock;

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
            (animal) =>
                animal.tag.toLowerCase().includes(term) ||
                animal.breed.toLowerCase().includes(term)
        );
    }

    // Filter by type
    if (typeFilter && typeFilter !== 'all') {
        filtered = filtered.filter((animal) => animal.type === typeFilter);
    }

    return filtered;
};

export default livestockSlice.reducer;
