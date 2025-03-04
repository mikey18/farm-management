"use client"

import { useState } from "react"
import styled from "styled-components"
import { Card, Button, Input, Select, Grid } from "../components/StyledComponents"
import { BarChart2 } from "react-feather"

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-weight: bold;
`

const PredictionResult = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
`

const CropItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const CropName = styled.span`
  font-weight: bold;
`

const CropScore = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const CropPrediction = () => {
  const [soilType, setSoilType] = useState("")
  const [temperature, setTemperature] = useState("")
  const [rainfall, setRainfall] = useState("")
  const [humidity, setHumidity] = useState("")
  const [predictionResult, setPredictionResult] = useState(null)

  const handlePredict = () => {
    // In a real application, this would call an API or run a model
    // For this example, we'll just set some mock results
    setPredictionResult([
      { crop: "Corn", score: 0.85 },
      { crop: "Wheat", score: 0.72 },
      { crop: "Soybeans", score: 0.68 },
      { crop: "Cotton", score: 0.45 },
    ])
  }

  return (
    <div>
      <PageTitle>Crop Prediction</PageTitle>
      <Card>
        <Grid columns={2} gap="medium">
          <div>
            <Label htmlFor="soilType">Soil Type</Label>
            <Select id="soilType" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
              <option value="">Select soil type</option>
              <option value="clay">Clay</option>
              <option value="loamy">Loamy</option>
              <option value="sandy">Sandy</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="temperature">Average Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter average temperature"
            />
          </div>
          <div>
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <Input
              id="rainfall"
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Enter annual rainfall"
            />
          </div>
          <div>
            <Label htmlFor="humidity">Average Humidity (%)</Label>
            <Input
              id="humidity"
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder="Enter average humidity"
            />
          </div>
        </Grid>
        <Button onClick={handlePredict} style={{ marginTop: "1rem" }}>
          <BarChart2 size={16} style={{ marginRight: "0.5rem" }} /> Predict Suitable Crops
        </Button>
      </Card>
      {predictionResult && (
        <PredictionResult>
          <h3>Prediction Results</h3>
          {predictionResult.map((result, index) => (
            <CropItem key={index}>
              <CropName>{result.crop}</CropName>
              <CropScore>{(result.score * 100).toFixed(2)}% suitable</CropScore>
            </CropItem>
          ))}
        </PredictionResult>
      )}
    </div>
  )
}

export default CropPrediction

