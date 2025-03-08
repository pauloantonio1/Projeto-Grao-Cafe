// Navegação entre seções
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
      document.querySelector(targetId).classList.add('active');
    });
  });
  
  // Formulário de Encomenda
  document.getElementById('encomendaForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Encomenda enviada com sucesso!');
  });
  
  // Formulário de Login
  document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Login realizado com sucesso!');
  });

  // Navegação entre seções
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
      document.querySelector(targetId).classList.add('active');
    });
  });
  
  // Formulário de Encomenda
  document.getElementById('encomendaForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Encomenda enviada com sucesso!');
  });
  
  // Formulário de Login
  document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Login realizado com sucesso!');
  });