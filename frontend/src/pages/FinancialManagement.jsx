'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    IoAdd,
    IoCalendarOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoTrashOutline,
    IoWallet,
    IoWalletOutline,
    IoClose,
    IoCheckmark,
    IoArrowUp,
    IoArrowDown,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import {
    selectFilteredTransactions,
    selectFinancialSummary,
    addTransaction,
    deleteTransaction,
} from '../store/financialSlice';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[6]};
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing[4]};
`;

const PageTitle = styled.h1`
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    margin: 0;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${(props) => props.theme.spacing[4]};

    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
    flex-wrap: wrap;
    margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const FilterLabel = styled.div`
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.textLight};
`;

const FilterGroup = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[1]};
`;

const FilterButton = styled.button`
    padding: ${(props) => props.theme.spacing[1]}
        ${(props) => props.theme.spacing[3]};
    background-color: ${(props) =>
        props.isActive ? props.theme.colors.primary : 'transparent'};
    color: ${(props) => (props.isActive ? 'white' : props.theme.colors.text)};
    border: 1px solid
        ${(props) =>
            props.isActive
                ? props.theme.colors.primary
                : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.xs};
    cursor: pointer;

    &:hover {
        background-color: ${(props) =>
            props.isActive
                ? props.theme.colors.primary
                : props.theme.colors.background};
    }
`;

const TableContainer = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    background-color: ${(props) => props.theme.colors.background};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const TableHeader = styled.th`
    padding: ${(props) => props.theme.spacing[3]};
    text-align: left;
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.textLight};
    white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    border-bottom: 1px solid ${(props) => props.theme.colors.border};

    &:hover {
        background-color: ${(props) => `${props.theme.colors.background}80`};
    }
`;

const TableCell = styled.td`
    padding: ${(props) => props.theme.spacing[3]};
    font-size: ${(props) => props.theme.fontSizes.sm};
`;

const AmountCell = styled.td`
    padding: ${(props) => props.theme.spacing[3]};
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: 500;
    color: ${(props) =>
        props.type === 'income'
            ? props.theme.colors.success
            : props.theme.colors.danger};
`;

const TransactionType = styled.span`
    display: inline-flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing[1]}
        ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.full};
    font-size: ${(props) => props.theme.fontSizes.xs};
    font-weight: 500;

    ${(props) =>
        props.type === 'income'
            ? `
    background-color: ${props.theme.colors.success}15;
    color: ${props.theme.colors.success};
  `
            : `
    background-color: ${props.theme.colors.danger}15;
    color: ${props.theme.colors.danger};
  `}
`;

const TransactionCategory = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
`;

const CategoryIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) =>
        props.type === 'income'
            ? `${props.theme.colors.success}15`
            : `${props.theme.colors.danger}15`};

    svg {
        color: ${(props) =>
            props.type === 'income'
                ? props.theme.colors.success
                : props.theme.colors.danger};
    }
`;

const CategoryText = styled.div`
    display: flex;
    flex-direction: column;
`;

const CategoryName = styled.div`
    font-weight: 500;
`;

const CategoryDescription = styled.div`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors.textLight};
`;

const ActionButton = styled.button`
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textLight};
    cursor: pointer;
    padding: ${(props) => props.theme.spacing[1]};
    border-radius: ${(props) => props.theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
`;

// Modal styles
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: ${(props) => props.theme.borderRadius.lg};
    width: 100%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.spacing[4]};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.xl};
`;

const ModalCloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.textLight};
    padding: ${(props) => props.theme.spacing[1]};
    border-radius: ${(props) => props.theme.borderRadius.full};

    &:hover {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
    }
`;

const ModalBody = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
`;

const ModalFooter = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
    border-top: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    justify-content: flex-end;
    gap: ${(props) => props.theme.spacing[2]};
`;

const FormGroup = styled.div`
    margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: ${(props) => props.theme.spacing[1]};
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: 500;
    color: ${(props) => props.theme.colors.text};
`;

const FormInput = styled.input`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;
    background-color: white;

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${(props) => props.theme.spacing[4]};

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`;

const TransactionTypeSelector = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
    margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const TypeButton = styled.button`
    flex: 1;
    padding: ${(props) => props.theme.spacing[3]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) =>
        props.isActive
            ? props.type === 'income'
                ? `${props.theme.colors.success}15`
                : `${props.theme.colors.danger}15`
            : 'white'};
    color: ${(props) => props.theme.colors.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) =>
            props.type === 'income'
                ? `${props.theme.colors.success}10`
                : `${props.theme.colors.danger}10`};
    }

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${(props) =>
            props.type === 'income'
                ? `${props.theme.colors.success}15`
                : `${props.theme.colors.danger}15`};
    }

    .icon {
        color: ${(props) =>
            props.type === 'income'
                ? props.theme.colors.success
                : props.theme.colors.danger};
        font-size: 20px;
    }

    .label {
        font-weight: 500;
    }

    border: ${(props) =>
        props.isActive
            ? props.type === 'income'
                ? `2px solid ${props.theme.colors.success}`
                : `2px solid ${props.theme.colors.danger}`
            : `1px solid ${props.theme.colors.border}`};
`;

const FinancialManagement = () => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeDateFilter, setActiveDateFilter] = useState('month');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        type: 'income',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
    });

    // Get data from Redux store
    const filteredTransactions = useSelector((state) =>
        selectFilteredTransactions(state, activeFilter, activeDateFilter)
    );
    const financialSummary = useSelector(selectFinancialSummary);

    // Categories for the dropdown
    const categories = {
        income: [
            'Sales',
            'Investments',
            'Grants',
            'Subsidies',
            'Loans',
            'Other Income',
        ],
        expense: [
            'Seeds & Plants',
            'Fertilizers',
            'Pesticides',
            'Equipment',
            'Labor',
            'Utilities',
            'Rent',
            'Fuel',
            'Maintenance',
            'Insurance',
            'Marketing',
            'Other Expenses',
        ],
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form
        setNewTransaction({
            type: 'income',
            category: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTypeChange = (type) => {
        setNewTransaction((prev) => ({
            ...prev,
            type,
            category: '', // Reset category when type changes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure amount is a valid number
        const amount = Number.parseFloat(newTransaction.amount) || 0;

        // Format the transaction data
        const formattedTransaction = {
            ...newTransaction,
            amount: amount.toFixed(2),
            // Add a timestamp for sorting and a unique ID
            timestamp: new Date().toISOString(),
            id: Date.now().toString(),
        };

        // Dispatch action to add transaction to Redux store
        dispatch(addTransaction(formattedTransaction));

        // Close the modal after submission
        handleCloseModal();
    };

    const handleDeleteTransaction = (id) => {
        // Dispatch action to delete transaction from Redux store
        dispatch(deleteTransaction(id));
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Financial Management</PageTitle>

                <ButtonGroup>
                    <Button variant="outline">
                        <IoFilterOutline />
                        Filter
                    </Button>
                    <Button variant="outline">
                        <IoDownloadOutline />
                        Export
                    </Button>
                    <Button onClick={handleOpenModal}>
                        <IoAdd />
                        Add Transaction
                    </Button>
                </ButtonGroup>
            </PageHeader>

            <StatsGrid>
                <StatCard
                    title="Total Income"
                    value={financialSummary.income}
                    icon={IoWalletOutline}
                    trend={financialSummary.incomeTrend}
                    trendLabel="from last month"
                    color="#1E8E3E"
                />
                <StatCard
                    title="Total Expenses"
                    value={financialSummary.expenses}
                    icon={IoWalletOutline}
                    trend={financialSummary.expensesTrend}
                    trendLabel="from last month"
                    color="#D92D20"
                />
                <StatCard
                    title="Net Profit"
                    value={financialSummary.profit}
                    icon={IoWalletOutline}
                    trend={financialSummary.profitTrend}
                    trendLabel="from last month"
                    color="#6941C6"
                />
                <StatCard
                    title="Balance"
                    value={financialSummary.balance}
                    icon={IoWalletOutline}
                    color="#3B82F6"
                />
            </StatsGrid>

            <Card>
                <FilterContainer>
                    <FilterLabel>Type:</FilterLabel>
                    <FilterGroup>
                        <FilterButton
                            isActive={activeFilter === 'all'}
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </FilterButton>
                        <FilterButton
                            isActive={activeFilter === 'income'}
                            onClick={() => setActiveFilter('income')}
                        >
                            Income
                        </FilterButton>
                        <FilterButton
                            isActive={activeFilter === 'expense'}
                            onClick={() => setActiveFilter('expense')}
                        >
                            Expense
                        </FilterButton>
                    </FilterGroup>

                    <div style={{ flex: 1 }} />

                    <FilterLabel>Period:</FilterLabel>
                    <FilterGroup>
                        <FilterButton
                            isActive={activeDateFilter === 'week'}
                            onClick={() => setActiveDateFilter('week')}
                        >
                            Week
                        </FilterButton>
                        <FilterButton
                            isActive={activeDateFilter === 'month'}
                            onClick={() => setActiveDateFilter('month')}
                        >
                            Month
                        </FilterButton>
                        <FilterButton
                            isActive={activeDateFilter === 'year'}
                            onClick={() => setActiveDateFilter('year')}
                        >
                            Year
                        </FilterButton>
                    </FilterGroup>
                </FilterContainer>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <tr>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Type</TableHeader>
                                <TableHeader>Amount</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                        >
                                            <IoCalendarOutline size={14} />
                                            {transaction.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <TransactionCategory>
                                            <CategoryIcon
                                                type={transaction.type}
                                            >
                                                <IoWallet />
                                            </CategoryIcon>
                                            <CategoryText>
                                                <CategoryName>
                                                    {transaction.category}
                                                </CategoryName>
                                                <CategoryDescription>
                                                    {transaction.description}
                                                </CategoryDescription>
                                            </CategoryText>
                                        </TransactionCategory>
                                    </TableCell>
                                    <TableCell>
                                        <TransactionType
                                            type={transaction.type}
                                        >
                                            {transaction.type === 'income'
                                                ? 'Income'
                                                : 'Expense'}
                                        </TransactionType>
                                    </TableCell>
                                    <AmountCell type={transaction.type}>
                                        {transaction.type === 'income'
                                            ? '+'
                                            : '-'}
                                        {transaction.amount}
                                    </AmountCell>
                                    <TableCell>
                                        <ActionButton
                                            title="Delete"
                                            onClick={() =>
                                                handleDeleteTransaction(
                                                    transaction.id
                                                )
                                            }
                                        >
                                            <IoTrashOutline />
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        style={{ textAlign: 'center' }}
                                    >
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Add Transaction Modal */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Add New Transaction</ModalTitle>
                            <ModalCloseButton onClick={handleCloseModal}>
                                <IoClose size={24} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <TransactionTypeSelector>
                                    <TypeButton
                                        type="income"
                                        isActive={
                                            newTransaction.type === 'income'
                                        }
                                        onClick={() =>
                                            handleTypeChange('income')
                                        }
                                    >
                                        <div className="icon-container">
                                            <IoArrowUp className="icon" />
                                        </div>
                                        <span className="label">Income</span>
                                    </TypeButton>
                                    <TypeButton
                                        type="expense"
                                        isActive={
                                            newTransaction.type === 'expense'
                                        }
                                        onClick={() =>
                                            handleTypeChange('expense')
                                        }
                                    >
                                        <div className="icon-container">
                                            <IoArrowDown className="icon" />
                                        </div>
                                        <span className="label">Expense</span>
                                    </TypeButton>
                                </TransactionTypeSelector>

                                <FormRow>
                                    <FormGroup>
                                        <FormLabel htmlFor="amount">
                                            Amount
                                        </FormLabel>
                                        <FormInput
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            value={newTransaction.amount}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <FormLabel htmlFor="date">
                                            Date
                                        </FormLabel>
                                        <FormInput
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={newTransaction.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <FormLabel htmlFor="category">
                                        Category
                                    </FormLabel>
                                    <FormSelect
                                        id="category"
                                        name="category"
                                        value={newTransaction.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {categories[newTransaction.type].map(
                                            (category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}
                                    </FormSelect>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={newTransaction.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter a description"
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    onClick={handleCloseModal}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    <IoCheckmark />
                                    Add Transaction
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default FinancialManagement;
