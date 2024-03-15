import { Product } from './types.ts';

const API_URL = 'https://dummyjson.com/products';

function showProducts(products: Product[]):void  {
    const container = document.getElementById('productContainer');
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div') as HTMLDivElement;
        card.classList.add('product-card');
        const firstImageUrl = product.images.length > 0 ? product.images[0] : ''; // Ta den första bilden, eller en tom sträng om det inte finns någon bild

        if (firstImageUrl) {
            const img = document.createElement('img');
            img.src = firstImageUrl;
            img.alt = product.title;
            card.appendChild(img);
        }

        // Uppbyggnad av produktkort
        const details = document.createElement('div');
        details.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <div>Rating: ${product.rating}</div>
            <div>Stock: ${product.stock} ${product.stock < 10 ? '<span class="low-stock">Low stock</span>' : ''}</div>
            <div>Category: ${product.category}</div>
            <button>Add to cart</button>
        `;

        // Lägg till details i kortet
        card.appendChild(details);
        container.appendChild(card);
    });
}

// Sökfunktion 
async function fetchProducts(searchTerm?: string): Promise<Product[]> {
    let url = API_URL;
    if (searchTerm) {
        url += `/search?q=${searchTerm}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const responseData = await response.json();
        return responseData.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

document.getElementById('searchButton')?.addEventListener('click', async () => {
    const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const products = await fetchProducts(searchInput);
    showProducts(products);
});

fetchProducts().then(products => showProducts(products));