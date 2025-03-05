'use client';

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { LayoutContainer, MainContent, ContentWrapper } from './Layout.styles';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <LayoutContainer>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <ContentWrapper>
                <Header toggleSidebar={toggleSidebar} />
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </LayoutContainer>
    );
};

export default Layout;
