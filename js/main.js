// Main JavaScript functionality for Hens-Car Marketplace

class HensCarMarketplace {
    constructor() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.filteredCars = [...carsData];
        this.favorites = JSON.parse(localStorage.getItem('henscar-favorites') || '[]');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderInventory();
        this.updateFavoritesFromStorage();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
                this.setActiveNavLink(link);
            });
        });

        // Search modal
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.getElementById('searchClose');
        
        searchBtn?.addEventListener('click', () => {
            searchModal.classList.add('active');
        });
        
        searchClose?.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.setActiveFilter(tab);
                this.currentFilter = tab.dataset.filter;
                this.filterCars();
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn?.addEventListener('click', () => {
            this.loadMoreCars();
        });

        // Car modal
        const carModal = document.getElementById('carModal');
        const carModalClose = document.getElementById('carModalClose');
        
        carModalClose?.addEventListener('click', () => {
            carModal.classList.remove('active');
        });

        // Close modals on outside click
        [searchModal, carModal].forEach(modal => {
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e.target);
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        menuToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    }

    setupScrollEffects() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.car-card, .service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setActiveFilter(activeTab) {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');
    }

    filterCars() {
        if (this.currentFilter === 'all') {
            this.filteredCars = [...carsData];
        } else {
            this.filteredCars = carsData.filter(car => car.category === this.currentFilter);
        }
        
        this.currentPage = 1;
        this.renderInventory();
    }

    renderInventory() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        if (!inventoryGrid) return;

        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const carsToShow = this.filteredCars.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            inventoryGrid.innerHTML = '';
        }

        carsToShow.forEach((car, index) => {
            if (index >= (this.currentPage - 1) * this.itemsPerPage) {
                const carCard = document.createElement('div');
                carCard.innerHTML = generateCarCard(car);
                inventoryGrid.appendChild(carCard.firstElementChild);
            }
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (endIndex >= this.filteredCars.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }

        // Trigger animations for new cards
        setTimeout(() => {
            const newCards = inventoryGrid.querySelectorAll('.car-card');
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    loadMoreCars() {
        this.currentPage++;
        this.renderInventory();
    }

    updateFavoritesFromStorage() {
        this.favorites.forEach(carId => {
            const car = carsData.find(c => c.id === carId);
            if (car) {
                car.isFavorite = true;
            }
        });
        
        // Update favorites badge
        const badge = document.querySelector('.favorites-btn .badge');
        if (badge) {
            badge.textContent = this.favorites.length;
            badge.style.display = this.favorites.length > 0 ? 'block' : 'none';
        }
    }

    toggleFavorite(carId) {
        const car = carsData.find(c => c.id === carId);
        if (!car) return;

        car.isFavorite = !car.isFavorite;
        
        if (car.isFavorite) {
            this.favorites.push(carId);
        } else {
            this.favorites = this.favorites.filter(id => id !== carId);
        }

        localStorage.setItem('henscar-favorites', JSON.stringify(this.favorites));
        
        // Update UI
        this.renderInventory();
        this.updateFavoritesFromStorage();
        
        // Show feedback
        this.showNotification(
            car.isFavorite ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!',
            car.isFavorite ? 'success' : 'info'
        );
    }

    openCarModal(carId) {
        const car = carsData.find(c => c.id === carId);
        if (!car) return;

        const modal = document.getElementById('carModal');
        const modalBody = document.getElementById('carModalBody');
        
        modalBody.innerHTML = generateCarModal(car);
        modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking outside or pressing escape
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        }, { once: true });
    }

    contactAboutCar(carId) {
        const car = carsData.find(c => c.id === carId);
        if (!car) return;

        const message = `Olá! Tenho interesse no ${car.title} (${car.year}). Gostaria de mais informações.`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav');
        const menuToggle = document.getElementById('menuToggle');
        
        nav.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    z-index: 9999;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    border-left: 4px solid var(--primary-color);
                }
                
                .notification-success {
                    border-left-color: var(--accent-color);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global functions for inline event handlers
window.toggleFavorite = function(carId) {
    marketplace.toggleFavorite(carId);
};

window.openCarModal = function(carId) {
    marketplace.openCarModal(carId);
};

window.contactAboutCar = function(carId) {
    marketplace.contactAboutCar(carId);
};

// Initialize the marketplace when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.marketplace = new HensCarMarketplace();
});

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid var(--border-color);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav.mobile-active {
            transform: translateY(0);
        }
        
        .nav-list {
            flex-direction: column;
            padding: 1rem;
            gap: 0;
        }
        
        .nav-list li {
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-link {
            display: block;
            padding: 1rem;
            text-align: center;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileStyles);