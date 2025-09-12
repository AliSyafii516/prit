document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Efek Astronot Memantul (DVD Logo) ---
    const astronaut = document.querySelector('.astronaut-float');
    if (astronaut) {
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let vx = 2;
        let vy = 2;
        const astronautSize = astronaut.offsetWidth;

        function animateAstronaut() {
            x += vx;
            y += vy;

            if (x + astronautSize > window.innerWidth || x < 0) {
                vx = -vx;
            }
            if (y + astronautSize > window.innerHeight || y < 0) {
                vy = -vy;
            }

            astronaut.style.transform = `translate(${x}px, ${y}px)`;
            
            requestAnimationFrame(animateAstronaut);
        }

        animateAstronaut();
    }
    
    // --- Efek Roket Meluncur Lurus (Bawah ke Atas) ---
    const rocket = document.querySelector('.rocket-launch');
    if (rocket) {
        const initialRocketBottom = parseFloat(getComputedStyle(rocket).bottom);
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const rocketYOffset = initialRocketBottom - (scrollPosition * 0.8);
            rocket.style.transform = `translateY(${rocketYOffset - initialRocketBottom}px)`;
        });
    }

    // --- Efek Bintang Jatuh dan Hujan Meteor ---
    const shootingStarsContainer = document.querySelector('.shooting-stars');
    function createShootingStars() {
        const numberOfStars = 200;
        shootingStarsContainer.innerHTML = '';
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight * 0.5;
            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;
            const randomSize = Math.random() * 2 + 1;
            const randomDuration = Math.random() * 5 + 3;
            const randomDelay = Math.random() * 10;
            star.style.width = `${randomSize * 100}px`;
            star.style.height = `${randomSize / 2}px`;
            star.style.animation = `shootingStarAnimation ${randomDuration}s linear infinite ${randomDelay}s`;
            shootingStarsContainer.appendChild(star);
        }
    }

    const meteorsContainer = document.querySelector('.meteors');
    function createMeteors() {
        const numberOfMeteors = 30;
        meteorsContainer.innerHTML = '';
        for (let i = 0; i < numberOfMeteors; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            const startX = Math.random() * window.innerWidth * 0.4 + window.innerWidth * 0.6;
            const startY = Math.random() * window.innerHeight * 0.3 - 50;
            meteor.style.left = `${startX}px`;
            meteor.style.top = `${startY}px`;
            const randomScale = Math.random() * 0.8 + 0.5;
            const randomDuration = Math.random() * 15 + 20;
            const randomDelay = Math.random() * 30;
            meteor.style.transform = `scale(${randomScale}) rotate(-45deg)`;
            meteor.style.opacity = 0;
            meteor.style.animation = `meteorAnimation ${randomDuration}s linear infinite ${randomDelay}s`;
            meteorsContainer.appendChild(meteor);
        }
    }
    
    createShootingStars();
    createMeteors();

    // --- Logika Audio Autoplay ---
    const audio = document.getElementById('myAudio');
    const audioToggleBtn = document.getElementById('audio-toggle');

    document.body.addEventListener('click', () => {
        audio.play().catch(error => {
            console.log('Autoplay was prevented.');
            audioToggleBtn.style.display = 'block';
        });
    }, { once: true });

    audioToggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioToggleBtn.textContent = 'Pause Music';
        } else {
            audio.pause();
            audioToggleBtn.textContent = 'Play Music';
        }
    });

    // --- Logika Portfolio & Carousel Pop-up ---
    const portfolioItemsData = [
        {
            title: "Sistem Manajemen Desa",
            description: "Aplikasi berbasis web untuk mengelola Pengelolan Desa.",
            image: "portofolio/porto/desa.png",
            link: "#",
            gallery: [
                "portofolio/porto/desa.png",
                "portofolio/porto/login.png",
                "portofolio/porto/dashboard.png"
            ]
        },
        {
            title: "Desain UI/UX Aplikasi ",
            description: "Prototipe desain antarmuka pengguna untuk aplikasi Online Shop.",
            image: "portofolio/porto/ui1.png",
            link: "#",
            gallery: [
                "portofolio/porto/ui1.png",
                "portofolio/porto/ui2.png",
                "portofolio/porto/ui3.png"
            ]
        },
        {
            title: "Pendataan Inventaris",
            description: "Pendataan Inventaris Internal Untuk Pelaporan Akhir Tahun.",
            image: "portofolio/porto/inv.png",
            link: "#",
            gallery: [
                "portofolio/porto/inv.png",
                "portofolio/porto/inv2.png"
            ]
        },
        {
            title: "Technical Solution",
            description: "Maintenance & Troubleshooting Hardware",
            image: "portofolio/porto/1.jpeg",
            link: "#",
            gallery: [
                "portofolio/porto/11.jpeg",
                "portofolio/porto/111.jpeg",
                "portofolio/porto/1.jpeg",
                "portofolio/porto/1111.jpeg",
                "portofolio/porto/11111.jpeg",
                "portofolio/porto/2.jpeg",
                "portofolio/porto/22.jpeg",
                "portofolio/porto/222.jpeg",
                "portofolio/porto/2222.jpeg",
                "portofolio/porto/3.jpeg",
                "portofolio/porto/33.jpeg",
                "portofolio/porto/333.jpeg"
            ]
        }
    ];

    const portfolioGrid = document.getElementById('portfolio-items');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev-btn');
    const nextBtn = document.querySelector('.carousel-next-btn');
    let currentIndex = 0;
    
    function showModal(galleryImages) {
        carouselTrack.innerHTML = '';
        galleryImages.forEach(src => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            const img = document.createElement('img');
            img.src = src;
            slide.appendChild(img);
            carouselTrack.appendChild(slide);
        });
        
        currentIndex = 0;
        updateCarousel();
        modal.style.display = 'flex';
    }

    function updateCarousel() {
        const slideWidth = document.querySelector('.carousel-slide').offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const totalSlides = carouselTrack.children.length;
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const totalSlides = carouselTrack.children.length;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1;
        }
        updateCarousel();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Buat item portofolio
    if (portfolioGrid) {
        portfolioItemsData.forEach(item => {
            const portfolioItemDiv = document.createElement('div');
            portfolioItemDiv.classList.add('portfolio-item');
            portfolioItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="#" class="view-project-btn" data-project-id="${item.title}">Lihat Proyek</a>
            `;
            portfolioGrid.appendChild(portfolioItemDiv);
        });

        portfolioGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-project-btn')) {
                e.preventDefault();
                const projectId = e.target.getAttribute('data-project-id');
                const project = portfolioItemsData.find(p => p.title === projectId);
                if (project && project.gallery) {
                    showModal(project.gallery);
                } else {
                    alert('Galeri proyek tidak tersedia.');
                }
            }
        });
    }

    // --- Logika Penambah Jumlah Pengunjung ---
    const viewCountElement = document.getElementById('view-count');

    // Endpoint CountAPI untuk repositori Anda.
    const countApiUrl = 'https://api.countapi.xyz/hit/alisyafii516.github.io/prit';

    // Ambil data dari CountAPI
    fetch(countApiUrl)
        .then(response => response.json())
        .then(data => {
            if (viewCountElement && data.value) {
                viewCountElement.textContent = data.value;
            }
        })
        .catch(error => {
            console.error('Error fetching view count:', error);
            if (viewCountElement) {
                viewCountElement.textContent = 'N/A';
            }
        });
});
