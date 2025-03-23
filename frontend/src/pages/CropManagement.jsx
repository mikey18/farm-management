'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    IoAdd,
    IoSearch,
    IoTrashOutline,
    IoPencil,
    IoCalendarOutline,
    IoLeafOutline,
    IoClose,
    IoCheckmark,
    IoWaterOutline,
    IoSunnyOutline,
    IoThermometerOutline,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    selectFilteredCrops,
    addCrop,
    deleteCrop,
    updateCrop,
    updateGrowthProgress,
    calculateHarvestDate as calculateExpectedHarvestDate,
} from '../store/cropSlice';

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

const CropGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${(props) => props.theme.spacing[4]};

    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CropCard = styled.div`
    background-color: ${(props) => props.theme.colors.cardBg};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    border: 1px solid ${(props) => props.theme.colors.border};
    overflow: hidden;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${(props) => props.theme.shadows.md};
    }
`;

const CropImageContainer = styled.div`
    height: 160px;
    background-color: ${(props) => `${props.theme.colors.primary}10`};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 64px;
        color: ${(props) => props.theme.colors.primary};
    }
`;

const CropDetails = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
`;

const CropName = styled.h3`
    margin: 0 0 ${(props) => props.theme.spacing[2]};
    font-size: ${(props) => props.theme.fontSizes.xl};
`;

const CropInfo = styled.div`
    margin-bottom: ${(props) => props.theme.spacing[3]};
`;

const CropInfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
    margin-bottom: ${(props) => props.theme.spacing[2]};
    color: ${(props) => props.theme.colors.textLight};
    font-size: ${(props) => props.theme.fontSizes.sm};

    svg {
        color: ${(props) => props.theme.colors.primary};
    }
`;

const CropProgress = styled.div`
    margin-top: ${(props) => props.theme.spacing[4]};
`;

const ProgressLabel = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: ${(props) => props.theme.fontSizes.xs};
    margin-bottom: ${(props) => props.theme.spacing[1]};
`;

const ProgressText = styled.span`
    color: ${(props) => props.theme.colors.textLight};
`;

const ProgressValue = styled.span`
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
`;

const ProgressBar = styled.div`
    height: 8px;
    width: 100%;
    background-color: ${(props) => `${props.theme.colors.primary}20`};
    border-radius: ${(props) => props.theme.borderRadius.full};
    overflow: hidden;
`;

const ProgressFill = styled.div`
    height: 100%;
    width: ${(props) => `${props.progress}%`};
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: ${(props) => props.theme.borderRadius.full};
`;

const CropActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${(props) => props.theme.spacing[2]};
    margin-top: ${(props) => props.theme.spacing[4]};
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

const RequirementSection = styled.div`
    margin-top: ${(props) => props.theme.spacing[4]};
    margin-bottom: ${(props) => props.theme.spacing[4]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    padding: ${(props) => props.theme.spacing[3]};
`;

const RequirementTitle = styled.h3`
    font-size: ${(props) => props.theme.fontSizes.md};
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing[3]};
    color: ${(props) => props.theme.colors.text};
`;

const RequirementGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${(props) => props.theme.spacing[3]};

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`;

const RequirementItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[1]};
`;

const RequirementIcon = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes.sm};

    svg {
        font-size: 18px;
    }
`;

const CropManagement = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCropId, setEditingCropId] = useState(null);
    const [newCrop, setNewCrop] = useState({
        name: '',
        variety: '',
        plantingDate: new Date().toISOString().split('T')[0],
        expectedHarvestDate: '',
        fieldLocation: '',
        seedSource: '',
        notes: '',
        waterRequirement: 'medium',
        sunlightRequirement: 'full',
        temperatureRange: 'moderate',
    });

    // Get crops from Redux store
    const filteredCrops = useSelector((state) =>
        selectFilteredCrops(state, searchTerm)
    );

    // Update growth progress periodically
    useEffect(() => {
        // Update progress when component mounts
        dispatch(updateGrowthProgress());

        // Set up interval to update progress every hour
        const intervalId = setInterval(() => {
            dispatch(updateGrowthProgress());
        }, 3600000); // 1 hour in milliseconds

        // Clean up interval on unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    // Crop varieties for the dropdown
    const cropTypes = [
        'Corn',
        'Wheat',
        'Rice',
        'Soybeans',
        'Barley',
        'Oats',
        'Potatoes',
        'Tomatoes',
        'Lettuce',
        'Carrots',
        'Onions',
        'Peppers',
        'Cucumbers',
        'Strawberries',
        'Blueberries',
        'Apples',
        'Grapes',
        'Cotton',
        'Sugarcane',
        'Other',
    ];

    const handleOpenModal = (crop = null) => {
        if (crop) {
            // Edit mode - populate form with crop data
            setNewCrop({
                ...crop,
            });
            setEditingCropId(crop.id);
        } else {
            // Add mode - reset form
            setNewCrop({
                name: '',
                variety: '',
                plantingDate: new Date().toISOString().split('T')[0],
                expectedHarvestDate: '',
                fieldLocation: '',
                seedSource: '',
                notes: '',
                waterRequirement: 'medium',
                sunlightRequirement: 'full',
                temperatureRange: 'moderate',
            });
            setEditingCropId(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCropId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewCrop((prev) => {
            const updatedCrop = {
                ...prev,
                [name]: value,
            };

            // Auto-calculate harvest date when variety or planting date changes
            if (
                (name === 'variety' || name === 'plantingDate') &&
                updatedCrop.variety &&
                updatedCrop.plantingDate
            ) {
                const calculatedHarvestDate = calculateExpectedHarvestDate(
                    updatedCrop.plantingDate,
                    updatedCrop.variety
                );

                if (calculatedHarvestDate) {
                    updatedCrop.expectedHarvestDate = calculatedHarvestDate;
                }
            }

            return updatedCrop;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCropId) {
            // Update existing crop
            dispatch(
                updateCrop({
                    id: editingCropId,
                    ...newCrop,
                })
            );
        } else {
            // Add new crop
            dispatch(addCrop(newCrop));
        }

        // Close the modal after submission
        handleCloseModal();
    };

    const handleDeleteCrop = (id) => {
        dispatch(deleteCrop(id));
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Crop Management</PageTitle>

                <SearchContainer>
                    <SearchIcon>
                        <IoSearch />
                    </SearchIcon>
                    <SearchInput
                        type="text"
                        placeholder="Search crops..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <Button onClick={() => handleOpenModal()}>
                    <IoAdd />
                    Add New Crop
                </Button>
            </PageHeader>

            <CropGrid>
                {filteredCrops.map((crop) => (
                    <CropCard key={crop.id}>
                        <CropImageContainer>
                            <IoLeafOutline />
                        </CropImageContainer>
                        <CropDetails>
                            <CropName>{crop.name}</CropName>

                            <CropInfo>
                                <CropInfoItem>
                                    <IoCalendarOutline />
                                    Planted: {crop.plantingDate}
                                </CropInfoItem>
                                <CropInfoItem>
                                    <IoCalendarOutline />
                                    Expected Harvest: {crop.expectedHarvestDate}
                                </CropInfoItem>
                            </CropInfo>

                            <CropProgress>
                                <ProgressLabel>
                                    <ProgressText>Growth Progress</ProgressText>
                                    <ProgressValue>
                                        {crop.progress}%
                                    </ProgressValue>
                                </ProgressLabel>
                                <ProgressBar>
                                    <ProgressFill progress={crop.progress} />
                                </ProgressBar>
                            </CropProgress>

                            <CropActions>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOpenModal(crop)}
                                >
                                    <IoPencil />
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteCrop(crop.id)}
                                >
                                    <IoTrashOutline />
                                </Button>
                            </CropActions>
                        </CropDetails>
                    </CropCard>
                ))}

                {filteredCrops.length === 0 && (
                    <Card style={{ gridColumn: '1 / -1' }}>
                        <div style={{ textAlign: 'center', padding: '16px' }}>
                            No crops found.
                        </div>
                    </Card>
                )}
            </CropGrid>

            {/* Add/Edit Crop Modal */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>
                                {editingCropId ? 'Edit Crop' : 'Add New Crop'}
                            </ModalTitle>
                            <ModalCloseButton onClick={handleCloseModal}>
                                <IoClose size={24} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormRow>
                                    <FormGroup>
                                        <FormLabel htmlFor="variety">
                                            Crop Type
                                        </FormLabel>
                                        <FormSelect
                                            id="variety"
                                            name="variety"
                                            value={newCrop.variety}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">
                                                Select a crop type
                                            </option>
                                            {cropTypes.map((crop) => (
                                                <option key={crop} value={crop}>
                                                    {crop}
                                                </option>
                                            ))}
                                        </FormSelect>
                                    </FormGroup>

                                    <FormGroup>
                                        <FormLabel htmlFor="name">
                                            Crop Name/Identifier
                                        </FormLabel>
                                        <FormInput
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={newCrop.name}
                                            onChange={handleInputChange}
                                            placeholder="E.g., North Field Corn"
                                            required
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <FormLabel htmlFor="plantingDate">
                                            Planting Date
                                        </FormLabel>
                                        <FormInput
                                            type="date"
                                            id="plantingDate"
                                            name="plantingDate"
                                            value={newCrop.plantingDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <FormLabel htmlFor="expectedHarvestDate">
                                            Expected Harvest Date
                                        </FormLabel>
                                        <FormInput
                                            type="date"
                                            id="expectedHarvestDate"
                                            name="expectedHarvestDate"
                                            value={newCrop.expectedHarvestDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <FormLabel htmlFor="fieldLocation">
                                        Field Location
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        id="fieldLocation"
                                        name="fieldLocation"
                                        value={newCrop.fieldLocation}
                                        onChange={handleInputChange}
                                        placeholder="E.g., North Field, Section 3"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="seedSource">
                                        Seed Source
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        id="seedSource"
                                        name="seedSource"
                                        value={newCrop.seedSource}
                                        onChange={handleInputChange}
                                        placeholder="E.g., Local Co-op, Saved Seeds"
                                    />
                                </FormGroup>

                                <RequirementSection>
                                    <RequirementTitle>
                                        Growing Requirements
                                    </RequirementTitle>
                                    <RequirementGrid>
                                        <RequirementItem>
                                            <RequirementIcon>
                                                <IoWaterOutline />
                                                Water
                                            </RequirementIcon>
                                            <FormSelect
                                                id="waterRequirement"
                                                name="waterRequirement"
                                                value={newCrop.waterRequirement}
                                                onChange={handleInputChange}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">
                                                    Medium
                                                </option>
                                                <option value="high">
                                                    High
                                                </option>
                                            </FormSelect>
                                        </RequirementItem>

                                        <RequirementItem>
                                            <RequirementIcon>
                                                <IoSunnyOutline />
                                                Sunlight
                                            </RequirementIcon>
                                            <FormSelect
                                                id="sunlightRequirement"
                                                name="sunlightRequirement"
                                                value={
                                                    newCrop.sunlightRequirement
                                                }
                                                onChange={handleInputChange}
                                            >
                                                <option value="full">
                                                    Full Sun
                                                </option>
                                                <option value="partial">
                                                    Partial Sun
                                                </option>
                                                <option value="shade">
                                                    Shade
                                                </option>
                                            </FormSelect>
                                        </RequirementItem>

                                        <RequirementItem>
                                            <RequirementIcon>
                                                <IoThermometerOutline />
                                                Temperature
                                            </RequirementIcon>
                                            <FormSelect
                                                id="temperatureRange"
                                                name="temperatureRange"
                                                value={newCrop.temperatureRange}
                                                onChange={handleInputChange}
                                            >
                                                <option value="cool">
                                                    Cool
                                                </option>
                                                <option value="moderate">
                                                    Moderate
                                                </option>
                                                <option value="warm">
                                                    Warm
                                                </option>
                                            </FormSelect>
                                        </RequirementItem>
                                    </RequirementGrid>
                                </RequirementSection>

                                <FormGroup>
                                    <FormLabel htmlFor="notes">Notes</FormLabel>
                                    <FormTextarea
                                        id="notes"
                                        name="notes"
                                        value={newCrop.notes}
                                        onChange={handleInputChange}
                                        placeholder="Additional notes about this crop..."
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
                                    {editingCropId ? 'Update Crop' : 'Add Crop'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default CropManagement;
