import React, { useState } from 'react';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import './components/fastestRoute.css';

const TrainBooking = () => {
  const [startStation, setStartStation] = useState('Stasiun');
  const [endStation, setEndStation] = useState('Stasiun');
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);

  const stations = [
    'Stasiun Gambir', 'Stasiun Pasar Senen', 'Stasiun Tanah Abang', 
    'Stasiun Manggarai', 'Stasiun Cikini', 'Stasiun Gondangdia',
    'Stasiun Juanda', 'Stasiun Sawah Besar', 'Stasiun Kemayoran',
    'Stasiun Rajawali', 'Stasiun Kampung Bandan', 'Stasiun Ancol'
  ];

  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="main-container">
        {/* Title */}
        <h1 className="main-title">Fastest Route</h1>

        <div className="content-grid">
          {/* Left Side - Train Image */}
          <div className="train-section">
            <div className="train-container">
              <img src="../public/assets/LRTFastest.png" alt="lrt"/>
            </div>
          </div>

          {/* Right Side - Station Selectors and Map */}
          <div className="form-section">
            {/* Station Selectors */}
            <div className="station-controls">
              {/* Start and End Labels */}
              <div className="station-labels">
                <span>Start</span>
                <span>End</span>
              </div>

              {/* Station Dropdowns */}
              <div className="station-dropdowns">
                {/* Start Station */}
                <div className="dropdown-container">
                  <button
                    onClick={() => {
                      setShowStartDropdown(!showStartDropdown);
                      setShowEndDropdown(false);
                    }}
                    className="station-dropdown"
                  >
                    <span className="station-text">{startStation}</span>
                    <ChevronDown className="dropdown-icon" />
                  </button>
                  
                  {showStartDropdown && (
                    <div className="dropdown-menu">
                      {stations.map((station, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setStartStation(station);
                            setShowStartDropdown(false);
                          }}
                          className="dropdown-item"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                
                <ArrowRight className="arrow-icon" />
                

                {/* End Station */}
                <div className="dropdown-container">
                  <button
                    onClick={() => {
                      setShowEndDropdown(!showEndDropdown);
                      setShowStartDropdown(false);
                    }}
                    className="station-dropdown"
                  >
                    <span className="station-text">{endStation}</span>
                    <ChevronDown className="dropdown-icon" />
                  </button>
                  
                  {showEndDropdown && (
                    <div className="dropdown-menu">
                      {stations.map((station, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setEndStation(station);
                            setShowEndDropdown(false);
                          }}
                          className="dropdown-item"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="map-container">
              <div className="map-image">
                <img src="../public/assets/map.png" alt="map" />
              </div>
            </div>
          </div>
        </div>

        {/* Capacity and Buy Button */}
        <div className="bottom-section">
          <div className="capacity-info">
            Available Capacity: <span className="capacity-available">40</span>/<span className="capacity-total">100</span>
          </div>
          
          <button className="buy-button">
            BUY TICKET
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainBooking;