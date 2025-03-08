// Slideshow automático
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    // Oculta todos os slides
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    // Mostra o slide atual
    slides[index].classList.add("active");
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

// Inicia o slideshow
setInterval(nextSlide, 7000); // Muda a cada 7 segundos

// Mostra o primeiro slide ao carregar a página
showSlide(slideIndex);

// Carrinho (exemplo simples)
const carrinhoValor = document.getElementById("carrinho-valor");
const carrinhoValorMenu = document.getElementById("carrinho-valor-menu");
let valorTotal = 0;

function adicionarAoCarrinho(valor) {
    valorTotal += valor;
    carrinhoValor.textContent = valorTotal.toFixed(2);
    carrinhoValorMenu.textContent = valorTotal.toFixed(2);
}

// Exemplo de adicionar produto
adicionarAoCarrinho(0.00); // Adiciona R$ 10.50 ao carrinho

// Mostrar/ocultar carrinho no topo e no menu ao rolar a página
const carrinhoLoginTopo = document.querySelector(".carrinho-login");
const carrinhoLoginMenu = document.querySelector(".carrinho-login-menu");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) { // Após rolar 100px
        carrinhoLoginTopo.style.display = "none"; // Oculta o carrinho no topo
        carrinhoLoginMenu.classList.add("visible"); // Mostra o carrinho no menu
    } else {
        carrinhoLoginTopo.style.display = "flex"; // Mostra o carrinho no topo
        carrinhoLoginMenu.classList.remove("visible"); // Oculta o carrinho no menu
    }
});