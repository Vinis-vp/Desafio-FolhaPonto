document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#registrarPonto');
  
    if (!btn) {
      console.error('Botão de registro de ponto não encontrado.');
      return;
    }
  
    btn.addEventListener('click', async () => {
      const token = localStorage.getItem('access_token');
  
      if (!token) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }
  
      const agora = new Date();
      const horarioReal = agora.toTimeString().slice(0, 5);       // "HH:mm"
      const dataRegistro = agora.toISOString().slice(0, 10);      // "YYYY-MM-DD"
  
      const payload = {
        horarioReal,
        dataRegistro
      };
  
      try {
        const response = await fetch(`http://${window.location.hostname}:3000/pontos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
            if (response.status === 400) {
              const errorData = await response.json();
              mostrarModalErro(errorData.message || 'Erro desconhecido.');
              return;
            }
    
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao registrar ponto');
        }
  
        alert('✅ Ponto registrado com sucesso!');
      } catch (err) {
        alert('❌ Erro: ' + err.message);
      }
    });
  });


  function mostrarModalErro(mensagem) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
  
    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.color = '#1a1a1a'; 
    box.style.padding = '2rem';
    box.style.borderRadius = '8px';
    box.style.maxWidth = '400px';
    box.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
    box.innerHTML = `
      <h3 style="margin-top: 0; color: #1a1a1a;">Horário Inválido</h3>
      <p style= "color: #1a1a1a;">${mensagem}</p>
      <button id="fecharModalErro" style="margin-top: 1rem;">Fechar</button>
    `;
  
    modal.appendChild(box);
    document.body.appendChild(modal);
  
    document.getElementById('fecharModalErro').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }