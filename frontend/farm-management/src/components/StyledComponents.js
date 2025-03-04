import styled from "styled-components"
import { Link } from "react-router-dom"

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

export const Button = styled.button`
  background-color: ${({ theme, variant }) =>
    variant === "outline" ? "transparent" : theme.colors[variant || "primary"]};
  color: ${({ theme, variant }) => (variant === "outline" ? theme.colors.primary : theme.colors.white)};
  border: ${({ theme, variant }) => (variant === "outline" ? `1px solid ${theme.colors.primary}` : "none")};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "outline" ? theme.colors.background : theme.colors.primaryDark};
  }
`

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-weight: bold;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Badge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  background-color: ${({ theme, variant }) => theme.colors[variant || "primary"]};
  color: ${({ theme }) => theme.colors.white};
`

export const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "stretch"};
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : "0")};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 1}, 1fr);
  gap: ${({ gap, theme }) => theme.spacing[gap] || theme.spacing.medium};
`

