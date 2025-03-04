import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Home, Tractor, Leaf, DollarSign, BarChart3, Settings } from "react-feather"
import { StyledLink } from "./StyledComponents"

const SidebarWrapper = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`

const NavMenu = styled.nav`
  margin-top: ${({ theme }) => theme.spacing.large};
`

const NavItem = styled(StyledLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.text)};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  svg {
    margin-right: ${({ theme }) => theme.spacing.medium};
  }
`

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <Home /> },
    { path: "/inventory", label: "Inventory", icon: <Tractor /> },
    { path: "/livestock", label: "Livestock", icon: <Tractor /> },
    { path: "/crops", label: "Crops", icon: <Leaf /> },
    { path: "/finances", label: "Finances", icon: <DollarSign /> },
    { path: "/prediction", label: "Crop Prediction", icon: <BarChart3 /> },
  ]

  return (
    <SidebarWrapper isOpen={isOpen}>
      <Logo>
        <Leaf /> FarmSys
      </Logo>
      <NavMenu>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            isActive={location.pathname === item.path}
            onClick={() => toggleSidebar()}
          >
            {item.icon}
            {item.label}
          </NavItem>
        ))}
      </NavMenu>
      <NavItem to="/settings" isActive={location.pathname === "/settings"}>
        <Settings />
        Settings
      </NavItem>
    </SidebarWrapper>
  )
}

export default Sidebar

