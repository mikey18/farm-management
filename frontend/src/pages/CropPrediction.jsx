import { useState } from 'react';
import styled from 'styled-components';
import {
    IoInformationCircleOutline,
    IoLeafOutline,
    IoPlayOutline,
    IoRefreshOutline,
} from 'react-icons/io5';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockCropFactors } from '../data/mockData';
import axios from 'axios';

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

const InfoBanner = styled.div`
    background-color: ${(props) => `${props.theme.colors.info}10`};
    border: 1px solid ${(props) => `${props.theme.colors.info}30`};
    border-radius: ${(props) => props.theme.borderRadius.md};
    padding: ${(props) => props.theme.spacing[4]};
    display: flex;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[3]};
`;

const InfoIcon = styled.div`
    color: ${(props) => props.theme.colors.info};
    font-size: 24px;
    margin-top: ${(props) => props.theme.spacing[1]};
`;

const InfoContent = styled.div`
    flex: 1;
`;

const InfoTitle = styled.h3`
    margin: 0 0 ${(props) => props.theme.spacing[2]};
    color: ${(props) => props.theme.colors.info};
    font-size: ${(props) => props.theme.fontSizes.lg};
`;

const InfoText = styled.p`
    margin: 0;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSizes.sm};
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing[6]};

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: 2fr 1fr;
    }
`;

const ActionPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[4]};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[1]};
    margin-bottom: ${(props) => props.theme.spacing[3]};
`;

const FormLabel = styled.label`
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: 500;
    color: ${(props) => props.theme.colors.text};
`;

const FormSelect = styled.select`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;
    background-color: ${(props) => props.theme.colors.cardBg};

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }
`;

const FormInput = styled.input`
    width: 100%;
    padding: ${(props) => props.theme.spacing[2]};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSizes.sm};
    outline: none;
    background-color: ${(props) => props.theme.colors.cardBg};

    &:focus {
        border-color: ${(props) => props.theme.colors.primary};
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }
`;

const PredictionResults = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[4]};
`;

const PredictionCard = styled.div`
    border: 1px solid
        ${(props) =>
            props.isRecommended
                ? props.theme.colors.primary
                : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    overflow: hidden;
    position: relative;

    ${(props) =>
        props.isRecommended &&
        `
    &::before {
      content: 'Recommended';
      position: absolute;
      top: ${props.theme.spacing[2]};
      right: ${props.theme.spacing[2]};
      background-color: ${props.theme.colors.primary};
      color: white;
      padding: ${props.theme.spacing[1]} ${props.theme.spacing[2]};
      border-radius: ${props.theme.borderRadius.full};
      font-size: ${props.theme.fontSizes.xs};
      font-weight: 500;
    }
  `}
`;

const PredictionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[3]};
    padding: ${(props) => props.theme.spacing[4]};
    background-color: ${(props) => props.theme.colors.background};
`;

const CropIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => `${props.theme.colors.primary}15`};

    svg {
        color: ${(props) => props.theme.colors.primary};
        font-size: 24px;
    }
`;

const CropInfo = styled.div`
    flex: 1;
`;

const CropName = styled.h3`
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.lg};
`;

const ScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const ScoreLabel = styled.div`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors.textLight};
`;

const ScoreValue = styled.div`
    font-size: ${(props) => props.theme.fontSizes.xl};
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
`;

const PredictionContent = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
`;

const AttributeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.spacing[4]};
`;

const AttributeItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[1]};
`;

const AttributeLabel = styled.div`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors.textLight};
`;

const AttributeValue = styled.div`
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: 500;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid ${(props) => `${props.theme.colors.primary}20`};
    border-top-color: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: ${(props) => props.theme.spacing[4]};

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const CropPrediction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        soilType: 'loamy',
        pH: '6.5',
        rainfall: 'moderate',
        temperature: 'warm',
        season: 'rainy',
    });
    const [mockCropPredictions, setmockCropPredictions] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8001/predict/',
                formData
            );

            // Handle success response (e.g., setting state with results)
            setTimeout(() => {
                setmockCropPredictions(response.data);
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Crop Prediction</PageTitle>
            </PageHeader>

            <InfoBanner>
                <InfoIcon>
                    <IoInformationCircleOutline />
                </InfoIcon>
                <InfoContent>
                    <InfoTitle>Machine Learning Crop Prediction</InfoTitle>
                    <InfoText>
                        Our machine learning model analyzes soil conditions,
                        weather patterns, and historical yield data to recommend
                        the most profitable crops to plant. Enter your farm
                        parameters below to get started.
                    </InfoText>
                </InfoContent>
            </InfoBanner>

            <GridContainer>
                <PredictionResults>
                    <Card title="Crop Recommendations">
                        {isLoading && (
                            <LoadingOverlay>
                                <Spinner />
                                <div>
                                    Analyzing data and generating
                                    recommendations...
                                </div>
                            </LoadingOverlay>
                        )}

                        {mockCropPredictions ? (
                            mockCropPredictions.map((crop, index) => (
                                <PredictionCard
                                    key={index}
                                    isRecommended={crop.score > 85}
                                    style={{
                                        marginBottom:
                                            index !==
                                            mockCropPredictions.length - 1
                                                ? '16px'
                                                : 0,
                                    }}
                                >
                                    <PredictionHeader>
                                        <CropIcon>
                                            <IoLeafOutline />
                                        </CropIcon>
                                        <CropInfo>
                                            <CropName>{crop.name}</CropName>
                                        </CropInfo>
                                        <ScoreContainer>
                                            <ScoreLabel>
                                                Suitability Score
                                            </ScoreLabel>
                                            <ScoreValue>
                                                {crop.score}%
                                            </ScoreValue>
                                        </ScoreContainer>
                                    </PredictionHeader>
                                    <PredictionContent>
                                        <AttributeGrid>
                                            <AttributeItem>
                                                <AttributeLabel>
                                                    Estimated Yield
                                                </AttributeLabel>
                                                <AttributeValue>
                                                    {crop.estimatedYield}
                                                </AttributeValue>
                                            </AttributeItem>
                                            <AttributeItem>
                                                <AttributeLabel>
                                                    Growing Period
                                                </AttributeLabel>
                                                <AttributeValue>
                                                    {crop.growingPeriod}
                                                </AttributeValue>
                                            </AttributeItem>
                                            <AttributeItem>
                                                <AttributeLabel>
                                                    Water Requirement
                                                </AttributeLabel>
                                                <AttributeValue>
                                                    {crop.waterRequirement}
                                                </AttributeValue>
                                            </AttributeItem>
                                            <AttributeItem>
                                                <AttributeLabel>
                                                    Profit Potential
                                                </AttributeLabel>
                                                <AttributeValue>
                                                    {crop.profitPotential}
                                                </AttributeValue>
                                            </AttributeItem>
                                        </AttributeGrid>
                                    </PredictionContent>
                                </PredictionCard>
                            ))
                        ) : (
                            <p>No data yet</p>
                        )}
                    </Card>
                </PredictionResults>

                <ActionPanel>
                    <Card title="Farm Parameters">
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="soilType">
                                    Soil Type
                                </FormLabel>
                                <FormSelect
                                    id="soilType"
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleInputChange}
                                >
                                    <option value="sandy">Sandy</option>
                                    <option value="loamy">Loamy</option>
                                    <option value="clayey">Clayey</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="pH">Soil pH</FormLabel>
                                <FormInput
                                    id="pH"
                                    name="pH"
                                    type="text"
                                    value={formData.pH}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="rainfall">
                                    Rainfall
                                </FormLabel>
                                <FormSelect
                                    id="rainfall"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleInputChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="temperature">
                                    Temperature
                                </FormLabel>
                                <FormSelect
                                    id="temperature"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleInputChange}
                                >
                                    <option value="cool">Cool</option>
                                    <option value="warm">Warm</option>
                                    <option value="hot">Hot</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="season">
                                    Planting Season
                                </FormLabel>
                                <FormSelect
                                    id="season"
                                    name="season"
                                    value={formData.season}
                                    onChange={handleInputChange}
                                >
                                    <option value="dry">Dry Season</option>
                                    <option value="rainy">Rainy Season</option>
                                </FormSelect>
                            </FormGroup>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>Running Analysis</>
                                    ) : (
                                        <>
                                            <IoPlayOutline />
                                            Run Prediction
                                        </>
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={() => {
                                        setFormData({
                                            soilType: 'loamy',
                                            pH: '6.5',
                                            rainfall: 'moderate',
                                            temperature: 'warm',
                                            season: 'rainy',
                                        });
                                    }}
                                >
                                    <IoRefreshOutline />
                                </Button>
                            </div>
                        </form>
                    </Card>

                    <Card title="Key Factors">
                        {mockCropFactors.map((factor, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom:
                                        index !== mockCropFactors.length - 1
                                            ? '12px'
                                            : 0,
                                    borderBottom:
                                        index !== mockCropFactors.length - 1
                                            ? `1px solid ${factor.borderColor}`
                                            : 'none',
                                    paddingBottom:
                                        index !== mockCropFactors.length - 1
                                            ? '12px'
                                            : 0,
                                }}
                            >
                                <h4
                                    style={{
                                        margin: '0 0 4px',
                                        fontSize: '16px',
                                        color: factor.color,
                                    }}
                                >
                                    {factor.name}
                                </h4>
                                <p style={{ margin: 0, fontSize: '14px' }}>
                                    {factor.description}
                                </p>
                            </div>
                        ))}
                    </Card>
                </ActionPanel>
            </GridContainer>
        </PageContainer>
    );
};

export default CropPrediction;
