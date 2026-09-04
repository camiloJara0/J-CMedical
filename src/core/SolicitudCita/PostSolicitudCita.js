const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function enviarSolicitudCita(solicitud) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/solicitud_cita`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(solicitud),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar solicitud de cita:', error);
    throw error;
  }
}

export async function validarNIT(nit) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/validar_cliente_nit/${encodeURIComponent(nit)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al validar NIT:', error);
    throw error;
  }
}

export async function validarSerial(serial) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/validar_equipo_serial/${encodeURIComponent(serial)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al validar serial:', error);
    throw error;
  }
}
