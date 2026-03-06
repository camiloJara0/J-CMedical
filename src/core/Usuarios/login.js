export async function iniciarSesion(form) {
    console.log(form)
  try {
    const bodyF = JSON.stringify({
        correo: form.correo,
        contraseña: form.contraseña,
    })
    const response = await fetch(`http://127.0.0.1:8000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyF
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('rol', data.user.rol)
    localStorage.setItem('user', data.user.correo)

    if(data.user.rol == 'Admin'){
        window.location.href = '/Admin'
    } else {
        window.location.href = '/'
    }
    return data;
  } catch (error) {
    console.error('Error al traer productos:', error);
    throw error;
  }
}