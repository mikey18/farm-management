import { createSlice } from '@reduxjs/toolkit';
import { mockFinancialTransactions } from '../data/mockData';

// Helper function to calculate financial summary
const calculateFinancialSummary = (transactions) => {
    // Ensure we have valid transactions
    if (
        !transactions ||
        !Array.isArray(transactions) ||
        transactions.length === 0
    ) {
        return {
            income: '0.00',
            expenses: '0.00',
            profit: '0.00',
            balance: '0.00',
            incomeTrend: 0,
            expensesTrend: 0,
            profitTrend: 0,
        };
    }

    // Calculate income - ensure we properly parse numeric values
    const income = transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => {
            // Parse amount, handling any non-numeric or invalid values
            const amount = parseFloat(transaction.amount) || 0;
            return sum + amount;
        }, 0);

    // Calculate expenses - ensure we properly parse numeric values
    const expenses = transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => {
            // Parse amount, handling any non-numeric or invalid values
            const amount = parseFloat(transaction.amount) || 0;
            return sum + amount;
        }, 0);

    const profit = income - expenses;
    const balance = profit; // Simplified, in a real app this might be more complex

    // Calculate trends by comparing with previous data
    // In a real app, you would compare with historical data
    // For this example, we'll generate dynamic trends based on the current values
    const incomeTrend = calculateTrend(income);
    const expensesTrend = calculateTrend(expenses) * -1; // Invert for expenses (negative is good)
    const profitTrend = calculateTrend(profit);

    return {
        income: income.toFixed(2),
        expenses: expenses.toFixed(2),
        profit: profit.toFixed(2),
        balance: balance.toFixed(2),
        incomeTrend,
        expensesTrend,
        profitTrend,
    };
};

// Helper to generate a realistic trend value
const calculateTrend = () => {
    // Generate a random trend between -10 and +15 percent
    // In a real app, this would be calculated by comparing current period with previous period
    const randomFactor = Math.random() * 25 - 10;
    return Number.parseFloat(randomFactor.toFixed(1));
};

// Initial state with calculated summary from mock data
const initialState = {
    transactions: mockFinancialTransactions,
    summary: calculateFinancialSummary(mockFinancialTransactions), // Calculate initial summary from transactions
    loading: false,
    error: null,
};

const financialSlice = createSlice({
    name: 'financial',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            // Ensure amount is a valid number before formatting
            const amount = parseFloat(action.payload.amount) || 0;

            // Add a new transaction with a unique ID
            const newTransaction = {
                ...action.payload,
                id: Date.now().toString(), // Simple ID generation
                amount: amount.toFixed(2), // Ensure consistent format
            };

            state.transactions.unshift(newTransaction); // Add to beginning of array

            // Recalculate summary after adding a transaction
            state.summary = calculateFinancialSummary(state.transactions);
        },

        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== action.payload
            );

            // Recalculate summary after deleting a transaction
            state.summary = calculateFinancialSummary(state.transactions);
        },

        setTransactions: (state, action) => {
            state.transactions = action.payload;
            state.summary = calculateFinancialSummary(action.payload);
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

// Export actions and reducer
export const {
    addTransaction,
    deleteTransaction,
    setTransactions,
    setLoading,
    setError,
} = financialSlice.actions;

// Selectors
export const selectTransactions = (state) => state.financial.transactions;
export const selectFinancialSummary = (state) => state.financial.summary;
export const selectLoading = (state) => state.financial.loading;
export const selectError = (state) => state.financial.error;

// Filter transactions by type and date range
export const selectFilteredTransactions = (state, typeFilter, dateFilter) => {
    let filtered = state.financial.transactions;

    // Filter by type
    if (typeFilter !== 'all') {
        filtered = filtered.filter(
            (transaction) => transaction.type === typeFilter
        );
    }

    // Filter by date
    if (dateFilter) {
        const now = new Date();
        let startDate;

        switch (dateFilter) {
            case 'week':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate = new Date(now);
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                startDate = null;
        }

        if (startDate) {
            filtered = filtered.filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                return transactionDate >= startDate && transactionDate <= now;
            });
        }
    }

    return filtered;
};

export default financialSlice.reducer;
