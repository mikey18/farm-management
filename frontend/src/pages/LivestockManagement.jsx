'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
    IoAdd,
    IoSearch,
    IoTrashOutline,
    IoPencil,
    IoChevronDown,
    IoChevronUp,
    IoFishOutline,
    IoCalendarOutline,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { mockLivestockData, mockLivestockStats } from '../data/mockData';

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

const SearchContainer = styled.div`
    position: relative;
    flex: 1;
    max-width: 400px;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        order: 3;
        max-width: 100%;
        width: 100%;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]}
        ${(props) => props.theme.spacing[2]}
        ${(props) => props.theme.spacing[2]}
        ${(props) => props.theme.spacing[8]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: ${(props) => props.theme.spacing[2]};
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
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

const TabContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
    overflow-x: auto;
    padding-bottom: ${(props) => props.theme.spacing[2]};

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.border};
        border-radius: ${(props) => props.theme.borderRadius.full};
    }
`;

const Tab = styled.button`
    padding: ${(props) => props.theme.spacing[2]}
        ${(props) => props.theme.spacing[4]};
    background-color: ${(props) =>
        props.isActive
            ? props.theme.colors.primary
            : props.theme.colors.cardBg};
    color: ${(props) => (props.isActive ? 'white' : props.theme.colors.text)};
    border: 1px solid
        ${(props) =>
            props.isActive
                ? props.theme.colors.primary
                : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
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

const Badge = styled.span`
    display: inline-block;
    padding: ${(props) => props.theme.spacing[1]}
        ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.full};
    font-size: ${(props) => props.theme.fontSizes.xs};
    font-weight: 500;

    ${(props) => {
        switch (props.type) {
            case 'success':
                return `
          background-color: ${props.theme.colors.success}15;
          color: ${props.theme.colors.success};
        `;
            case 'warning':
                return `
          background-color: ${props.theme.colors.warning}15;
          color: ${props.theme.colors.warning};
        `;
            case 'danger':
                return `
          background-color: ${props.theme.colors.danger}15;
          color: ${props.theme.colors.danger};
        `;
            case 'info':
            default:
                return `
          background-color: ${props.theme.colors.info}15;
          color: ${props.theme.colors.info};
        `;
        }
    }}
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

const ActionContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[1]};
`;

const SortButton = styled.button`
    background: transparent;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[1]};
    color: ${(props) => props.theme.colors.textLight};
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.text};
    }
`;

const LivestockManagement = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const tabs = [
        { id: 'all', label: 'All Livestock' },
        { id: 'poultry', label: 'Poultry' },
        { id: 'goats', label: 'Goats' },
        { id: 'cows', label: 'Cows' },
        { id: 'other', label: 'Other' },
    ];

    const sortedLivestock = [...mockLivestockData]
        .filter((animal) => {
            // Filter by search term
            if (
                searchTerm &&
                !animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return false;
            }

            // Filter by type
            if (activeTab !== 'all' && animal.type !== activeTab) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (sortDirection === 'asc') {
                return (
                    new Date(a.birthDate).getTime() -
                    new Date(b.birthDate).getTime()
                );
            } else {
                return (
                    new Date(b.birthDate).getTime() -
                    new Date(a.birthDate).getTime()
                );
            }
        });

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Livestock Management</PageTitle>

                <SearchContainer>
                    <SearchIcon>
                        <IoSearch />
                    </SearchIcon>
                    <SearchInput
                        type="text"
                        placeholder="Search by tag or breed..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <Button>
                    <IoAdd />
                    Add New Livestock
                </Button>
            </PageHeader>

            <StatsGrid>
                <StatCard
                    title="Total Livestock"
                    value={mockLivestockStats.total}
                    icon={IoFishOutline}
                    trend={mockLivestockStats.totalTrend}
                    trendLabel="from last month"
                    color="#6941C6"
                />
                <StatCard
                    title="Poultry"
                    value={mockLivestockStats.poultry}
                    icon={IoFishOutline}
                    trend={mockLivestockStats.poultryTrend}
                    trendLabel="from last month"
                    color="#E67700"
                />
                <StatCard
                    title="Goats"
                    value={mockLivestockStats.goats}
                    icon={IoFishOutline}
                    trend={mockLivestockStats.goatsTrend}
                    trendLabel="from last month"
                    color="#1E8E3E"
                />
                <StatCard
                    title="Cows"
                    value={mockLivestockStats.cows}
                    icon={IoFishOutline}
                    trend={mockLivestockStats.cowsTrend}
                    trendLabel="from last month"
                    color="#3B82F6"
                />
            </StatsGrid>

            <TabContainer>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabContainer>

            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <tr>
                                <TableHeader>Tag ID</TableHeader>
                                <TableHeader>Type</TableHeader>
                                <TableHeader>Breed</TableHeader>
                                <TableHeader>
                                    <SortButton
                                        onClick={() =>
                                            setSortDirection((prev) =>
                                                prev === 'asc' ? 'desc' : 'asc'
                                            )
                                        }
                                    >
                                        Birth Date
                                        {sortDirection === 'asc' ? (
                                            <IoChevronUp />
                                        ) : (
                                            <IoChevronDown />
                                        )}
                                    </SortButton>
                                </TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {sortedLivestock.map((animal, index) => (
                                <TableRow key={index}>
                                    <TableCell>{animal.tag}</TableCell>
                                    <TableCell>{animal.typeName}</TableCell>
                                    <TableCell>{animal.breed}</TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                        >
                                            <IoCalendarOutline size={14} />
                                            {animal.birthDate}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            type={
                                                animal.status === 'healthy'
                                                    ? 'success'
                                                    : animal.status === 'sick'
                                                      ? 'danger'
                                                      : animal.status ===
                                                          'pregnant'
                                                        ? 'info'
                                                        : 'warning'
                                            }
                                        >
                                            {animal.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                animal.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <ActionContainer>
                                            <ActionButton title="Edit">
                                                <IoPencil />
                                            </ActionButton>
                                            <ActionButton title="Delete">
                                                <IoTrashOutline />
                                            </ActionButton>
                                        </ActionContainer>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {sortedLivestock.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        style={{ textAlign: 'center' }}
                                    >
                                        No livestock found.
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

export default LivestockManagement;
