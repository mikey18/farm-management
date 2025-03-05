import styled from 'styled-components';

export const SidebarContainer = styled.div`
    width: ${(props) => (props.isOpen ? '240px' : '70px')};
    height: 100vh;
    background-color: ${(props) => props.theme.colors.cardBg};
    border-right: 1px solid ${(props) => props.theme.colors.border};
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const SidebarHeader = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${(props) => props.theme.spacing[4]};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
    width: 100%;
`;

export const SidebarContent = styled.div`
    flex: 1;
    padding: ${(props) => props.theme.spacing[4]} 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[1]};
`;

export const SidebarFooter = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
    border-top: 1px solid ${(props) => props.theme.colors.border};
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[3]};
    padding: ${(props) => props.theme.spacing[3]}
        ${(props) => props.theme.spacing[4]};
    color: ${(props) =>
        props.isActive
            ? props.theme.colors.primary
            : props.theme.colors.textLight};
    background-color: ${(props) =>
        props.isActive ? `${props.theme.colors.primary}10` : 'transparent'};
    cursor: pointer;
    border-radius: 0;
    margin: 0 ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.md};
    transition: all 0.2s ease;
    justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};

    &:hover,
    &.active {
        color: ${(props) => props.theme.colors.primary};
        background-color: ${(props) => `${props.theme.colors.primary}10`};
    }

    svg {
        font-size: 20px;
        min-width: 20px;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}30`};
    }

    /* For NavLink active state */
    &.active {
        color: ${(props) => props.theme.colors.primary};
        background-color: ${(props) => `${props.theme.colors.primary}10`};
        font-weight: 500;
    }

    /* Reset button styles when used as button */
    background-border: none;
    font-family: inherit;
    text-align: left;
    width: 100%;
`;

export const NavText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ToggleButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.full};

    &:hover {
        color: ${(props) => props.theme.colors.primary};
        background-color: ${(props) => `${props.theme.colors.primary}10`};
    }

    svg {
        font-size: 18px;
    }
`;
