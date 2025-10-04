// Datos iniciales de productos con precios argentinos
let products = [
    {
        id: 1,
        name: "Burger Max Clásica",
        description: "Carne 100% vacuna, lechuga, tomate, cebolla y salsa especial",
        price: 12000,
        category: "hamburguesas"
    },
    {
        id: 2,
        name: "Burger Max Doble",
        description: "Doble carne, doble queso, panceta, huevo y salsa BBQ",
        price: 18000,
        category: "hamburguesas"
    },
    {
        id: 3,
        name: "Burger Max Veggie",
        description: "Medallón de lentejas y garbanzos, lechuga, tomate y mayonesa vegana",
        price: 13000,
        category: "hamburguesas"
    },
    {
        id: 4,
        name: "Lomito Completo",
        description: "Bife de lomo, jamón, queso, huevo, lechuga, tomate y mayonesa",
        price: 22000,
        category: "lomitos"
    },
    {
        id: 5,
        name: "Lomito Especial",
        description: "Bife de lomo, queso cheddar, panceta crocante y salsa barbacoa",
        price: 24000,
        category: "lomitos"
    },
    {
        id: 6,
        name: "Sandwich de Pollo",
        description: "Pechuga de pollo grillada, lechuga, tomate y mayonesa de ajo",
        price: 11000,
        category: "sandwiches"
    },
    {
        id: 7,
        name: "Sandwich Vegano",
        description: "Pan integral, hummus, verduras asadas y germinados",
        price: 10000,
        category: "sandwiches"
    },
    {
        id: 8,
        name: "Coca Cola 500ml",
        description: "Refresco Coca Cola 500ml",
        price: 5000,
        category: "bebidas"
    },
    {
        id: 9,
        name: "Agua Mineral 500ml",
        description: "Agua mineral sin gas",
        price: 3000,
        category: "bebidas"
    },
    {
        id: 10,
        name: "Jugo de Naranja",
        description: "Jugo de naranja natural exprimido",
        price: 4500,
        category: "bebidas"
    },
    {
        id: 11,
        name: "Helado Artesanal",
        description: "Helado artesanal con topping a elección",
        price: 8000,
        category: "postres"
    },
    {
        id: 12,
        name: "Brownie con Helado",
        description: "Brownie de chocolate con helado de vainilla y salsa de chocolate",
        price: 9500,
        category: "postres"
    }
];

// Estado de la aplicación
let currentUser = null;
let editingProductId = null;

// Elementos del DOM
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const logoutBtn = document.getElementById('logoutBtn');
const categoryTabs = document.querySelectorAll('.category-tab');
const categoryContents = document.querySelectorAll('.category-content');
const addProductForm = document.getElementById('addProductForm');
const verMenuBtn = document.getElementById('verMenuBtn');
const adminProductsContainer = document.getElementById('adminProducts');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - Inicializando...');
    
    // Cargar productos
    loadProducts();
    
    // Event Listeners - CORREGIDOS
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        console.log('Event listener agregado al menú toggle');
    } else {
        console.error('No se encontró el elemento menuToggle');
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', openLoginModal);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Cerrar modales con botón X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            if (loginModal.classList.contains('active')) {
                closeLoginModal();
            }
        });
    });
    
    // Formularios
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Tabs de categorías
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });
    
    // Botón ver menú
    if (verMenuBtn) {
        verMenuBtn.addEventListener('click', function() {
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
});

// Funciones de navegación - CORREGIDAS
function toggleMobileMenu() {
    console.log('toggleMobileMenu ejecutado');
    if (navMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    console.log('Abriendo menú móvil');
    navMenu.classList.add('active');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function closeMobileMenu() {
    console.log('Cerrando menú móvil');
    navMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = ''; // Restaurar scroll
}

function switchCategory(category) {
    // Actualizar tabs activos
    categoryTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Actualizar contenido activo
    categoryContents.forEach(content => {
        if (content.id === category) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Funciones de autenticación
function openLoginModal() {
    loginModal.classList.add('active');
}

function closeLoginModal() {
    loginModal.classList.remove('active');
    loginForm.reset();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === 'admin@burgermax.com' && password === '1234') {
        currentUser = { email: 'admin@burgermax.com' };
        closeLoginModal();
        showAdminPanel();
    } else {
        alert('Credenciales incorrectas. Use: admin@burgermax.com | 1234');
    }
}

function logout() {
    currentUser = null;
    hideAdminPanel();
}

function showAdminPanel() {
    adminPanel.classList.add('active');
    loadAdminProducts();
}

function hideAdminPanel() {
    adminPanel.classList.remove('active');
}

// Funciones de productos
function loadProducts() {
    // Limpiar grids
    document.querySelectorAll('.products-grid').forEach(grid => {
        grid.innerHTML = '';
    });
    
    // Agrupar productos por categoría
    const productsByCategory = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });
    
    // Renderizar productos por categoría
    for (const category in productsByCategory) {
        const grid = document.getElementById(`${category}-grid`);
        if (grid) {
            productsByCategory[category].forEach(product => {
                grid.appendChild(createProductCard(product));
            });
        }
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Iconos por categoría
    const icons = {
        hamburguesas: 'fas fa-hamburger',
        lomitos: 'fas fa-bacon',
        sandwiches: 'fas fa-bread-slice',
        bebidas: 'fas fa-wine-glass-alt',
        postres: 'fas fa-ice-cream'
    };
    
    // Formatear precio en formato argentino
    const formattedPrice = new Intl.NumberFormat('es-AR').format(product.price);
    
    card.innerHTML = `
        <div class="product-img">
            <i class="${icons[product.category]}"></i>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">
                <span class="price">$${formattedPrice}</span>
            </div>
        </div>
    `;
    
    return card;
}

function loadAdminProducts() {
    adminProductsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'admin-product-card';
        
        // Formatear precio en formato argentino
        const formattedPrice = new Intl.NumberFormat('es-AR').format(product.price);
        
        productCard.innerHTML = `
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="admin-product-price">$${formattedPrice}</div>
                <small>Categoría: ${product.category}</small>
            </div>
            <div class="admin-product-actions">
                <button class="btn-edit" data-id="${product.id}">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" data-id="${product.id}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        adminProductsContainer.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

function handleAddProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    
    if (editingProductId) {
        // Editar producto existente
        const productIndex = products.findIndex(p => p.id === editingProductId);
        if (productIndex !== -1) {
            products[productIndex] = {
                ...products[productIndex],
                name,
                description,
                price,
                category
            };
        }
        editingProductId = null;
        
        // Restaurar texto del botón
        const submitBtn = addProductForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Agregar Producto';
    } else {
        // Agregar nuevo producto
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            name,
            description,
            price,
            category
        });
    }
    
    // Actualizar vistas
    loadProducts();
    loadAdminProducts();
    addProductForm.reset();
    
    // Mostrar mensaje de éxito
    alert('Producto ' + (editingProductId ? 'actualizado' : 'agregado') + ' correctamente');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        editingProductId = productId;
        
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        
        // Cambiar texto del botón
        const submitBtn = addProductForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
        
        // Scroll al formulario
        document.querySelector('.add-product-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        loadProducts();
        loadAdminProducts();
        alert('Producto eliminado correctamente');
    }
}

// Cerrar menú al redimensionar la ventana si vuelve a desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});