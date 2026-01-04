
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MapPage from './MapPage';
import ListPage from './ListPage';
import { getSlopes, getNearbySlopes } from './slopes.service';
import './App.css';

const { Header, Content } = Layout;

function AppContent() {
  const [slopes, setSlopes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [displaySlopes, setDisplaySlopes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setSlopes(getSlopes());
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
        getNearbySlopes(userLocation, (nearbySlopes) => {
            setDisplaySlopes(nearbySlopes);
        });
    }
  }, [userLocation]);


  return (
    <Layout className="layout">
      <Header>
        <div className="logo">Slopes Nearby</div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">List</Link>
          </Menu.Item>
          <Menu.Item key="/map">
            <Link to="/map">Map</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Routes>
            <Route path="/" element={<ListPage slopes={displaySlopes} />} />
            <Route path="/map" element={<MapPage slopes={slopes} userLocation={userLocation} />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
