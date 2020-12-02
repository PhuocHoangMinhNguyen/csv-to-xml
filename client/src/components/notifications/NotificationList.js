// List of notifications inside notification screen

import React from 'react';
import NotificationSummary from './NotificationSummary';

const NotificationList = ({ notifications }) => {
    return (
        <div className="section">
            {notifications && notifications.map(notification => {
                return <NotificationSummary notification={notification} />
            })}
        </div>
    );
};

export default NotificationList;