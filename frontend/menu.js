document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    // Seleciona o elemento do menu onde o nome será exibido
    const loginMenu = document.querySelector('.login-icon-menu');

    if (usuarioLogado && loginMenu) {
        // Atualiza o menu com o nome do usuário
        loginMenu.innerHTML = `👤 Olá, ${usuarioLogado.nome} | <a href="#" id="logout">Sair</a>`;

        // Adiciona o evento de logout
        document.getElementById('logout').addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            localStorage.removeItem('usuario'); // Remove o usuário do localStorage
            window.location.href = 'login.html'; // Redireciona para a página de login
        });
    } else if (loginMenu) {
        // Se não houver usuário logado, exibe o ícone padrão
        loginMenu.innerHTML = '👤';
    }
});