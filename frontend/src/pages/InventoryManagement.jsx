'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    IoAdd,
    IoSearch,
    IoTrashOutline,
    IoPencil,
    IoWarning,
    IoInformationCircle,
    IoClose,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    selectFilteredMachinery,
    addMachinery,
    updateMachinery,
    deleteMachinery,
    updateMaintenanceStatuses,
    getCategoryLabel,
} from '../store/inventorySlice';

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
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: ${(props) => props.theme.borderRadius.lg};
    width: 100%;
    max-width: 600px;
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

const FormTextarea = styled.textarea`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;
    min-height: 100px;
    resize: vertical;

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
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

const InventoryManagement = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMachineryId, setEditingMachineryId] = useState(null);
    const [newMachinery, setNewMachinery] = useState({
        name: '',
        category: '',
        status: 'operational',
        purchaseDate: '',
        lastMaintenance: '',
        nextMaintenance: '',
        notes: '',
    });

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

    // Get machinery from Redux store
    const filteredMachinery = useSelector((state) =>
        selectFilteredMachinery(state, activeCategory, searchTerm, categories)
    );

    // Update maintenance statuses periodically
    useEffect(() => {
        // Update statuses when component mounts
        dispatch(updateMaintenanceStatuses());

        // Set up interval to update statuses daily
        const intervalId = setInterval(() => {
            dispatch(updateMaintenanceStatuses());
        }, 86400000); // 24 hours in milliseconds

        // Clean up interval on unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleOpenModal = (machinery = null) => {
        if (machinery) {
            // Edit mode - populate form with machinery data
            setNewMachinery({
                ...machinery,
            });
            setEditingMachineryId(machinery.id);
        } else {
            // Add mode - reset form
            setNewMachinery({
                name: '',
                category: '',
                status: 'operational',
                purchaseDate: '',
                lastMaintenance: '',
                nextMaintenance: '',
                notes: '',
            });
            setEditingMachineryId(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMachineryId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMachinery((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingMachineryId) {
            // Update existing machinery
            dispatch(
                updateMachinery({
                    id: editingMachineryId,
                    ...newMachinery,
                })
            );
        } else {
            // Add new machinery
            dispatch(
                addMachinery({
                    ...newMachinery,
                    // Add categoryLabel for display
                    categoryLabel: getCategoryLabel(
                        newMachinery.category,
                        categories
                    ),
                })
            );
        }

        // Close the modal after submission
        handleCloseModal();
    };

    const handleDeleteMachinery = (id) => {
        dispatch(deleteMachinery(id));
    };

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

                <Button onClick={() => handleOpenModal()}>
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
                {filteredMachinery.length > 0 ? (
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
                                {filteredMachinery.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            {item.categoryLabel}
                                        </TableCell>
                                        <TableCell>
                                            <Status status={item.status}>
                                                {item.status ===
                                                    'operational' && (
                                                    <IoInformationCircle />
                                                )}
                                                {item.status ===
                                                    'maintenance' && (
                                                    <IoWarning />
                                                )}
                                                {item.status === 'broken' && (
                                                    <IoWarning />
                                                )}
                                                {item.status ===
                                                    'operational' &&
                                                    'Operational'}
                                                {item.status ===
                                                    'maintenance' &&
                                                    'Scheduled Maintenance'}
                                                {item.status === 'broken' &&
                                                    'Needs Repair'}
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {item.lastMaintenance || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {item.nextMaintenance || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <ActionContainer>
                                                <ActionButton
                                                    title="Edit"
                                                    onClick={() =>
                                                        handleOpenModal(item)
                                                    }
                                                >
                                                    <IoPencil />
                                                </ActionButton>
                                                <ActionButton
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDeleteMachinery(
                                                            item.id
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
                        <h3>No machinery found</h3>
                        <p>
                            {searchTerm || activeCategory !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'Add your first machinery item to get started'}
                        </p>
                        {!searchTerm && activeCategory === 'all' && (
                            <Button onClick={() => handleOpenModal()}>
                                <IoAdd />
                                Add New Machinery
                            </Button>
                        )}
                    </EmptyState>
                )}
            </Card>

            {/* Add/Edit Machinery Modal */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>
                                {editingMachineryId
                                    ? 'Edit Machinery'
                                    : 'Add New Machinery'}
                            </ModalTitle>
                            <ModalCloseButton onClick={handleCloseModal}>
                                <IoClose size={24} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormGroup>
                                    <FormLabel htmlFor="name">
                                        Machinery Name
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newMachinery.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="category">
                                        Category
                                    </FormLabel>
                                    <FormSelect
                                        id="category"
                                        name="category"
                                        value={newMachinery.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {categories
                                            .filter((cat) => cat.id !== 'all')
                                            .map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.label}
                                                </option>
                                            ))}
                                    </FormSelect>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="status">
                                        Status
                                    </FormLabel>
                                    <FormSelect
                                        id="status"
                                        name="status"
                                        value={newMachinery.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="operational">
                                            Operational
                                        </option>
                                        <option value="maintenance">
                                            Scheduled Maintenance
                                        </option>
                                        <option value="broken">
                                            Needs Repair
                                        </option>
                                    </FormSelect>
                                </FormGroup>

                                <FormRow>
                                    <FormGroup>
                                        <FormLabel htmlFor="purchaseDate">
                                            Purchase Date
                                        </FormLabel>
                                        <FormInput
                                            type="date"
                                            id="purchaseDate"
                                            name="purchaseDate"
                                            value={newMachinery.purchaseDate}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <FormLabel htmlFor="lastMaintenance">
                                            Last Maintenance
                                        </FormLabel>
                                        <FormInput
                                            type="date"
                                            id="lastMaintenance"
                                            name="lastMaintenance"
                                            value={newMachinery.lastMaintenance}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <FormLabel htmlFor="nextMaintenance">
                                        Next Maintenance
                                    </FormLabel>
                                    <FormInput
                                        type="date"
                                        id="nextMaintenance"
                                        name="nextMaintenance"
                                        value={newMachinery.nextMaintenance}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="notes">Notes</FormLabel>
                                    <FormTextarea
                                        id="notes"
                                        name="notes"
                                        value={newMachinery.notes}
                                        onChange={handleInputChange}
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
                                    {editingMachineryId
                                        ? 'Update Machinery'
                                        : 'Add Machinery'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default InventoryManagement;
