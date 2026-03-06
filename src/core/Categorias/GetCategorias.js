export async function traerCategorias() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        // agrega otros headers si los necesitas, como Authorization
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al traer categorias:', error);
    throw error;
  }
}