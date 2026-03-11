export async function traerCotizaciones() {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/solicitud_cotizacion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al traer productos:', error);
    throw error;
  }
}
