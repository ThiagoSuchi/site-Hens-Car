// Component generators for the marketplace

// Generate car card HTML
function generateCarCard(car) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(car.price);

    const featuresHTML = car.features.map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');

    const favoriteClass = car.isFavorite ? 'fas' : 'far';

    return `
        <div class="car-card" data-car-id="${car.id}" data-category="${car.category}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.title}" loading="lazy">
                <div class="car-badge">${car.badge}</div>
                <button class="favorite-btn" onclick="toggleFavorite(${car.id})">
                    <i class="${favoriteClass} fa-heart"></i>
                </button>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.title}</h3>
                <p class="car-details">${car.year} • ${car.brand}</p>
                <div class="car-features">
                    ${featuresHTML}
                </div>
                <div class="car-price">${formattedPrice}</div>
                <div class="car-actions">
                    <button class="btn btn-outline" onclick="openCarModal(${car.id})">
                        Ver Detalhes
                    </button>
                    <button class="btn btn-primary" onclick="contactAboutCar(${car.id})">
                        Contatar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate car modal content
function generateCarModal(car) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(car.price);

    const specsHTML = Object.entries(car.specs).map(([key, value]) => {
        const labels = {
            engine: 'Motor',
            power: 'Potência',
            torque: 'Torque',
            acceleration: 'Aceleração',
            topSpeed: 'Velocidade Máxima',
            transmission: 'Transmissão',
            drivetrain: 'Tração'
        };
        
        return `
            <div class="spec-item">
                <span class="spec-label">${labels[key]}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }).join('');

    const featuresHTML = car.features.map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');

    return `
        <div class="car-modal-header">
            <img src="${car.image}" alt="${car.title}" class="modal-car-image">
            <div class="modal-car-info">
                <div class="car-badge">${car.badge}</div>
                <h2>${car.title}</h2>
                <p class="modal-car-details">${car.year} • ${car.brand}</p>
                <div class="modal-car-price">${formattedPrice}</div>
                <div class="modal-car-features">
                    ${featuresHTML}
                </div>
            </div>
        </div>
        
        <div class="car-modal-content-body">
            <div class="modal-section">
                <h3>Descrição</h3>
                <p>${car.description}</p>
            </div>
            
            <div class="modal-section">
                <h3>Especificações Técnicas</h3>
                <div class="specs-grid">
                    ${specsHTML}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-outline" onclick="toggleFavorite(${car.id})">
                    <i class="${car.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    ${car.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
                <button class="btn btn-primary" onclick="contactAboutCar(${car.id})">
                    <i class="fas fa-phone"></i>
                    Entrar em Contato
                </button>
            </div>
        </div>
    `;
}

// Add modal styles
function addModalStyles() {
    const styles = `
        <style>
        .car-modal-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
            align-items: center;
        }
        
        .modal-car-image {
            width: 100%;
            height: 300px;
            object-fit: contain;
            border-radius: 0.5rem;
        }
        
        .modal-car-info {
            padding: 1rem;
        }
        
        .modal-car-price {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 1rem 0;
        }
        
        .modal-car-features {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 1rem;
        }
        
        .car-modal-content-body {
            padding: 0 2rem 2rem;
        }
        
        .modal-section {
            margin-bottom: 2rem;
        }
        
        .modal-section h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .spec-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem;
            background: var(--bg-secondary);
            border-radius: 0.5rem;
        }
        
        .spec-label {
            font-weight: 500;
            color: var(--text-secondary);
        }
        
        .spec-value {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }
        
        @media (max-width: 768px) {
            .car-modal-header {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .modal-actions {
                flex-direction: column;
            }
            
            .specs-grid {
                grid-template-columns: 1fr;
            }
        }
        </style>
    `;
    
    if (!document.querySelector('#modal-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'modal-styles';
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }
}

// Initialize modal styles
addModalStyles();