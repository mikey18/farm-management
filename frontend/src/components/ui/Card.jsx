import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.colors.cardBg};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    box-shadow: ${(props) => props.theme.shadows.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    overflow: hidden;
`;

const CardHeader = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const CardTitle = styled.h3`
    font-size: ${(props) => props.theme.fontSizes.lg};
    margin: 0;
`;

const CardSubtitle = styled.p`
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.textLight};
    margin: ${(props) => props.theme.spacing[1]} 0 0;
`;

const CardBody = styled.div`
    padding: ${(props) => props.theme.spacing[4]};
`;

const Card = ({ children, title, subtitle, className }) => {
    return (
        <CardContainer className={className}>
            {(title || subtitle) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
                </CardHeader>
            )}
            <CardBody>{children}</CardBody>
        </CardContainer>
    );
};

export default Card;
