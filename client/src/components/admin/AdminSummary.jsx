import React from 'react';


class AdminSummary extends React.Component {
    render() {
        const { admin, onRemove } = this.props
        return (
            <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-content">
                    <div className="right" style={{ color: "#0078bf" }} onClick={onRemove} >
                        <i className="material-icons">delete</i>
                    </div>
                    <h5>Admin Email: {admin.email}</h5>
                </div>
            </div>
        );
    };
};

export default AdminSummary;