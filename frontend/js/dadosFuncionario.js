async function carregarDados() {
    try {
    
        const token = localStorage.getItem('access_token');

        const response = await fetch(`http://${window.location.hostname}:3000/usuario/individual`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json();
    
        const usuario = data.usuario;
        const jornada = data.jornada;
    
        document.getElementById('nomeFuncionario').textContent = usuario.nome;
        document.getElementById('entradaManha').textContent = jornada.entradaManha?.slice(0, 5) || '--:--';
        document.getElementById('saidaManha').textContent = jornada.saidaManha?.slice(0, 5) || '--:--';
        document.getElementById('entradaTarde').textContent = jornada.entradaTarde?.slice(0, 5) || '--:--';
        document.getElementById('saidaTarde').textContent = jornada.saidaTarde?.slice(0, 5) || '--:--';
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        alert('Erro ao carregar os dados do servidor.');
    }
  }
  
  function atualizarRelogio() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR');
    document.getElementById('horaAtual').textContent = hora;
  }
  
  function registrarPonto() {
    const hora = new Date().toLocaleTimeString('pt-BR');
    alert("Ponto registrado às " + hora);
  }
  
  setInterval(atualizarRelogio, 1000);
  
  window.onload = () => {
    carregarDados();
    atualizarRelogio();
  };
  