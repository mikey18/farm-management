// Dashboard Mock Data
export const mockNotifications = [
    {
        title: 'Machinery Maintenance Required',
        message: 'The tractor is due for regular maintenance in 2 days.',
        time: '2 hours ago',
        type: 'warning',
        isNew: true,
    },
    {
        title: 'Livestock Health Alert',
        message:
            'Three goats showing signs of illness. Veterinary check recommended.',
        time: '5 hours ago',
        type: 'warning',
        isNew: true,
    },
    {
        title: 'Crop Harvesting Reminder',
        message: 'Yam crops in Field 3 are ready for harvesting.',
        time: 'Yesterday',
        type: 'info',
        isNew: false,
    },
    {
        title: 'Weather Alert',
        message:
            'Heavy rainfall expected in the next 48 hours. Consider postponing outdoor activities.',
        time: '2 days ago',
        type: 'warning',
        isNew: false,
    },
];

export const mockUpcomingTasks = [
    {
        title: 'Harvest Cassava - Field 2',
        date: 'Tomorrow',
    },
    {
        title: 'Machinery Maintenance',
        date: 'In 2 days',
    },
    {
        title: 'Livestock Vaccination',
        date: 'Next week',
    },
];

export const mockFinancialData = {
    income: '$8,250',
    expenses: '$3,800',
    profit: '$4,450',
};

// Inventory Management Mock Data
export const mockMachineryData = [
    {
        name: 'John Deere Tractor',
        category: 'tractors',
        categoryLabel: 'Tractors & Attachments',
        status: 'operational',
        lastMaintenance: '15/03/2023',
        nextMaintenance: '15/06/2023',
    },
    {
        name: 'Disc Plow',
        category: 'land-preparation',
        categoryLabel: 'Land Preparation',
        status: 'maintenance',
        lastMaintenance: '10/01/2023',
        nextMaintenance: '10/04/2023',
    },
    {
        name: 'Rotavator',
        category: 'land-preparation',
        categoryLabel: 'Land Preparation',
        status: 'operational',
        lastMaintenance: '05/02/2023',
        nextMaintenance: '05/05/2023',
    },
    {
        name: 'Seed Drill',
        category: 'planting',
        categoryLabel: 'Planting',
        status: 'broken',
        lastMaintenance: '20/12/2022',
        nextMaintenance: '20/03/2023',
    },
    {
        name: 'Sprinkler System',
        category: 'irrigation',
        categoryLabel: 'Irrigation',
        status: 'operational',
        lastMaintenance: '12/03/2023',
        nextMaintenance: '12/06/2023',
    },
    {
        name: 'Fertilizer Spreader',
        category: 'crop-maintenance',
        categoryLabel: 'Crop Maintenance',
        status: 'maintenance',
        lastMaintenance: '25/02/2023',
        nextMaintenance: '25/05/2023',
    },
    {
        name: 'Combine Harvester',
        category: 'harvesting',
        categoryLabel: 'Harvesting',
        status: 'operational',
        lastMaintenance: '30/01/2023',
        nextMaintenance: '30/04/2023',
    },
    {
        name: 'Grain Dryer',
        category: 'post-harvest',
        categoryLabel: 'Post-Harvest',
        status: 'operational',
        lastMaintenance: '05/03/2023',
        nextMaintenance: '05/06/2023',
    },
    {
        name: 'Milking Machine',
        category: 'livestock',
        categoryLabel: 'Livestock',
        status: 'maintenance',
        lastMaintenance: '18/02/2023',
        nextMaintenance: '18/05/2023',
    },
];

// Livestock Management Mock Data
export const mockLivestockStats = {
    total: 124,
    totalTrend: 5.3,
    poultry: 85,
    poultryTrend: 7.2,
    goats: 28,
    goatsTrend: -2.1,
    cows: 11,
    cowsTrend: 10,
};

export const mockLivestockData = [
    {
        tag: 'COW-001',
        type: 'cows',
        typeName: 'Cow',
        breed: 'Holstein',
        birthDate: '12/04/2020',
        status: 'healthy',
    },
    {
        tag: 'COW-002',
        type: 'cows',
        typeName: 'Cow',
        breed: 'Jersey',
        birthDate: '25/07/2021',
        status: 'pregnant',
    },
    {
        tag: 'GOT-001',
        type: 'goats',
        typeName: 'Goat',
        breed: 'Boer',
        birthDate: '10/01/2022',
        status: 'healthy',
    },
    {
        tag: 'GOT-002',
        type: 'goats',
        typeName: 'Goat',
        breed: 'Nubian',
        birthDate: '15/03/2022',
        status: 'sick',
    },
    {
        tag: 'PLT-001',
        type: 'poultry',
        typeName: 'Fowl',
        breed: 'Leghorn',
        birthDate: '05/05/2022',
        status: 'healthy',
    },
    {
        tag: 'PLT-002',
        type: 'poultry',
        typeName: 'Turkey',
        breed: 'Bronze',
        birthDate: '20/02/2022',
        status: 'quarantined',
    },
];

// Crop Management Mock Data
export const mockCropData = [
    {
        name: 'Yam',
        plantingDate: '15/03/2023',
        expectedHarvestDate: '15/08/2023',
        status: 'growing',
        field: 'Field 1',
    },
    {
        name: 'Cassava',
        plantingDate: '10/02/2023',
        expectedHarvestDate: '10/11/2023',
        status: 'growing',
        field: 'Field 2',
    },
    {
        name: 'Corn',
        plantingDate: '20/04/2023',
        expectedHarvestDate: '20/07/2023',
        status: 'growing',
        field: 'Field 3',
    },
    {
        name: 'Beans',
        plantingDate: '05/05/2023',
        expectedHarvestDate: '05/08/2023',
        status: 'growing',
        field: 'Field 4',
    },
    {
        name: 'Potato',
        plantingDate: '25/03/2023',
        expectedHarvestDate: '25/06/2023',
        status: 'growing',
        field: 'Field 5',
    },
    {
        name: 'Water Yam',
        plantingDate: '01/04/2023',
        expectedHarvestDate: '01/09/2023',
        status: 'growing',
        field: 'Field 6',
    },
];

// Financial Management Mock Data
export const mockFinancialSummary = {
    income: '$25,450',
    incomeTrend: 12.5,
    expenses: '$13,200',
    expensesTrend: -5.3,
    profit: '$12,250',
    profitTrend: 18.7,
    balance: '$45,600',
};

export const mockFinancialTransactions = [
    {
        date: '05/06/2023',
        category: 'Crop Sales',
        description: 'Sold 2 tons of yam',
        type: 'income',
        amount: '$1,200',
    },
    {
        date: '03/06/2023',
        category: 'Livestock Sales',
        description: 'Sold 50 chickens',
        type: 'income',
        amount: '$500',
    },
    {
        date: '01/06/2023',
        category: 'Feed Purchase',
        description: 'Purchased feed for livestock',
        type: 'expense',
        amount: '$350',
    },
    {
        date: '28/05/2023',
        category: 'Fertilizer',
        description: 'Purchased fertilizer for crops',
        type: 'expense',
        amount: '$420',
    },
    {
        date: '25/05/2023',
        category: 'Equipment Repair',
        description: 'Tractor maintenance',
        type: 'expense',
        amount: '$250',
    },
    {
        date: '20/05/2023',
        category: 'Crop Sales',
        description: 'Sold 1.5 tons of cassava',
        type: 'income',
        amount: '$850',
    },
];

// Crop Prediction Mock Data
export const mockCropPredictions = [
    {
        name: 'Cassava',
        score: 92,
        estimatedYield: '12-15 tons/hectare',
        growingPeriod: '10-12 months',
        waterRequirement: 'Moderate',
        profitPotential: 'High',
    },
    {
        name: 'Yam',
        score: 85,
        estimatedYield: '8-10 tons/hectare',
        growingPeriod: '6-8 months',
        waterRequirement: 'Moderate to High',
        profitPotential: 'Very High',
    },
    {
        name: 'Corn',
        score: 78,
        estimatedYield: '5-7 tons/hectare',
        growingPeriod: '3-4 months',
        waterRequirement: 'Moderate',
        profitPotential: 'Medium',
    },
    {
        name: 'Beans',
        score: 65,
        estimatedYield: '1.5-2 tons/hectare',
        growingPeriod: '2-3 months',
        waterRequirement: 'Low to Moderate',
        profitPotential: 'Medium',
    },
];

export const mockCropFactors = [
    {
        name: 'Soil Type',
        description:
            'Different crops require different soil textures and structures for optimal growth.',
        color: '#1E8E3E',
        borderColor: '#E2E8F0',
    },
    {
        name: 'Rainfall',
        description:
            'Water availability is critical. Some crops are drought-tolerant while others need regular rainfall.',
        color: '#3B82F6',
        borderColor: '#E2E8F0',
    },
    {
        name: 'Temperature',
        description:
            'Each crop has an optimal temperature range for growth and development.',
        color: '#F59E0B',
        borderColor: '#E2E8F0',
    },
    {
        name: 'Historical Yield',
        description:
            'Past performance of crops in similar conditions is a strong predictor of future success.',
        color: '#6941C6',
        borderColor: '#E2E8F0',
    },
];
