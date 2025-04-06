document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessageDiv = document.getElementById('error-message');
    const successMessageDiv = document.getElementById('success-message');
  
    errorMessageDiv.classList.add('hidden');
    successMessageDiv.classList.add('hidden');
  
    if (!username || !email || !password || !confirmPassword) {
      errorMessageDiv.textContent = 'Todos os campos são obrigatórios.';
      errorMessageDiv.classList.remove('hidden');
      return;
    }
  
    if (password !== confirmPassword) {
      errorMessageDiv.textContent = 'As senhas não coincidem.';
      errorMessageDiv.classList.remove('hidden');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar usuário');
      }
  
      successMessageDiv.textContent = 'Usuário cadastrado com sucesso!';
      successMessageDiv.classList.remove('hidden');
      successMessageDiv.classList.add('show');
  
      setTimeout(() => {
        successMessageDiv.classList.remove('show');
        window.location.href = 'login.html';
      }, 2000);
    } catch (error) {
      errorMessageDiv.textContent = error.message;
      errorMessageDiv.classList.remove('hidden');
    }
  });
  