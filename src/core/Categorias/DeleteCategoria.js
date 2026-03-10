export async function eliminarCategoria(categoria) {
    try {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://127.0.0.1:8000/api/categorias/${categoria.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(categoria)
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