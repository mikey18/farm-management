'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
    IoAdd,
    IoCalendarOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoTrashOutline,
    IoWallet,
    IoWalletOutline,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import {
    mockFinancialTransactions,
    mockFinancialSummary,
} from '../data/mockData';

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

const FinancialManagement = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeDateFilter, setActiveDateFilter] = useState('month');

    const filteredTransactions = mockFinancialTransactions.filter(
        (transaction) => {
            if (activeFilter === 'income' && transaction.type !== 'income') {
                return false;
            }
            if (activeFilter === 'expense' && transaction.type !== 'expense') {
                return false;
            }
            return true;
        }
    );

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
                    <Button>
                        <IoAdd />
                        Add Transaction
                    </Button>
                </ButtonGroup>
            </PageHeader>

            <StatsGrid>
                <StatCard
                    title="Total Income"
                    value={mockFinancialSummary.income}
                    icon={IoWalletOutline}
                    trend={mockFinancialSummary.incomeTrend}
                    trendLabel="from last month"
                    color="#1E8E3E"
                />
                <StatCard
                    title="Total Expenses"
                    value={mockFinancialSummary.expenses}
                    icon={IoWalletOutline}
                    trend={mockFinancialSummary.expensesTrend}
                    trendLabel="from last month"
                    color="#D92D20"
                />
                <StatCard
                    title="Net Profit"
                    value={mockFinancialSummary.profit}
                    icon={IoWalletOutline}
                    trend={mockFinancialSummary.profitTrend}
                    trendLabel="from last month"
                    color="#6941C6"
                />
                <StatCard
                    title="Balance"
                    value={mockFinancialSummary.balance}
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
                            {filteredTransactions.map((transaction, index) => (
                                <TableRow key={index}>
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
                                        <ActionButton title="Delete">
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
        </PageContainer>
    );
};

export default FinancialManagement;
