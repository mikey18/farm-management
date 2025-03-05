import styled from 'styled-components';

export const HeaderContainer = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${(props) => props.theme.spacing[6]};
    background-color: ${(props) => props.theme.colors.cardBg};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const MobileMenuButton = styled.button`
    display: none;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textLight};
    font-size: 24px;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.primary};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: flex;
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[4]};
`;

export const NotificationButton = styled.button`
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textLight};
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
        color: ${(props) => props.theme.colors.primary};
    }
`;

export const ProfileDropdown = styled.div`
    position: relative;
`;

export const ProfileButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.sm};

    svg {
        font-size: 24px;
        color: ${(props) => props.theme.colors.textLight};
    }

    &:hover {
        span {
            color: ${(props) => props.theme.colors.primary};
        }

        svg {
            color: ${(props) => props.theme.colors.primary};
        }
    }
`;

export const DropdownContent = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: ${(props) => props.theme.colors.cardBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.md};
    min-width: 180px;
    z-index: 100;
    overflow: hidden;
`;

export const DropdownItem = styled.button`
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: ${(props) => props.theme.spacing[3]}
        ${(props) => props.theme.spacing[4]};
    color: ${(props) =>
        props.isLogout ? props.theme.colors.danger : props.theme.colors.text};
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.sm};

    &:hover {
        background-color: ${(props) =>
            props.isLogout
                ? `${props.theme.colors.danger}10`
                : props.theme.colors.background};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.colors.border};
    }
`;
