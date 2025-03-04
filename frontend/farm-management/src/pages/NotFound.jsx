import styled from "styled-components"
import { Button } from "../components/StyledComponents"
import { Home } from "react-feather"
import { Link } from "react-router-dom"

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`

const NotFoundTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

const NotFoundMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.textLight};
`

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Page Not Found</NotFoundTitle>
      <NotFoundMessage>Oops! The page you're looking for doesn't exist.</NotFoundMessage>
      <Button as={Link} to="/">
        <Home size={16} style={{ marginRight: "0.5rem" }} /> Go to Dashboard
      </Button>
    </NotFoundContainer>
  )
}

export default NotFound

