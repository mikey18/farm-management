'use client';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    IoGridOutline,
    IoTrailSignOutline,
    IoFishOutline,
    IoLeafOutline,
    IoWalletOutline,
    IoBarChartOutline,
    IoChevronForwardOutline,
    IoChevronBackOutline,
    IoSettingsOutline,
} from 'react-icons/io5';
import Logo from '../ui/Logo';
import {
    SidebarContainer,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    NavItem,
    NavText,
    ToggleButton,
    LogoWrapper,
} from './Sidebar.styles';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const navItems = [
        { id: 'dashboard', path: '/', icon: IoGridOutline, label: 'Dashboard' },
        {
            id: 'inventory',
            path: '/inventory',
            icon: IoTrailSignOutline,
            label: 'Inventory',
        },
        {
            id: 'livestock',
            path: '/livestock',
            icon: IoFishOutline,
            label: 'Livestock',
        },
        { id: 'crops', path: '/crops', icon: IoLeafOutline, label: 'Crops' },
        {
            id: 'finances',
            path: '/finances',
            icon: IoWalletOutline,
            label: 'Finances',
        },
        {
            id: 'prediction',
            path: '/prediction',
            icon: IoBarChartOutline,
            label: 'Prediction',
        },
    ];

    return (
        <SidebarContainer isOpen={isOpen}>
            <SidebarHeader>
                <LogoWrapper isOpen={isOpen}>
                    <Logo small={isOpen ? 'true' : 'false'} />
                </LogoWrapper>
                <ToggleButton onClick={toggleSidebar}>
                    {isOpen ? (
                        <IoChevronBackOutline />
                    ) : (
                        <IoChevronForwardOutline />
                    )}
                </ToggleButton>
            </SidebarHeader>

            <SidebarContent>
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        as={NavLink}
                        to={item.path}
                        isActive={activeItem === item.id}
                        onClick={() => setActiveItem(item.id)}
                        isOpen={isOpen}
                    >
                        <item.icon />
                        {isOpen && <NavText>{item.label}</NavText>}
                    </NavItem>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavItem as="button" isOpen={isOpen}>
                    <IoSettingsOutline />
                    {isOpen && <NavText>Settings</NavText>}
                </NavItem>
            </SidebarFooter>
        </SidebarContainer>
    );
};

export default Sidebar;
