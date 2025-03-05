import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 140px);
    text-align: center;
    padding: ${(props) => props.theme.spacing[6]};
`;

const ErrorCode = styled.h1`
    font-size: 120px;
    font-weight: 700;
    margin: 0;
    color: ${(props) => props.theme.colors.primary};
    line-height: 1;
`;

const Title = styled.h2`
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    margin: ${(props) => props.theme.spacing[4]} 0;
`;

const Description = styled.p`
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.textLight};
    max-width: 500px;
    margin: 0 auto ${(props) => props.theme.spacing[6]};
`;

const NotFound = () => {
    return (
        <NotFoundContainer>
            <ErrorCode>404</ErrorCode>
            <Title>Page Not Found</Title>
            <Description>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </Description>
            <Button as={Link} to="/">
                <IoArrowBack />
                Back to Dashboard
            </Button>
        </NotFoundContainer>
    );
};

export default NotFound;
