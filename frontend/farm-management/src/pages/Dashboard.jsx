import styled from "styled-components"
import { Card, Grid, Flex, Button } from "../components/StyledComponents"
import { Tractor, Leaf, DollarSign, BarChart3, AlertTriangle } from "react-feather"

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`

const SummaryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const CardValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
`

const CardIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const AlertCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.white};
`

const AlertTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const AlertList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const AlertItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

const Dashboard = () => {
  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
      <Grid columns={4} gap="medium">
        <SummaryCard>
          <CardIcon>
            <Tractor size={24} />
          </CardIcon>
          <CardTitle>Total Machinery</CardTitle>
          <CardValue>24</CardValue>
          <p>3 need maintenance</p>
        </SummaryCard>
        <SummaryCard>
          <CardIcon>
            <Leaf size={24} />
          </CardIcon>
          <CardTitle>Active Crops</CardTitle>
          <CardValue>7</CardValue>
          <p>2 ready for harvest</p>
        </SummaryCard>
        <SummaryCard>
          <CardIcon>
            <DollarSign size={24} />
          </CardIcon>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardValue>$12,450</CardValue>
          <p>18% from last month</p>
        </SummaryCard>
        <SummaryCard>
          <CardIcon>
            <BarChart3 size={24} />
          </CardIcon>
          <CardTitle>Crop Yield</CardTitle>
          <CardValue>85%</CardValue>
          <p>5% increase</p>
        </SummaryCard>
      </Grid>

      <Grid columns={2} gap="large" style={{ marginTop: "2rem" }}>
        <AlertCard>
          <Flex align="center" style={{ marginBottom: "1rem" }}>
            <AlertTriangle size={24} style={{ marginRight: "0.5rem" }} />
            <AlertTitle>Recent Alerts</AlertTitle>
          </Flex>
          <AlertList>
            <AlertItem>Tractor #3 needs maintenance</AlertItem>
            <AlertItem>Low pesticide inventory</AlertItem>
            <AlertItem>Weather alert: Heavy rain expected</AlertItem>
          </AlertList>
          <Button style={{ marginTop: "1rem" }}>View All Alerts</Button>
        </AlertCard>
        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <Flex direction="column" gap="small">
            <Button>Record Crop Yield</Button>
            <Button>Schedule Maintenance</Button>
            <Button>View Financial Report</Button>
            <Button>Check Weather Forecast</Button>
          </Flex>
        </Card>
      </Grid>
    </div>
  )
}

export default Dashboard

