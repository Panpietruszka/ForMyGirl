// --- FUNKCJE ZARZĄDZANIA PRZEWIJANIEM ---
function disableScroll() {
    document.body.classList.add('no-scroll');
}

function enableScroll() {
    document.body.classList.remove('no-scroll');
}

// --- OBSŁUGA PRZYCISKU ---
const openButton = document.getElementById('openButton');
const mouseScroll = document.getElementById('mouse_scroll'); 

if (openButton) { // Sprawdzenie, czy przycisk istnieje
    openButton.addEventListener('click', () => {
        enableScroll(); 
        mouseScroll.style.display = 'block';
        openButton.style.display = 'none';

        const nextSection = document.querySelector('.text-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


// --- LOGIKA ANIMACJI PRZY PRZEWIJANIU (SCROLL REVEAL - NIESKOŃCZONA) ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element wchodzi w widok - usuń klasy, aby uruchomić animację
                entry.target.classList.remove('scale-90', 'opacity-0');
            } else {
                // Element wychodzi z widoku - dodaj klasy, aby przywrócić stan początkowy (dla ponownej animacji)
                entry.target.classList.add('scale-90', 'opacity-0');
            }
        });
    }, {
        // Opcje obserwatora
        threshold: 0.1, // Animacja odpali się, gdy 10% elementu będzie widoczne
        rootMargin: "0px 0px -100px 0px" // Lekko przesuń "strefę widzenia" w górę
    });

    // Wyszukaj wszystkie sekcje/elementy z klasą 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // --- KONFIGURACJA I GENEROWANIE IKON (Oryginalna logika) ---
    const NUMBER_OF_ICONS = 30;
    const ICON_SIZE = 20; 

    const ICON_SOURCES = [
        'images/heart_one.png',
        'images/heart_two.png',
        'images/heart_three.png',
        'images/heart_four.png',
        'images/hearts.png',
        'images/love.png'
    ];

    const container = document.getElementById('icon-container');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createRandomIcon() {
        const randomIndex = getRandomInt(0, ICON_SOURCES.length - 1);
        const selectedIconSource = ICON_SOURCES[randomIndex];
        
        const imgElement = document.createElement('img');
        imgElement.src = selectedIconSource;
        imgElement.alt = "Losowa ikona";
        imgElement.classList.add('icon-image'); 

        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('icon-wrapper'); 
        iconWrapper.appendChild(imgElement);

        const minDuration = 2.0;
        const maxDuration = 5.0;
        const randomDuration = (Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2);
        const maxDelay = 3.0;
        const randomDelay = (Math.random() * maxDelay).toFixed(2);

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const randomX = getRandomInt(0, containerWidth - ICON_SIZE);
        const randomY = getRandomInt(0, containerHeight - ICON_SIZE);
        const randomRotation = getRandomInt(0, 90); 
        const randomScale = (Math.random() * (1.2 - 0.8) + 0.8).toFixed(2);

        iconWrapper.style.left = `${randomX}px`;
        iconWrapper.style.top = `${randomY}px`;
        
        iconWrapper.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
        
        imgElement.style.animationDelay = `${randomDelay}s`;
        imgElement.style.animationDuration = `${randomDuration}s`;

        return iconWrapper; 
    }
    
    // Upewnij się, że container istnieje, zanim dodasz do niego ikony
    if (container) {
        for (let i = 0; i < NUMBER_OF_ICONS; i++) {
            const newIcon = createRandomIcon();
            container.appendChild(newIcon);
        }
    }
});