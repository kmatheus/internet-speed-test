import React, { useState } from 'react';

const SpeedTest = () => {
  const [speedData, setSpeedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const measureSpeed = async () => {
    setLoading(true);
    setSpeedData(null); // Limpar os dados anteriores
    setError(null);     // Limpar erros anteriores
    try {
      const response = await fetch('/speedtest');
      if (!response.ok) {
        throw new Error('Erro ao medir a velocidade da internet');
      }
      const data = await response.json();
      setSpeedData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>KimeratechServices - Teste de Velocidade (Internet)</h1>
      <button onClick={measureSpeed} disabled={loading}>
        {loading ? 'Medindo...' : 'Medir Velocidade'}
      </button>
      {loading && <p>Realizando a medição! Por favor, aguarde uns instantes...</p>} {/* Texto de carregamento */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {speedData && (
        <div>
          <p>Velocidade de Download: {speedData.download_speed.toFixed(2)} Mbps</p>
          <p>Velocidade de Upload: {speedData.upload_speed.toFixed(2)} Mbps</p>
          <p>Ping: {speedData.ping} ms</p>
        </div>
      )}
    </div>
  );
};

export default SpeedTest;
