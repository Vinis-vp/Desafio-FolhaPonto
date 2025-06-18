async function autenticarUsuario(event) {
  event.preventDefault();

  const matricula = document.getElementById('matricula').value.trim();
  const senha = document.getElementById('senha').value.trim();

  try {
    const response = await fetch(`http://${window.location.hostname}:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    if (data.tipo === 1) {
      window.location.href = '../pages/admin.html';
    } else {
      window.location.href = '../pages/user.html';
    }

    localStorage.setItem('access_token', data.access_token);

  } catch (error) {
    alert(`Erro: ${error.message}`);
  }
}
