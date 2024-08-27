const carousel = document.querySelector('.cards');
const cards = document.querySelectorAll('.card'); // Selecionar todos os cards
const cardWidth = document.querySelector('.card').offsetWidth + 10; // Largura do card + margem
const totalCards = cards.length; // Número total de cards
let scrollPosition = 0;
let autoSlideInterval;

// Função para mover o carrossel
function moveCarousel(direction) {
  const containerWidth = document.querySelector('.carousel').offsetWidth;
  const maxScroll = (totalCards * cardWidth) - containerWidth; // Total de cards * largura do card menos o tamanho do container

  if (direction === 'next') {
    scrollPosition += cardWidth;
    if (scrollPosition > maxScroll) {
      scrollPosition = 0; // Reiniciar o carrossel ao chegar ao final
    }
  } else if (direction === 'prev') {
    scrollPosition -= cardWidth;
    if (scrollPosition < 0) {
      scrollPosition = maxScroll; // Voltar ao final se for menor que 0
    }
  }

  carousel.style.transform = `translateX(-${scrollPosition}px)`;
}

// Eventos dos botões
document.querySelector('.next-btn').addEventListener('click', () => moveCarousel('next'));
document.querySelector('.prev-btn').addEventListener('click', () => moveCarousel('prev'));

// Ativar o carrossel automático
function startAutoSlide() {
  autoSlideInterval = setInterval(() => moveCarousel('next'), 3000); // 3 segundos para trocar de card
}

// Parar o carrossel quando o mouse estiver sobre ele
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Iniciar o carrossel automaticamente
startAutoSlide();

// Parar o carrossel quando o mouse passar sobre ele
carousel.addEventListener('mouseover', stopAutoSlide);

// Retomar o carrossel quando o mouse sair
carousel.addEventListener('mouseout', startAutoSlide);
