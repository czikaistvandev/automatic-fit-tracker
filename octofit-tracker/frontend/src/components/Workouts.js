import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts data:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark">
        <h2 className="mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        {workouts.length === 0 ? (
          <p className="text-muted">No workouts found</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-warning">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text"><strong>User:</strong> {workout.user}</p>
                    <p className="card-text"><strong>Description:</strong> {workout.description}</p>
                    <p className="card-text"><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
