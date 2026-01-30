import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard data:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  // Sort leaderboard by points in descending order
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);

  return (
    <div className="card">
      <div className="card-header bg-danger text-white">
        <h2 className="mb-0">🏆 Leaderboard</h2>
      </div>
      <div className="card-body">
        {sortedLeaderboard.length === 0 ? (
          <p className="text-muted">No leaderboard data found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Week</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((entry, idx) => (
                  <tr key={entry.id} className={idx === 0 ? 'table-warning' : idx === 1 ? 'table-secondary' : idx === 2 ? 'table-light' : ''}>
                    <td>
                      <span className="badge bg-primary">{idx + 1}</span>
                    </td>
                    <td className="fw-bold">{entry.team}</td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.points}</span>
                    </td>
                    <td>{new Date(entry.week).toLocaleDateString()}</td>
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

export default Leaderboard;
