import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h2 className="mb-0">Teams</h2>
      </div>
      <div className="card-body">
        {teams.length === 0 ? (
          <p className="text-muted">No teams found</p>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-success-light">
                    <h5 className="card-title mb-0">{team.name}</h5>
                  </div>
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                    {team.members && team.members.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {team.members.map((member, idx) => (
                          <li key={idx} className="list-group-item px-0">{member}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No members</p>
                    )}
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

export default Teams;
