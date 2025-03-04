"use client"

import { useState } from "react"
import styled from "styled-components"
import Sidebar from "./Sidebar"
import Header from "./Header"

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.large};
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing.medium};
  }
`

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <LayoutWrapper>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        <Header toggleSidebar={toggleSidebar} />
        {children}
      </MainContent>
    </LayoutWrapper>
  )
}

export default Layout

