'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
    IoLeafOutline,
    IoFishOutline,
    IoTrailSignOutline,
    IoWalletOutline,
    IoWarningOutline,
    IoCalendarOutline,
    IoArrowForward,
} from 'react-icons/io5';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
    mockNotifications,
    mockFinancialData,
    mockUpcomingTasks,
} from '../data/mockData';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[6]};
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const PageTitle = styled.h1`
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    margin: 0;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${(props) => props.theme.spacing[4]};

    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing[4]};

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: 2fr 1fr;
    }
`;

const NotificationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[2]};
`;

const NotificationItem = styled.div`
    padding: ${(props) => props.theme.spacing[3]};
    border-radius: ${(props) => props.theme.borderRadius.md};
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) =>
        props.isNew ? `${props.theme.colors.info}08` : 'transparent'};
    position: relative;

    &:hover {
        background-color: ${(props) =>
            props.isNew
                ? `${props.theme.colors.info}12`
                : props.theme.colors.background};
    }

    ${(props) =>
        props.isNew &&
        `
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${props.theme.colors.info};
    }
  `}
`;

const NotificationTitle = styled.h4`
    font-size: ${(props) => props.theme.fontSizes.md};
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[2]};

    svg {
        color: ${(props) => props.theme.colors.warning};
    }
`;

const NotificationTime = styled.span`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors.textLight};
`;

const NotificationMessage = styled.p`
    margin: ${(props) => props.theme.spacing[2]} 0 0;
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.text};
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const CardHeaderTitle = styled.h3`
    margin: 0;
`;

const CardHeaderAction = styled.a`
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSizes.sm};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[1]};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const TaskItem = styled.div`
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing[3]};
    border-radius: ${(props) => props.theme.borderRadius.md};
    border: 1px solid ${(props) => props.theme.colors.border};
    margin-bottom: ${(props) => props.theme.spacing[2]};

    &:hover {
        background-color: ${(props) => props.theme.colors.background};
    }
`;

const TaskIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => `${props.theme.colors.primary}15`};
    margin-right: ${(props) => props.theme.spacing[3]};

    svg {
        color: ${(props) => props.theme.colors.primary};
        font-size: 20px;
    }
`;

const TaskContent = styled.div`
    flex: 1;
`;

const TaskTitle = styled.h4`
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.md};
`;

const TaskDate = styled.div`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[1]};
    margin-top: ${(props) => props.theme.spacing[1]};
`;

const Dashboard = () => {
    const [stats] = useState({
        crops: { value: 7, trend: 5.2 },
        livestock: { value: 124, trend: -2.1 },
        machinery: { value: 23, trend: 0 },
        finances: { value: '₦12,450', trend: 12.3 },
    });

    return (
        <DashboardContainer>
            <PageHeader>
                <PageTitle>Dashboard</PageTitle>
            </PageHeader>

            <StatsGrid>
                <StatCard
                    title="Crops"
                    value={stats.crops.value}
                    icon={IoLeafOutline}
                    trend={stats.crops.trend}
                    trendLabel="from last season"
                    color="#1E8E3E"
                />
                <StatCard
                    title="Livestock"
                    value={stats.livestock.value}
                    icon={IoFishOutline}
                    trend={stats.livestock.trend}
                    trendLabel="from last month"
                    color="#E67700"
                />
                <StatCard
                    title="Machinery"
                    value={stats.machinery.value}
                    icon={IoTrailSignOutline}
                    color="#3B82F6"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={stats.finances.value}
                    icon={IoWalletOutline}
                    trend={stats.finances.trend}
                    trendLabel="from last month"
                    color="#6941C6"
                />
            </StatsGrid>

            <DashboardGrid>
                <Card title="Recent Notifications">
                    <NotificationList>
                        {mockNotifications.map((notification, index) => (
                            <NotificationItem
                                key={index}
                                isNew={notification.isNew}
                            >
                                <NotificationTitle>
                                    {notification.type === 'warning' && (
                                        <IoWarningOutline />
                                    )}
                                    {notification.title}
                                    <NotificationTime>
                                        {notification.time}
                                    </NotificationTime>
                                </NotificationTitle>
                                <NotificationMessage>
                                    {notification.message}
                                </NotificationMessage>
                            </NotificationItem>
                        ))}
                    </NotificationList>

                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button variant="outline">
                            View All Notifications
                        </Button>
                    </div>
                </Card>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Card>
                        <CardHeader>
                            <CardHeaderTitle>Upcoming Tasks</CardHeaderTitle>
                            <CardHeaderAction href="/tasks">
                                View all <IoArrowForward />
                            </CardHeaderAction>
                        </CardHeader>

                        {mockUpcomingTasks.map((task, index) => (
                            <TaskItem key={index}>
                                <TaskIcon>
                                    <IoCalendarOutline />
                                </TaskIcon>
                                <TaskContent>
                                    <TaskTitle>{task.title}</TaskTitle>
                                    <TaskDate>
                                        <IoCalendarOutline size={12} />{' '}
                                        {task.date}
                                    </TaskDate>
                                </TaskContent>
                            </TaskItem>
                        ))}
                    </Card>

                    <Card title="Financial Overview">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span>Income:</span>
                            <span
                                style={{ color: '#1E8E3E', fontWeight: '500' }}
                            >
                                {mockFinancialData.income}
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span>Expenses:</span>
                            <span
                                style={{ color: '#D92D20', fontWeight: '500' }}
                            >
                                {mockFinancialData.expenses}
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span>Profit:</span>
                            <span
                                style={{ color: '#1E8E3E', fontWeight: '500' }}
                            >
                                {mockFinancialData.profit}
                            </span>
                        </div>
                    </Card>
                </div>
            </DashboardGrid>
        </DashboardContainer>
    );
};

export default Dashboard;
