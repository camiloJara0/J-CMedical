export async function eliminarCotizacion(cotizacion) {
    try {
        const token = localStorage.getItem('token')

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/eliminar_cotizacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: cotizacion.id
            })
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