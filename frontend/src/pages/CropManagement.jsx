'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
    IoAdd,
    IoSearch,
    IoTrashOutline,
    IoPencil,
    IoCalendarOutline,
    IoLeafOutline,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockCropData } from '../data/mockData';

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

const CropManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCrops = mockCropData.filter((crop) => {
        if (
            searchTerm &&
            !crop.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }
        return true;
    });

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

                <Button>
                    <IoAdd />
                    Add New Crop
                </Button>
            </PageHeader>

            <CropGrid>
                {filteredCrops.map((crop, index) => {
                    // Calculate progress percentage
                    const progress = Math.floor(Math.random() * 101);

                    return (
                        <CropCard key={index}>
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
                                        Expected Harvest:{' '}
                                        {crop.expectedHarvestDate}
                                    </CropInfoItem>
                                </CropInfo>

                                <CropProgress>
                                    <ProgressLabel>
                                        <ProgressText>
                                            Growth Progress
                                        </ProgressText>
                                        <ProgressValue>
                                            {progress}%
                                        </ProgressValue>
                                    </ProgressLabel>
                                    <ProgressBar>
                                        <ProgressFill progress={progress} />
                                    </ProgressBar>
                                </CropProgress>

                                <CropActions>
                                    <Button variant="outline" size="sm">
                                        <IoPencil />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <IoTrashOutline />
                                    </Button>
                                </CropActions>
                            </CropDetails>
                        </CropCard>
                    );
                })}

                {filteredCrops.length === 0 && (
                    <Card style={{ gridColumn: '1 / -1' }}>
                        <div style={{ textAlign: 'center', padding: '16px' }}>
                            No crops found.
                        </div>
                    </Card>
                )}
            </CropGrid>
        </PageContainer>
    );
};

export default CropManagement;
