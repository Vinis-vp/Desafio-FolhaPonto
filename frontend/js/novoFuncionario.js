document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroFuncionario');

  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    const payload = {
      usuario: {
        tipoUsuario: 2,
        nome: document.getElementById('nome').value,
        matricula: document.getElementById('matricula').value,
        senha: document.getElementById('senha').value
      },
      jornada: {
        entradaManha: document.getElementById('entradaManha').value,
        saidaManha: document.getElementById('saidaManha').value,
        entradaTarde: document.getElementById('entradaTarde').value,
        saidaTarde: document.getElementById('saidaTarde').value
      }
    };

    try {
     const response = await fetch(`http://${window.location.hostname}:3000/usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao cadastrar');
      }

      alert('Funcionário cadastrado com sucesso!');
      form.reset();
    } catch (err) {
      alert('Erro: ' + err.message);
    }
  });
});
