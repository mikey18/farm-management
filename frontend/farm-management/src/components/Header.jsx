import styled from "styled-components"
import { Menu, Bell, User } from "react-feather"
import { Button } from "./StyledComponents"

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
`

const IconButton = styled(Button)`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.small};
  margin-left: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

const Header = ({ toggleSidebar }) => {
  return (
    <HeaderWrapper>
      <LeftSection>
        <IconButton onClick={toggleSidebar}>
          <Menu />
        </IconButton>
        <PageTitle>Dashboard</PageTitle>
      </LeftSection>
      <RightSection>
        <IconButton>
          <Bell />
        </IconButton>
        <IconButton>
          <User />
        </IconButton>
      </RightSection>
    </HeaderWrapper>
  )
}

export default Header

