import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
// Navigation Bar
import NavBar from "./components/layout/NavBar";
// Notifications
import NotificationScreen from "./components/notifications/NotificationScreen";
// Saved Mapping
import Mapping from './components/mapping/Mapping';
// Create Mapping
import DropFile from './components/mapping/DropFile';
// Clients
import ClientScreen from './components/client/ClientScreen';
import EditClient from './components/client/EditClient';
// FTPs
import FTPScreen from './components/ftp/FTPScreen';
import EditFTP from './components/ftp/EditFTP';
// Admins
import Admin from './components/admin/AdminScreen';
// Dashboard
import Dashboard from './components/Dashboard';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path="/notification-screen" component={NotificationScreen} />
            <Route path="/mapping-drop-file-screen" component={DropFile} />
            <Route path="/mapping-screen" component={Mapping} />
            <Route path="/client-screen" component={ClientScreen} />
            <Route path="/client-edit-screen" component={EditClient} />
            <Route path="/ftp-screen" component={FTPScreen} />
            <Route path="/ftp-edit-screen" component={EditFTP} />
            <Route path="/admin-screen" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;