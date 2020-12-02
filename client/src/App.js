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
            <Route path="/notif" component={NotificationScreen} />
            <Route path="/mapping-drop-file" component={DropFile} />
            <Route path="/mapping" component={Mapping} />
            <Route path="/client" component={ClientScreen} />
            <Route path="/client-edit" component={EditClient} />
            <Route path="/ftp" component={FTPScreen} />
            <Route path="/ftp-edit" component={EditFTP} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;