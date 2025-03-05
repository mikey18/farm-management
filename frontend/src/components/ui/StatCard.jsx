import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.colors.cardBg};
    padding: ${(props) => props.theme.spacing[4]};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    box-shadow: ${(props) => props.theme.shadows.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[3]};
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) =>
        props.color ? `${props.color}15` : `${props.theme.colors.primary}15`};

    svg {
        font-size: 24px;
        color: ${(props) => props.color || props.theme.colors.primary};
    }
`;

const CardTitle = styled.h3`
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.textLight};
    margin: 0;
`;

const CardValue = styled.div`
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    font-weight: 700;
    margin: ${(props) => props.theme.spacing[1]} 0;
`;

const TrendContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[1]};
    color: ${(props) =>
        props.isPositive
            ? props.theme.colors.success
            : props.theme.colors.danger};

    font-size: ${(props) => props.theme.fontSizes.xs};
    font-weight: 500;
`;

const TrendLabel = styled.span`
    color: ${(props) => props.theme.colors.textLight};
    margin-left: ${(props) => props.theme.spacing[1]};
`;

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, color }) => {
    const isPositive = trend && trend > 0;

    return (
        <CardContainer>
            <CardHeader>
                <IconContainer color={color}>
                    <Icon />
                </IconContainer>
            </CardHeader>

            <div>
                <CardTitle>{title}</CardTitle>
                <CardValue>{value}</CardValue>

                {trend !== undefined && (
                    <TrendContainer isPositive={isPositive}>
                        {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
                        {trendLabel && <TrendLabel>{trendLabel}</TrendLabel>}
                    </TrendContainer>
                )}
            </div>
        </CardContainer>
    );
};

export default StatCard;
