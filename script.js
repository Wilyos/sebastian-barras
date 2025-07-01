let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let contacto = document.querySelector('#btn-contacto');
let sobreMi = document.querySelector('#btn-sobreMi');



// Carrusel de Clientes
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');
let index = 0;
const visible = window.innerWidth < 700 ? 2 : 3;


for (let i = 0; i < visible; i++) {
  const clone = items[i].cloneNode(true);
  track.appendChild(clone);
}


function updateCarousel(animate = true) {
  const itemWidth = items[0].offsetWidth + 32; // 32px gap
  if (animate) {
    track.style.transition = 'transform 0.5s ease';
  } else {
    track.style.transition = 'none';
  }
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

/* btnLeft.addEventListener('click', () => {
  if (index > 0) index--;
  updateCarousel();
});
btnRight.addEventListener('click', () => {
  if (index < items.length - visible) index++;
  updateCarousel();
});  */

let autoSlide = setInterval(() => {
  index++;
  updateCarousel();
  // Si llegamos al final de los clones, reseteamos sin animación
  if (index === items.length) {
    setTimeout(() => {
      index = 0;
      updateCarousel(false);
    }, 500); // Espera a que termine la animación
  }
}, 2500);

window.addEventListener('resize', () => {
  visible = window.innerWidth < 700 ? 2 : 3;
  updateCarousel();
});

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    if (index < items.length - visible) {
      index++;
    } else {
      index = 0;
    }
    updateCarousel();
  }, 2500);
});

updateCarousel();


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

contacto.onclick = (e) => {
    e.preventDefault();
    const downloadLink = document.querySelector('#downloadContact');
    if (downloadLink) {
        downloadLink.click();
    }
};


sobreMi.onclick = () => {
    document.getElementById("sobreMi").scrollIntoView({
        behavior:"smooth"
    });
}

const vcardData = `
BEGIN:VCARD
VERSION:3.0
FN:Sebastian Cano
ORG:Sistemas litográficos
TEL;TYPE=CELL:+57 3132444781
EMAIL:scano@sistemaslitograficos.com
END:VCARD
  `.trim();



  const blob = new Blob([vcardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.getElementById('downloadContact');
  downloadLink.href = url;