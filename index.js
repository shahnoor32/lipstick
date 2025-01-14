// Initialize cart items and total price
let cartItems = [];
let totalPrice = 0;

// Function to update the cart count and total price
function updateCart() {
    // Update cart count
    document.getElementById('cart-count').textContent = cartItems.length;

    // Update cart items list
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = ''; // Clear the existing list

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="btn btn-sm btn-danger float-right remove-item" data-name="${item.name}">Remove</button>
            <button class="btn btn-sm btn-secondary float-right mr-2 increase-item" data-name="${item.name}">+</button>
            <button class="btn btn-sm btn-secondary float-right mr-2 decrease-item" data-name="${item.name}">-</button>
        `;
        cartList.appendChild(listItem);
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to update the quantity of an item
function updateItemQuantity(name, operation) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        if (operation === 'increase') {
            item.quantity++;
            totalPrice += item.price;
        } else if (operation === 'decrease' && item.quantity > 1) {
            item.quantity--;
            totalPrice -= item.price;
        }
        updateCart();
    }
}

// Function to remove an item from the cart
function removeItem(name) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        totalPrice -= cartItems[index].price * cartItems[index].quantity;
        cartItems.splice(index, 1);
        updateCart();
    }
}

// Add event listener to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        // Check if item already exists in the cart
        const existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            // If it exists, just increase the quantity
            updateItemQuantity(itemName, 'increase');
        } else {
            // If it's a new item, add it to the cart
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            totalPrice += itemPrice;
            updateCart();
        }
    });
});

// Add event listener to handle cart item quantity updates and removals
document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('increase-item')) {
        const itemName = event.target.getAttribute('data-name');
        updateItemQuantity(itemName, 'increase');
    }

    if (event.target.classList.contains('decrease-item')) {
        const itemName = event.target.getAttribute('data-name');
        updateItemQuantity(itemName, 'decrease');
    }

    if (event.target.classList.contains('remove-item')) {
        const itemName = event.target.getAttribute('data-name');
        removeItem(itemName);
    }
});

