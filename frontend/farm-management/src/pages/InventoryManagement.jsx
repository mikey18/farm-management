"use client"

import { useState } from "react"
import styled from "styled-components"
import { Card, Button, Input, Select, Table, TableHeader, TableRow, TableCell } from "../components/StyledComponents"
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

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock data for inventory items
  const inventoryItems = [
    { id: 1, name: "Tractor", category: "Machinery", quantity: 2, lastMaintenance: "2023-03-15" },
    { id: 2, name: "Fertilizer", category: "Supplies", quantity: 500, unit: "kg" },
    { id: 3, name: "Seeds - Corn", category: "Seeds", quantity: 1000, unit: "packets" },
    { id: 4, name: "Pesticide", category: "Supplies", quantity: 50, unit: "liters" },
    { id: 5, name: "Irrigation Pipes", category: "Equipment", quantity: 100, unit: "meters" },
  ]

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || item.category === categoryFilter),
  )

  return (
    <div>
      <PageTitle>Inventory Management</PageTitle>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Machinery">Machinery</option>
          <option value="Supplies">Supplies</option>
          <option value="Seeds">Seeds</option>
          <option value="Equipment">Equipment</option>
        </Select>
        <Button>
          <Plus size={16} /> Add Item
        </Button>
      </FilterContainer>
      <Card>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Last Maintenance</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>{item.lastMaintenance || "N/A"}</TableCell>
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

export default InventoryManagement

