'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
    IoAdd,
    IoSearch,
    IoTrashOutline,
    IoPencil,
    IoWarning,
    IoInformationCircle,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockMachineryData } from '../data/mockData';

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

const CategoryTabs = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing[1]};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    overflow-x: auto;
    padding-bottom: ${(props) => props.theme.spacing[1]};

    &::-webkit-scrollbar {
        height: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.border};
        border-radius: ${(props) => props.theme.borderRadius.full};
    }
`;

const CategoryTab = styled.button`
    padding: ${(props) => props.theme.spacing[2]}
        ${(props) => props.theme.spacing[4]};
    background-color: ${(props) =>
        props.isActive ? props.theme.colors.primary : 'transparent'};
    color: ${(props) => (props.isActive ? 'white' : props.theme.colors.text)};
    border: none;
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => (props.isActive ? '500' : '400')};
    cursor: pointer;
    white-space: nowrap;

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
    white-space: nowrap;
`;

const Status = styled.span`
    display: inline-flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing[1]}
        ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.full};
    font-size: ${(props) => props.theme.fontSizes.xs};
    font-weight: 500;
    gap: ${(props) => props.theme.spacing[1]};

    ${(props) => {
        switch (props.status) {
            case 'operational':
                return `
          background-color: ${props.theme.colors.success}15;
          color: ${props.theme.colors.success};
        `;
            case 'maintenance':
                return `
          background-color: ${props.theme.colors.warning}15;
          color: ${props.theme.colors.warning};
        `;
            case 'broken':
                return `
          background-color: ${props.theme.colors.danger}15;
          color: ${props.theme.colors.danger};
        `;
            default:
                return '';
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

const InventoryManagement = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', label: 'All Machinery' },
        { id: 'land-preparation', label: 'Land Preparation' },
        { id: 'planting', label: 'Planting' },
        { id: 'irrigation', label: 'Irrigation' },
        { id: 'crop-maintenance', label: 'Crop Maintenance' },
        { id: 'harvesting', label: 'Harvesting' },
        { id: 'post-harvest', label: 'Post-Harvest' },
        { id: 'livestock', label: 'Livestock' },
        { id: 'tractors', label: 'Tractors & Attachments' },
    ];

    const filteredMachinery = mockMachineryData.filter((item) => {
        // Filter by search term
        if (
            searchTerm &&
            !item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }

        // Filter by category
        if (activeCategory !== 'all' && item.category !== activeCategory) {
            return false;
        }

        return true;
    });

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Inventory Management</PageTitle>

                <SearchContainer>
                    <SearchIcon>
                        <IoSearch />
                    </SearchIcon>
                    <SearchInput
                        type="text"
                        placeholder="Search machinery..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <Button>
                    <IoAdd />
                    Add New Machinery
                </Button>
            </PageHeader>

            <CategoryTabs>
                {categories.map((category) => (
                    <CategoryTab
                        key={category.id}
                        isActive={activeCategory === category.id}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.label}
                    </CategoryTab>
                ))}
            </CategoryTabs>

            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Last Maintenance</TableHeader>
                                <TableHeader>Next Maintenance</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {filteredMachinery.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.categoryLabel}</TableCell>
                                    <TableCell>
                                        <Status status={item.status}>
                                            {item.status === 'operational' && (
                                                <IoInformationCircle />
                                            )}
                                            {item.status === 'maintenance' && (
                                                <IoWarning />
                                            )}
                                            {item.status === 'broken' && (
                                                <IoWarning />
                                            )}
                                            {item.status === 'operational' &&
                                                'Operational'}
                                            {item.status === 'maintenance' &&
                                                'Scheduled Maintenance'}
                                            {item.status === 'broken' &&
                                                'Needs Repair'}
                                        </Status>
                                    </TableCell>
                                    <TableCell>
                                        {item.lastMaintenance}
                                    </TableCell>
                                    <TableCell>
                                        {item.nextMaintenance}
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
                            {filteredMachinery.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        style={{ textAlign: 'center' }}
                                    >
                                        No machinery found.
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

export default InventoryManagement;
