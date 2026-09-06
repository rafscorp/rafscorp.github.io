// efeito de "digitação" no subtítulo do hero, trocando entre as linguagens
// uso setTimeout recursivo em vez de setInterval porque a velocidade de
// digitar e apagar é diferente - com setInterval ia ter que fazer gambiarra
// pra variar o delay, assim cada chamada já agenda a proxima com o tempo certo
const frases = [
  'aprendendo C',
  'praticando Python',
  'estudando Java',
  'construindo com React',
];

const elementoTexto = document.getElementById('typed');
let indiceFrase = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {
  const fraseAtual = frases[indiceFrase];

  if (!apagando) {
    indiceLetra++;
    elementoTexto.textContent = fraseAtual.slice(0, indiceLetra);

    if (indiceLetra === fraseAtual.length) {
      apagando = true;
      setTimeout(digitar, 1600); // pausa lendo a frase completa antes de apagar
      return;
    }
  } else {
    indiceLetra--;
    elementoTexto.textContent = fraseAtual.slice(0, indiceLetra);

    if (indiceLetra === 0) {
      apagando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
    }
  }

  setTimeout(digitar, apagando ? 35 : 70);
}

if (elementoTexto) {
  digitar();
}

// destaca o link do menu correspondente à seção visível no momento,
// usando IntersectionObserver em vez de escutar 'scroll' direto (mais leve,
// não recalcula nada em toda pixel rolado)
const secoes = document.querySelectorAll('main .section, .hero');
const linksNav = document.querySelectorAll('.nav-links a');

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const id = entrada.target.id;
        linksNav.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' },
);

secoes.forEach((secao) => observador.observe(secao));
