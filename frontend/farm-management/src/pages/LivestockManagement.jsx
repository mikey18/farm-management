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

const LivestockManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data for livestock
  const livestock = [
    { id: "C001", type: "Cow", breed: "Holstein", status: "Healthy", age: 3, location: "Pen A" },
    { id: "C002", type: "Cow", breed: "Jersey", status: "Pregnant", age: 4, location: "Pen B" },
    { id: "G001", type: "Goat", breed: "Boer", status: "Healthy", age: 2, location: "Pen C" },
    { id: "S001", type: "Sheep", breed: "Merino", status: "Sick", age: 1, location: "Quarantine" },
    { id: "P001", type: "Pig", breed: "Duroc", status: "Healthy", age: 1, location: "Pen D" },
  ]

  const filteredLivestock = livestock.filter(
    (animal) =>
      (animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "all" || animal.type === typeFilter),
  )

  return (
    <div>
      <PageTitle>Livestock Management</PageTitle>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search livestock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Cow">Cows</option>
          <option value="Goat">Goats</option>
          <option value="Sheep">Sheep</option>
          <option value="Pig">Pigs</option>
        </Select>
        <Button>
          <Plus size={16} /> Add Animal
        </Button>
      </FilterContainer>
      <Card>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Breed</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Age</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredLivestock.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.id}</TableCell>
                <TableCell>{animal.type}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      animal.status === "Healthy" ? "success" : animal.status === "Pregnant" ? "warning" : "error"
                    }
                  >
                    {animal.status}
                  </Badge>
                </TableCell>
                <TableCell>{animal.age} years</TableCell>
                <TableCell>{animal.location}</TableCell>
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

export default LivestockManagement

