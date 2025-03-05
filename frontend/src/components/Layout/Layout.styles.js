import styled from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

export const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const MainContent = styled.main`
    flex: 1;
    padding: ${(props) => props.theme.spacing[6]};
    overflow-y: auto;
    background-color: ${(props) => props.theme.colors.background};
`;
