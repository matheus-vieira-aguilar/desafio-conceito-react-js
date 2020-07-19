import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [ repositories, setRepository ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: `https://github.com/${Date.now()}`,
      techs: [
        `tech-${Date.now()}`
      ]
    })

    const repository = response.data;
    
    setRepository([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">        
          { repositories.map(repo => <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
