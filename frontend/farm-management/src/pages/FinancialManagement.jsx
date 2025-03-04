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
  Grid,
} from "../components/StyledComponents"
import { Plus, Download } from "react-feather"

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

const SummaryCard = styled(Card)`
  text-align: center;
`

const SummaryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const SummaryValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme, variant }) => theme.colors[variant || "text"]};
`

const FinancialManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data for financial transactions
  const transactions = [
    { id: 1, date: "2023-05-01", description: "Crop sale - Corn", type: "Income", amount: 5000 },
    { id: 2, date: "2023-05-03", description: "Equipment purchase", type: "Expense", amount: 2000 },
    { id: 3, date: "2023-05-05", description: "Fertilizer purchase", type: "Expense", amount: 1000 },
    { id: 4, date: "2023-05-10", description: "Livestock sale", type: "Income", amount: 3000 },
    { id: 5, date: "2023-05-15", description: "Utility bill", type: "Expense", amount: 500 },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === "all" || transaction.type === typeFilter),
  )

  const totalIncome = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalIncome - totalExpenses

  return (
    <div>
      <PageTitle>Financial Management</PageTitle>
      <Grid columns={3} gap="medium" style={{ marginBottom: "2rem" }}>
        <SummaryCard>
          <SummaryTitle>Total Income</SummaryTitle>
          <SummaryValue variant="success">${totalIncome.toFixed(2)}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryTitle>Total Expenses</SummaryTitle>
          <SummaryValue variant="error">${totalExpenses.toFixed(2)}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryTitle>Net Profit</SummaryTitle>
          <SummaryValue variant={netProfit >= 0 ? "success" : "error"}>${netProfit.toFixed(2)}</SummaryValue>
        </SummaryCard>
      </Grid>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </Select>
        <Button>
          <Plus size={16} /> Add Transaction
        </Button>
      </FilterContainer>
      <Card>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Amount</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "Income" ? "success" : "error"}>{transaction.type}</Badge>
                </TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
      <Button style={{ marginTop: "1rem" }}>
        <Download size={16} /> Generate Financial Report
      </Button>
    </div>
  )
}

export default FinancialManagement

