import styled, { css } from 'styled-components';

const getVariantStyles = (variant, theme) => {
    switch (variant) {
        case 'primary':
            return css`
                background-color: ${theme.colors.primary};
                color: white;
                border: 1px solid ${theme.colors.primary};

                &:hover:not(:disabled) {
                    background-color: ${`${theme.colors.primary}e0`};
                }

                &:active:not(:disabled) {
                    background-color: ${`${theme.colors.primary}c0`};
                }
            `;
        case 'secondary':
            return css`
                background-color: ${theme.colors.secondary};
                color: ${theme.colors.heading};
                border: 1px solid ${theme.colors.secondary};

                &:hover:not(:disabled) {
                    background-color: ${`${theme.colors.secondary}e0`};
                }

                &:active:not(:disabled) {
                    background-color: ${`${theme.colors.secondary}c0`};
                }
            `;
        case 'outline':
            return css`
                background-color: transparent;
                color: ${theme.colors.primary};
                border: 1px solid ${theme.colors.primary};

                &:hover:not(:disabled) {
                    background-color: ${`${theme.colors.primary}10`};
                }

                &:active:not(:disabled) {
                    background-color: ${`${theme.colors.primary}20`};
                }
            `;
        case 'ghost':
            return css`
                background-color: transparent;
                color: ${theme.colors.text};
                border: 1px solid transparent;

                &:hover:not(:disabled) {
                    background-color: ${`${theme.colors.textLight}10`};
                }

                &:active:not(:disabled) {
                    background-color: ${`${theme.colors.textLight}20`};
                }
            `;
        case 'danger':
            return css`
                background-color: ${theme.colors.danger};
                color: white;
                border: 1px solid ${theme.colors.danger};

                &:hover:not(:disabled) {
                    background-color: ${`${theme.colors.danger}e0`};
                }

                &:active:not(:disabled) {
                    background-color: ${`${theme.colors.danger}c0`};
                }
            `;
        default:
            return '';
    }
};

const getSizeStyles = (size, theme) => {
    switch (size) {
        case 'sm':
            return css`
                padding: ${theme.spacing[1]} ${theme.spacing[3]};
                font-size: ${theme.fontSizes.xs};
            `;
        case 'md':
            return css`
                padding: ${theme.spacing[2]} ${theme.spacing[4]};
                font-size: ${theme.fontSizes.sm};
            `;
        case 'lg':
            return css`
                padding: ${theme.spacing[3]} ${theme.spacing[5]};
                font-size: ${theme.fontSizes.md};
            `;
        default:
            return '';
    }
};

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${(props) => props.theme.spacing[2]};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    ${(props) => getVariantStyles(props.variant || 'primary', props.theme)}
    ${(props) => getSizeStyles(props.size || 'md', props.theme)}
  
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:focus-visible {
        box-shadow:
            0 0 0 2px ${(props) => props.theme.colors.background},
            0 0 0 4px
                ${(props) =>
                    props.variant === 'danger'
                        ? props.theme.colors.danger
                        : props.theme.colors.primary};
    }
`;

export default Button;
