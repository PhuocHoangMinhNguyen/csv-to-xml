// Details on each notification on notification screen.

import React from 'react';

const NotificationSummary = ({ notification }) => {
    if (notification.notificationType === 'Mandatory fields missing' || notification.notificationType === 'Some mapping fields cannot be found in the input file.') {
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <h5 className="red-text">Status: {notification.notificationType}</h5>
                    <p>CSV File: {notification.csvFile}</p>
                    <div className="row">
                        <p className="col s5">Client Code: {notification.client}</p>
                        <p className="grey-text col s7">Timestamp: {notification.time}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <h5>Status: {notification.notificationType}</h5>
                    <div className="row">
                        <p className="col s5">Client Code: {notification.client}</p>
                        <p className="grey-text col s7">Timestamp: {notification.time}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotificationSummary