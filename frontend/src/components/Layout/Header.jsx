'use client';

import { useState } from 'react';
import {
    IoMenu,
    IoNotificationsOutline,
    IoPersonCircleOutline,
} from 'react-icons/io5';
import {
    HeaderContainer,
    MobileMenuButton,
    HeaderActions,
    NotificationButton,
    ProfileDropdown,
    ProfileButton,
    // DropdownContent,
    // DropdownItem,
} from './Header.styles';

const Header = ({ toggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const data = JSON.parse(localStorage.getItem('auth'));
    const name = `${data.firstname} ${data.lastname}`;

    return (
        <HeaderContainer>
            <MobileMenuButton onClick={toggleSidebar}>
                <IoMenu />
            </MobileMenuButton>

            <HeaderActions>
                <NotificationButton>
                    <IoNotificationsOutline />
                </NotificationButton>

                <ProfileDropdown>
                    <ProfileButton
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <IoPersonCircleOutline />
                        <span>{name}</span>
                    </ProfileButton>

                    {/* {dropdownOpen && (
                        <DropdownContent>
                            <DropdownItem>Profile</DropdownItem>
                            <DropdownItem>Settings</DropdownItem>
                            <DropdownItem>Help</DropdownItem>
                            <DropdownItem isLogout>Logout</DropdownItem>
                        </DropdownContent>
                    )} */}
                </ProfileDropdown>
            </HeaderActions>
        </HeaderContainer>
    );
};

export default Header;
