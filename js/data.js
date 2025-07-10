// Car inventory data
const carsData = [
    {
        id: 1,
        title: "Porsche 911 Turbo S",
        brand: "Porsche",
        year: 2024,
        price: 1890000,
        image: "./img/1.png",
        category: "sports",
        features: ["640 CV", "Automático", "AWD", "Turbo"],
        description: "O Porsche 911 Turbo S é um carro esportivo de alto desempenho que combina luxo, tecnologia avançada e uma dinâmica de condução excepcional. É projetado para aqueles que buscam a melhor experiência de condução, seja em pistas de corrida ou nas estradas do dia a dia.",
        specs: {
            engine: "3.8L Twin-Turbo H6",
            power: "640 CV",
            torque: "800 Nm",
            acceleration: "2.7s (0-100 km/h)",
            topSpeed: "330 km/h",
            transmission: "PDK 8 velocidades",
            drivetrain: "AWD"
        },
        gallery: ["./img/1.png"],
        badge: "Novo",
        isFavorite: false
    },
    {
        id: 2,
        title: "Ferrari Portofino",
        brand: "Ferrari",
        year: 2020,
        price: 1250000,
        image: "./img/2.png",
        category: "luxury",
        features: ["Conversível", "V8", "RWD", "Turbo"],
        description: "A Ferrari Portofino é um exemplo de excelência italiana no mundo dos supercarros conversíveis, combinando estilo sofisticado, desempenho excepcional e tecnologia avançada para oferecer uma experiência de condução emocionante e luxuosa.",
        specs: {
            engine: "3.9L Twin-Turbo V8",
            power: "600 CV",
            torque: "760 Nm",
            acceleration: "3.5s (0-100 km/h)",
            topSpeed: "320 km/h",
            transmission: "DCT 7 velocidades",
            drivetrain: "RWD"
        },
        gallery: ["./img/2.png"],
        badge: "Premium",
        isFavorite: true
    },
    {
        id: 3,
        title: "Lamborghini Aventador S",
        brand: "Lamborghini",
        year: 2022,
        price: 2100000,
        image: "./img/3.png",
        category: "sports",
        features: ["V12", "AWD", "750 CV", "Aspirado"],
        description: "A Lamborghini Aventador S é uma obra-prima da engenharia automotiva e um ícone de design e desempenho. Não é apenas um carro esportivo, mas uma obra de arte sobre rodas que combina desempenho extremo com um design icônico e luxuoso.",
        specs: {
            engine: "6.5L V12",
            power: "740 CV",
            torque: "690 Nm",
            acceleration: "2.9s (0-100 km/h)",
            topSpeed: "350 km/h",
            transmission: "ISR 7 velocidades",
            drivetrain: "AWD"
        },
        gallery: ["./img/3.png"],
        badge: "Exclusivo",
        isFavorite: false
    },
    {
        id: 4,
        title: "McLaren 720S",
        brand: "McLaren",
        year: 2023,
        price: 1750000,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "sports",
        features: ["V8 Turbo", "RWD", "720 CV", "Carbono"],
        description: "O McLaren 720S representa o ápice da engenharia britânica em supercarros, oferecendo uma combinação única de desempenho extremo, tecnologia de ponta e design aerodinâmico revolucionário.",
        specs: {
            engine: "4.0L Twin-Turbo V8",
            power: "720 CV",
            torque: "770 Nm",
            acceleration: "2.8s (0-100 km/h)",
            topSpeed: "341 km/h",
            transmission: "SSG 7 velocidades",
            drivetrain: "RWD"
        },
        gallery: ["https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"],
        badge: "Novo",
        isFavorite: true
    },
    {
        id: 5,
        title: "Audi R8 V10 Plus",
        brand: "Audi",
        year: 2023,
        price: 980000,
        image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "sports",
        features: ["V10", "AWD", "610 CV", "Quattro"],
        description: "O Audi R8 V10 Plus combina a precisão alemã com o desempenho de um supercarro, oferecendo uma experiência de condução emocionante com o conforto e a tecnologia que você espera da Audi.",
        specs: {
            engine: "5.2L V10",
            power: "610 CV",
            torque: "560 Nm",
            acceleration: "3.2s (0-100 km/h)",
            topSpeed: "330 km/h",
            transmission: "S tronic 7 velocidades",
            drivetrain: "Quattro AWD"
        },
        gallery: ["https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800"],
        badge: "Premium",
        isFavorite: false
    },
    {
        id: 6,
        title: "BMW i8",
        brand: "BMW",
        year: 2022,
        price: 750000,
        image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "electric",
        features: ["Híbrido", "AWD", "374 CV", "Elétrico"],
        description: "O BMW i8 representa o futuro dos carros esportivos, combinando um motor elétrico com um motor a combustão para oferecer desempenho excepcional com eficiência energética.",
        specs: {
            engine: "1.5L Turbo + Motor Elétrico",
            power: "374 CV",
            torque: "570 Nm",
            acceleration: "4.4s (0-100 km/h)",
            topSpeed: "250 km/h",
            transmission: "Automática 6 velocidades",
            drivetrain: "AWD"
        },
        gallery: ["https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800"],
        badge: "Eco",
        isFavorite: false
    }
];

// Filter categories
const categories = {
    all: "Todos",
    sports: "Esportivos",
    luxury: "Luxo",
    suv: "SUV",
    electric: "Elétricos"
};

// Export data for use in other files
window.carsData = carsData;
window.categories = categories;