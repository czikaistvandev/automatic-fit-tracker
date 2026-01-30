import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit Logo"
                className="navbar-logo me-2"
              />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container my-5">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/"
              element={
                <div className="text-center py-5">
                  <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
                  <p className="lead mb-4">
                    Track your fitness activities and compete with your team!
                  </p>
                  <div className="row g-4">
                    <div className="col-md-3">
                      <Link to="/users" className="btn btn-primary btn-lg w-100">
                        Users
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link to="/teams" className="btn btn-success btn-lg w-100">
                        Teams
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link to="/activities" className="btn btn-info btn-lg w-100">
                        Activities
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <Link to="/workouts" className="btn btn-warning btn-lg w-100">
                        Workouts
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
