const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function fetchHealthStatus() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error(`Health check returned ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      random_forest_loaded: false,
      ann_loaded: false,
      error: err.message
    };
  }
}

export async function predictPrice(features) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(features)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Prediction error (${res.status})`);
  }

  return await res.json();
}

export async function triggerReloadModels() {
  const res = await fetch(`${BASE_URL}/reload-models`, {
    method: 'POST'
  });
  return await res.json();
}
