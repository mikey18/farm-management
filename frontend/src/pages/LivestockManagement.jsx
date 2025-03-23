'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    IoClose,
    IoCheckmark,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import {
    selectFilteredLivestock,
    selectLivestockStats,
    addLivestock,
    updateLivestock,
    deleteLivestock,
} from '../store/livestockSlice';

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

const EmptyState = styled.div`
    text-align: center;
    padding: ${(props) => props.theme.spacing[8]};
    color: ${(props) => props.theme.colors.textLight};

    h3 {
        margin-bottom: ${(props) => props.theme.spacing[2]};
        font-weight: 500;
    }

    p {
        margin-bottom: ${(props) => props.theme.spacing[4]};
    }
`;

const LivestockManagement = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLivestockId, setEditingLivestockId] = useState(null);
    const [newLivestock, setNewLivestock] = useState({
        tag: '',
        type: '',
        breed: '',
        birthDate: '',
        status: 'healthy',
        notes: '',
    });

    // Get data from Redux store
    const filteredLivestock = useSelector((state) =>
        selectFilteredLivestock(state, activeTab, searchTerm)
    );
    const livestockStats = useSelector(selectLivestockStats);

    // Sort the filtered livestock
    const sortedLivestock = [...filteredLivestock].sort((a, b) => {
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

    const tabs = [
        { id: 'all', label: 'All Livestock' },
        { id: 'poultry', label: 'Poultry' },
        { id: 'goats', label: 'Goats' },
        { id: 'cows', label: 'Cows' },
        { id: 'sheep', label: 'Sheep' },
        { id: 'pigs', label: 'Pigs' },
        { id: 'horses', label: 'Horses' },
        { id: 'other', label: 'Other' },
    ];

    const handleOpenModal = (livestock = null) => {
        if (livestock) {
            // Edit mode - populate form with livestock data
            setNewLivestock({
                ...livestock,
            });
            setEditingLivestockId(livestock.id);
        } else {
            // Add mode - reset form
            setNewLivestock({
                tag: '',
                type: '',
                breed: '',
                birthDate: new Date().toISOString().split('T')[0],
                status: 'healthy',
                notes: '',
            });
            setEditingLivestockId(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLivestockId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLivestock((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingLivestockId) {
            // Update existing livestock
            dispatch(
                updateLivestock({
                    id: editingLivestockId,
                    ...newLivestock,
                })
            );
        } else {
            // Add new livestock
            dispatch(addLivestock(newLivestock));
        }

        // Close the modal after submission
        handleCloseModal();
    };

    const handleDeleteLivestock = (id) => {
        dispatch(deleteLivestock(id));
    };

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

                <Button onClick={() => handleOpenModal()}>
                    <IoAdd />
                    Add New Livestock
                </Button>
            </PageHeader>

            <StatsGrid>
                <StatCard
                    title="Total Livestock"
                    value={livestockStats.total}
                    icon={IoFishOutline}
                    trend={livestockStats.totalTrend}
                    trendLabel="from last month"
                    color="#6941C6"
                />
                <StatCard
                    title="Poultry"
                    value={livestockStats.poultry}
                    icon={IoFishOutline}
                    trend={livestockStats.poultryTrend}
                    trendLabel="from last month"
                    color="#E67700"
                />
                <StatCard
                    title="Goats"
                    value={livestockStats.goats}
                    icon={IoFishOutline}
                    trend={livestockStats.goatsTrend}
                    trendLabel="from last month"
                    color="#1E8E3E"
                />
                <StatCard
                    title="Cows"
                    value={livestockStats.cows}
                    icon={IoFishOutline}
                    trend={livestockStats.cowsTrend}
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
                {sortedLivestock.length > 0 ? (
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
                                                    prev === 'asc'
                                                        ? 'desc'
                                                        : 'asc'
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
                                {sortedLivestock.map((animal) => (
                                    <TableRow key={animal.id}>
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
                                                        : animal.status ===
                                                            'sick'
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
                                                <ActionButton
                                                    title="Edit"
                                                    onClick={() =>
                                                        handleOpenModal(animal)
                                                    }
                                                >
                                                    <IoPencil />
                                                </ActionButton>
                                                <ActionButton
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDeleteLivestock(
                                                            animal.id
                                                        )
                                                    }
                                                >
                                                    <IoTrashOutline />
                                                </ActionButton>
                                            </ActionContainer>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <EmptyState>
                        <h3>No livestock found</h3>
                        <p>
                            {searchTerm || activeTab !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'Add your first livestock to get started'}
                        </p>
                        {!searchTerm && activeTab === 'all' && (
                            <Button onClick={() => handleOpenModal()}>
                                <IoAdd />
                                Add New Livestock
                            </Button>
                        )}
                    </EmptyState>
                )}
            </Card>

            {/* Add/Edit Livestock Modal */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>
                                {editingLivestockId
                                    ? 'Edit Livestock'
                                    : 'Add New Livestock'}
                            </ModalTitle>
                            <ModalCloseButton onClick={handleCloseModal}>
                                <IoClose size={24} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormRow>
                                    <FormGroup>
                                        <FormLabel htmlFor="tag">
                                            Tag ID
                                        </FormLabel>
                                        <FormInput
                                            type="text"
                                            id="tag"
                                            name="tag"
                                            value={newLivestock.tag}
                                            onChange={handleInputChange}
                                            placeholder="e.g., COW-001"
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <FormLabel htmlFor="type">
                                            Type
                                        </FormLabel>
                                        <FormSelect
                                            id="type"
                                            name="type"
                                            value={newLivestock.type}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">
                                                Select a type
                                            </option>
                                            {tabs
                                                .filter(
                                                    (tab) => tab.id !== 'all'
                                                )
                                                .map((tab) => (
                                                    <option
                                                        key={tab.id}
                                                        value={tab.id}
                                                    >
                                                        {tab.label}
                                                    </option>
                                                ))}
                                        </FormSelect>
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <FormLabel htmlFor="breed">Breed</FormLabel>
                                    <FormInput
                                        type="text"
                                        id="breed"
                                        name="breed"
                                        value={newLivestock.breed}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Holstein, Leghorn"
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="birthDate">
                                        Birth Date
                                    </FormLabel>
                                    <FormInput
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={newLivestock.birthDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="status">
                                        Status
                                    </FormLabel>
                                    <FormSelect
                                        id="status"
                                        name="status"
                                        value={newLivestock.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="healthy">Healthy</option>
                                        <option value="sick">Sick</option>
                                        <option value="pregnant">
                                            Pregnant
                                        </option>
                                        <option value="quarantined">
                                            Quarantined
                                        </option>
                                    </FormSelect>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="notes">Notes</FormLabel>
                                    <FormInput
                                        as="textarea"
                                        id="notes"
                                        name="notes"
                                        value={newLivestock.notes}
                                        onChange={handleInputChange}
                                        placeholder="Additional information..."
                                        style={{
                                            minHeight: '100px',
                                            resize: 'vertical',
                                        }}
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    onClick={handleCloseModal}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'inherit',
                                        border: `1px solid ${(props) => props.theme.colors.border}`,
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    <IoCheckmark />
                                    {editingLivestockId
                                        ? 'Update Livestock'
                                        : 'Add Livestock'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default LivestockManagement;
