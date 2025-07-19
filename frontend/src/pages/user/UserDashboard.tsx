import React from 'react';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router';
const UserDashboard: React.FC = () => {
    return (
        <div>
            <Header>
                <Outlet />
            </Header>
        </div>
    );
};


export default UserDashboard;