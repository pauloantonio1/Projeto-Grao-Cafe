document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Verifica se o usuário já está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLogado) {
        redirecionarUsuarioLogado();
    }

    // Evento de submit do formulário de login
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Simulação de uma requisição ao servidor
        console.log('Simulando requisição de login...');
        setTimeout(() => {
            // Simulação de uma resposta bem-sucedida
            const dataSimulado = {
                success: true,
                usuario: {
                    nome: "Usuário Teste",
                    email: email // Usa o email digitado no formulário
                }
            };

            console.log('Resposta simulada:', dataSimulado);

            if (dataSimulado.success) {
                // Salva os dados do usuário no localStorage
                localStorage.setItem('usuario', JSON.stringify(dataSimulado.usuario));
                
                // Redireciona para a página principal
                redirecionarUsuarioLogado();
            } else {
                alert('Email ou senha incorretos!');
            }
        }, 1000); // Simula um delay de 1 segundo (como se fosse uma requisição real)
    });

    // Função para redirecionar o usuário logado
    function redirecionarUsuarioLogado() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioLogado) {
            window.location.href = 'index.html';
        }
    }
});