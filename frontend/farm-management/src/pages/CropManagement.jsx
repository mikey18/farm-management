"use client"

import { useState } from "react"
import styled from "styled-components"
import {
  Card,
  Button,
  Input,
  Select,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Badge,
} from "../components/StyledComponents"
import { Plus, Edit, Trash2 } from "react-feather"

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

const SearchInput = styled(Input)`
  width: 300px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`

const ProgressFill = styled.div`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`

const CropManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for crops
  const crops = [
    {
      id: 1,
      name: "Corn",
      field: "Field A",
      plantingDate: "2023-03-15",
      harvestDate: "2023-07-15",
      status: "Growing",
      progress: 40,
    },
    {
      id: 2,
      name: "Wheat",
      field: "Field B",
      plantingDate: "2023-02-01",
      harvestDate: "2023-06-30",
      status: "Growing",
      progress: 70,
    },
    {
      id: 3,
      name: "Soybeans",
      field: "Field C",
      plantingDate: "2023-04-01",
      harvestDate: "2023-09-15",
      status: "Growing",
      progress: 20,
    },
    {
      id: 4,
      name: "Tomatoes",
      field: "Greenhouse 1",
      plantingDate: "2023-03-01",
      harvestDate: "2023-05-30",
      status: "Ready for Harvest",
      progress: 95,
    },
    {
      id: 5,
      name: "Lettuce",
      field: "Greenhouse 2",
      plantingDate: "2023-04-15",
      harvestDate: "2023-05-30",
      status: "Seedling",
      progress: 10,
    },
  ]

  const filteredCrops = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || crop.status === statusFilter),
  )

  return (
    <div>
      <PageTitle>Crop Management</PageTitle>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search crops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="Seedling">Seedling</option>
          <option value="Growing">Growing</option>
          <option value="Ready for Harvest">Ready for Harvest</option>
        </Select>
        <Button>
          <Plus size={16} /> Add Crop
        </Button>
      </FilterContainer>
      <Card>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Field</TableHeader>
              <TableHeader>Planting Date</TableHeader>
              <TableHeader>Harvest Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Progress</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredCrops.map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.field}</TableCell>
                <TableCell>{crop.plantingDate}</TableCell>
                <TableCell>{crop.harvestDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      crop.status === "Growing"
                        ? "success"
                        : crop.status === "Ready for Harvest"
                          ? "warning"
                          : "primary"
                    }
                  >
                    {crop.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ProgressBar>
                    <ProgressFill progress={crop.progress} />
                  </ProgressBar>
                  {crop.progress}%
                </TableCell>
                <TableCell>
                  <Button variant="outline" style={{ marginRight: "0.5rem" }}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="outline">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default CropManagement

