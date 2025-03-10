import styled from 'styled-components';
import { IoLeaf } from 'react-icons/io5';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};
`;

const LogoIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary};
`;

const LogoText = styled.div`
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.heading};
`;

const Logo = ({ small = false }) => {
    return (
        <LogoContainer small={small}>
            <LogoIcon>
                <IoLeaf />
            </LogoIcon>
            {!small && <LogoText>FarmFlow</LogoText>}
        </LogoContainer>
    );
};

export default Logo;
