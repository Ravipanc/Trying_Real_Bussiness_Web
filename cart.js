// cart.js

// Initialize cart as an empty array
/*let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartList();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCartList();
}

// Function to update the cart list in the HTML
// Function to update the cart list in the HTML
function updateCartList() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${formatIndianCurrency(item.price)}`;
        cartList.appendChild(listItem);
    });
}

// Function to format a number as Indian currency
function formatIndianCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

document.getElementById('viewCartBtn').addEventListener('click', () => {
    const cartSection = document.getElementById('cartSection');
    if (cartSection.style.display === 'none') {
        cartSection.style.display = 'block';
        updateCartList();
    } else {
        cartSection.style.display = 'none';
    }
});


// Attach event listeners to buttons
document.getElementById('viewCartBtn').addEventListener('click', updateCartList);
document.getElementById('clearCartBtn').addEventListener('click', clearCart);
*/

// cart.js

// Initialize cart as an empty array
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartList();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCartList();
}

// Function to update the cart list in the HTML
function updateCartList() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${formatIndianCurrency(item.price)}`;
        cartList.appendChild(listItem);
    });
}

// Function to format a number as Indian currency
function formatIndianCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

// Toggle the cart section and update the cart list when the "View Cart" button is clicked
document.getElementById('viewCartBtn').addEventListener('click', () => {
    const cartSection = document.getElementById('cartSection');
    if (cartSection.style.display === 'none') {
        cartSection.style.display = 'block';
        updateCartList();
    } else {
        cartSection.style.display = 'none';
    }
});

// Attach event listener to the "Clear Cart" button
document.getElementById('clearCartBtn').addEventListener('click', clearCart);


