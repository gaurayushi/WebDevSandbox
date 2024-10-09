const carouselContainer = document.querySelector('.carousel-container');


let scrollAmount = 0;
const scrollStep = 300;

function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= carouselContainer.scrollWidth - carouselContainer.clientWidth) {
        scrollAmount = 0; 
    }
    carouselContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
    });
}

setInterval(autoScroll, 3000);

const heroSection = document.getElementById('hero');
const heroText = document.getElementById('hero-text');


const heroImages = [
    {
        img: 'images/back01.png',
      
    },
    {
        img: 'images/back02.png',
       
    },
    {
        img: 'images/back03.png',
       
    }
];

let currentImageIndex = 0;

function changeHeroContent() {
   
    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImages[currentImageIndex].img})`;
    
  
    heroText.style.opacity = '0';
    
    
    setTimeout(() => {
        heroText.textContent = heroImages[currentImageIndex].text;
        heroText.style.opacity = '1'; 
        heroText.style.transform = 'translateY(0)';
    }, 1000);

    
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
}


setInterval(changeHeroContent, 5000);


changeHeroContent();



function scrollLeft() {
    document.querySelector('.carousel-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function scrollRight() {
    document.querySelector('.carousel-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}
