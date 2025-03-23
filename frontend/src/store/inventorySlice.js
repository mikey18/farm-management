import { createSlice } from '@reduxjs/toolkit';

// Initial empty state - no mock data
const initialState = {
    machinery: [],
    loading: false,
    error: null,
};

// Helper function to get category label from ID
export const getCategoryLabel = (categoryId, categories) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.label : 'Unknown';
};

// Helper function to calculate maintenance status
export const calculateMaintenanceStatus = (nextMaintenance) => {
    if (!nextMaintenance) return 'operational';

    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);

    // If maintenance date is invalid, return operational
    if (isNaN(maintenanceDate)) return 'operational';

    // If maintenance is due within 7 days, mark as scheduled maintenance
    const daysUntilMaintenance = Math.ceil(
        (maintenanceDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilMaintenance < 0) {
        return 'broken'; // Maintenance overdue
    } else if (daysUntilMaintenance <= 7) {
        return 'maintenance'; // Maintenance due soon
    } else {
        return 'operational'; // Maintenance not due soon
    }
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addMachinery: (state, action) => {
            // Generate a unique ID if not provided
            const newMachinery = {
                ...action.payload,
                id:
                    action.payload.id ||
                    `machinery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            };

            state.machinery.push(newMachinery);
        },

        updateMachinery: (state, action) => {
            const { id, ...updates } = action.payload;
            const machineryIndex = state.machinery.findIndex(
                (item) => item.id === id
            );

            if (machineryIndex !== -1) {
                state.machinery[machineryIndex] = {
                    ...state.machinery[machineryIndex],
                    ...updates,
                };
            }
        },

        deleteMachinery: (state, action) => {
            state.machinery = state.machinery.filter(
                (item) => item.id !== action.payload
            );
        },

        setMachinery: (state, action) => {
            state.machinery = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateMaintenanceStatuses: (state) => {
            // Update status based on maintenance dates
            state.machinery = state.machinery.map((item) => ({
                ...item,
                status: calculateMaintenanceStatus(item.nextMaintenance),
            }));
        },
    },
});

// Export actions
export const {
    addMachinery,
    updateMachinery,
    deleteMachinery,
    setMachinery,
    setLoading,
    setError,
    updateMaintenanceStatuses,
} = inventorySlice.actions;

// Selectors
export const selectAllMachinery = (state) => state.inventory.machinery;
export const selectMachineryById = (state, machineryId) =>
    state.inventory.machinery.find((item) => item.id === machineryId);
export const selectLoading = (state) => state.inventory.loading;
export const selectError = (state) => state.inventory.error;

// Filter machinery by category and search term
export const selectFilteredMachinery = (
    state,
    categoryId,
    searchTerm,
    categories
) => {
    let filtered = state.inventory.machinery;

    // Add categoryLabel to each item
    filtered = filtered.map((item) => ({
        ...item,
        categoryLabel: getCategoryLabel(item.category, categories),
    }));

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(term)
        );
    }

    // Filter by category
    if (categoryId && categoryId !== 'all') {
        filtered = filtered.filter((item) => item.category === categoryId);
    }

    return filtered;
};

export default inventorySlice.reducer;
