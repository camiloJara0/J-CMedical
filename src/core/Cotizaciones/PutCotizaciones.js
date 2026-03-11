export async function actualizarCotizaciones(cotizacion) {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/solicitud_cotizacion/${cotizacion.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: cotizacion.id,
                estado: cotizacion.estado,
                observaciones_admin: cotizacion.respuesta,
                nombre: cotizacion.nombre,
                correo: cotizacion.correo,
            })
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