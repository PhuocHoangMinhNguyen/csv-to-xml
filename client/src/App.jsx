import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path="/notification" element={<NotificationScreen />} />
            <Route path="/mapping-drop-file" element={<DropFile />} />
            <Route path="/mapping" element={<Mapping />} />
            <Route path="/client" element={<ClientScreen />} />
            <Route path="/client-edit/:id" element={<EditClient />} />
            <Route path="/ftp/:id" element={<FTPScreen />} />
            <Route path="/ftp-edit/:id" element={<EditFTP />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;