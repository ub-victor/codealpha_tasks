document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        {
            id: 1,
            src: 'assets/natural/natural1.jpg',
            alt: 'Beautiful Flower',
            category: 'nature',
            title: 'Beautiful Flower'
        },
        {
            id: 2,
            src: 'assets/architecture/architecture1.jpeg',
            alt: 'Modern architecture',
            category: 'architecture',
            title: 'Modern Building'
        },
        {
            id: 3,
            src: 'assets/people/per1.jpg',
            alt: 'Portrait',
            category: 'people',
            title: 'Winner Photography'
        },
        {
            id: 4,
            src: 'assets/animals/animal1.jpg',
            alt: 'Wild animal in nature',
            category: 'animals',
            title: 'Le Roi des Animaux'
        },
        {
            id: 5,
            src: 'assets/natural/natural2.jpg',
            alt: 'Dense forest',
            category: 'nature',
            title: 'Forest Path'
        },
        {
            id: 6,
            src: 'assets/architecture/architecture2.jpg',
            alt: 'City skyscraper',
            category: 'architecture',
            title: 'Urban Architecture'
        },
        {
            id: 7,
            src: 'assets/people/per2.jpg',
            alt: 'Child playing',
            category: 'people',
            title: 'A big Bro who Everyone wish'
        },
        {
            id: 8,
            src: 'assets/animals/animal2.jpg',
            alt: 'Colorful animal',
            category: 'animals',
            title: 'beauty of the forest'
        },
        {
            id: 9,
            src: 'assets/natural/natural3.jpg',
            alt: 'Waterfall in jungle',
            category: 'nature',
            title: 'Jungle Beauty'
        },
        {
            id: 10,
            src: 'assets/architecture/architecture3.jpg',
            alt: 'Modern bridge',
            category: 'architecture',
            title: 'Suspension Bridge'
        },
        {
            id: 11,
            src: 'assets/people/per3.jpg',
            alt: 'Happy family',
            category: 'people',
            title: 'Constant un mec souriant '
        },
        {
            id: 12,
            src: 'assets/animals/animal3.webp',
            alt: 'Cameleon dans la nature',
            category: 'animals',
            title: 'Cameleon dans la nature'
        },
        {
            id: 13,
            src: 'assets/natural/natural4.jpg',
            alt: 'Beautiful Flower',
            category: 'nature',
            title: 'Beautiful Flower'
        },
        {
            id: 14,
            src: 'assets/architecture/architecture4.jpg',
            alt: 'Modern architecture',
            category: 'architecture',
            title: 'Modern Building'
        },
        {
            id: 15,
            src: 'assets/people/per4.jpg',
            alt: 'Portrait',
            category: 'people',
            title: 'Alicia in Smilled mood'
        },
        {
            id: 16,
            src: 'assets/animals/animal5.jpg',
            alt: 'Wild animal in nature',
            category: 'animals',
            title: 'A tigger in chase '
        },
        {
            id: 17,
            src: 'assets/natural/natural5.jpg',
            alt: 'Dense forest',
            category: 'nature',
            title: 'A river'
        },
        {
            id: 18,
            src: 'assets/architecture/architecture5.jpg',
            alt: 'City skyscraper',
            category: 'architecture',
            title: 'Urban Architecture'
        },
        {
            id: 19,
            src: 'assets/people/per6.jpg',
            alt: 'Child playing',
            category: 'people',
            title: 'A Consacreted Family'
        },
        {
            id: 20,
            src: 'assets/animals/animal6.jpg',
            alt: 'Colorful animal',
            category: 'animals',
            title: 'An animal read A Bible'
        },
        {
            id: 21,
            src: 'assets/natural/natural6.jpg',
            alt: 'Waterfall in jungle',
            category: 'nature',
            title: 'Waterfall In Mountain'
        },
        {
            id: 22,
            src: 'assets/architecture/architecture7.png',
            alt: 'Modern bridge',
            category: 'architecture',
            title: 'Modern Building'
        },
        {
            id: 23,
            src: 'assets/people/per7.jpg',
            alt: 'Happy family',
            category: 'people',
            title: 'My beloved Parent'
        },
        {
            id: 24,
            src: 'assets/animals/animal7.avif',
            alt: 'Cameleon dans la nature',
            category: 'animals',
            title: 'A little pup  puppy'
        }
    ];

    // DOM Elements
    const gallery = document.getElementById('gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        renderGallery(galleryData);
        filteredImages = [...galleryData];
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // Render gallery items
    function renderGallery(images) {
        gallery.innerHTML = '';
        
        if (images.length === 0) {
            gallery.innerHTML = '<p class="empty">No images found in this category</p>';
            return;
        }

        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = image.category;
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="gallery-img">
                <span class="gallery-category">${image.category}</span>
                <div class="gallery-caption">
                    <h3>${image.title}</h3>
                    <p>Click to view larger</p>
                </div>
            `;
            
            gallery.appendChild(galleryItem);
            
            // Add click event to open lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(index);
            });
        });
    }

    // Filter gallery by category
    function filterGallery(category) {
        if (category === 'all') {
            filteredImages = [...galleryData];
        } else {
            filteredImages = galleryData.filter(image => image.category === category);
        }
        renderGallery(filteredImages);
    }

    // Open lightbox with selected image
    function openLightbox(index) {
        currentImageIndex = index;
        const image = filteredImages[index];
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxCaption.textContent = image.title;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxCaption.textContent = image.title;
        
        // Add fade effect
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.style.opacity = 1;
        }, 100);
    }

    // Event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery
            const category = this.dataset.filter;
            filterGallery(category);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Initialize the gallery
    initGallery();
});