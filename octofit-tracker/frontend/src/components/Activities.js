import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities data:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header bg-info text-white">
        <h2 className="mb-0">Activities</h2>
      </div>
      <div className="card-body">
        {activities.length === 0 ? (
          <p className="text-muted">No activities found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Calories Burned</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.user}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.calories_burned}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
