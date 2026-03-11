export async function enviarCategorias(isEditing, categoria) {
    try {
        const token = localStorage.getItem('token')
        const method = isEditing ? 'PUT' : 'POST'
        const url = isEditing ?
            `${import.meta.env.VITE_BACKEND_URL}/api/categorias/${categoria.id}` :
            `${import.meta.env.VITE_BACKEND_URL}/api/categorias`
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoria)
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