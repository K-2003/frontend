document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Menu Page Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all menu categories
                const categories = document.querySelectorAll('.menu-category');
                categories.forEach(cat => cat.classList.remove('active'));

                // Show the selected category
                const categoryId = this.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }

    // Order Page Category Tabs
    const orderCategoryTabs = document.querySelectorAll('.order-category-tab');
    if (orderCategoryTabs.length > 0) {
        orderCategoryTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                orderCategoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all order categories
                const categories = document.querySelectorAll('.order-category');
                categories.forEach(cat => cat.classList.remove('active'));

                // Show the selected category
                const categoryId = this.getAttribute('data-category') + '-items';
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }

    // Order Form Quantity Buttons
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');

    if (minusButtons.length > 0 && plusButtons.length > 0) {
        minusButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const input = this.nextElementSibling;
                let value = parseInt(input.value);
                if (value > 0) {
                    value--;
                    input.value = value;
                    updateOrderSummary();
                }
            });
        });

        plusButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const input = this.previousElementSibling;
                let value = parseInt(input.value);
                value++;
                input.value = value;
                updateOrderSummary();
            });
        });

        // Update when quantity is directly changed
        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', function () {
                if (parseInt(this.value) < 0) {
                    this.value = 0;
                }
                updateOrderSummary();
            });
        });
    }

    // Order Type Change
    const orderTypeSelect = document.getElementById('orderType');
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', function () {
            updateOrderSummary();
        });
    }

    // Order Summary Update
    function updateOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const deliveryFeeElement = document.getElementById('deliveryFee');
        const totalElement = document.getElementById('total');
        const emptyCartMessage = document.querySelector('.empty-cart');

        if (!orderItems || !subtotalElement || !taxElement || !deliveryFeeElement || !totalElement) return;

        // Clear current order summary items
        orderItems.innerHTML = '';

        let subtotal = 0;
        let hasItems = false;

        // Get all order items with quantity > 0
        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                hasItems = true;
                const itemContainer = input.closest('.order-item');
                const itemName = itemContainer.querySelector('h4').textContent;
                const itemPrice = parseFloat(itemContainer.querySelector('.price').textContent.replace('৳', ''));
                const itemTotal = quantity * itemPrice;
                subtotal += itemTotal;

                // Create order summary item
                const summaryItem = document.createElement('div');
                summaryItem.className = 'summary-item';
                summaryItem.innerHTML = `
                    <div class="summary-item-name">
                        <span>${quantity}x ${itemName}</span>
                    </div>
                    <div class="summary-item-price">৳${itemTotal.toFixed(2)}</div>
                `;
                orderItems.appendChild(summaryItem);
            }
        });

        // Show empty cart message if no items
        if (!hasItems) {
            const emptyCart = document.createElement('p');
            emptyCart.className = 'empty-cart';
            emptyCart.textContent = 'Your cart is empty';
            orderItems.appendChild(emptyCart);
            subtotalElement.textContent = '৳0.00';
            taxElement.textContent = '৳0.00';
            deliveryFeeElement.textContent = '৳0.00';
            totalElement.textContent = '৳0.00';
            return;
        }

        // Calculate VAT, delivery fee, and total
        const vat = subtotal * 0.15; // 15% VAT for Bangladesh
        let deliveryFee = 0;

        const orderType = document.getElementById('orderType').value;
        if (orderType === 'delivery') {
            deliveryFee = 60; // Delivery fee in BDT
        }

        const total = subtotal + vat + deliveryFee;

        // Update summary
        subtotalElement.textContent = '৳' + subtotal.toFixed(2);
        taxElement.textContent = '৳' + vat.toFixed(2);
        deliveryFeeElement.textContent = '৳' + deliveryFee.toFixed(2);
        totalElement.textContent = '৳' + total.toFixed(2);
    }

    // Handle Order Form Submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Check if cart is empty
            const qtyInputs = document.querySelectorAll('.qty-input');
            let hasItems = false;
            qtyInputs.forEach(input => {
                if (parseInt(input.value) > 0) {
                    hasItems = true;
                }
            });

            if (!hasItems) {
                alert('Please add at least one item to your order.');
                return;
            }

            // Simulate order submission
            alert('Thank you for your order! It will be prepared shortly.');

            // Reset form fields (but not the cart items)
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';
            document.getElementById('orderType').value = '';
            document.getElementById('deliveryTime').value = '';
            document.getElementById('specialInstructions').value = '';
        });
    }

    // Login/Signup Page Tab Switching
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                authTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all auth forms
                const authForms = document.querySelectorAll('.auth-form');
                authForms.forEach(form => form.classList.remove('active'));

                // Show the selected auth form
                const authType = this.getAttribute('data-auth');
                document.getElementById(authType).classList.add('active');
            });
        });
    }

    // Login Form Submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulating login authentication
            alert('Login functionality would be connected to a backend authentication system.');
            // Reset form
            this.reset();
        });
    }

    // Signup Form Submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Checking if passwords match
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Checking terms agreement
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms and Conditions.');
                return;
            }

            // Simulating account creation
            alert('Account creation would be processed on a backend server.');
            // Reset form
            this.reset();
        });
    }

    // Map Zoom Controls
    const mapContainer = document.querySelector('.custom-map');
    const zoomInBtn = document.querySelector('.map-zoom-btn:first-child');
    const zoomOutBtn = document.querySelector('.map-zoom-btn:last-child');

    if (mapContainer && zoomInBtn && zoomOutBtn) {
        let scale = 1;
        const maxScale = 2;
        const minScale = 1;
        const scaleStep = 0.2;

        // Set initial transform
        mapContainer.style.transform = `scale(${scale})`;

        // Zoom in function
        zoomInBtn.addEventListener('click', function () {
            if (scale < maxScale) {
                scale += scaleStep;
                mapContainer.style.transform = `scale(${scale})`;
            }
        });

        // Zoom out function
        zoomOutBtn.addEventListener('click', function () {
            if (scale > minScale) {
                scale -= scaleStep;
                mapContainer.style.transform = `scale(${scale})`;
            }
        });

        // Add hover effect to map marker
        const mapMarker = document.querySelector('.map-marker');
        if (mapMarker) {
            mapMarker.addEventListener('mouseenter', function () {
                this.style.animation = 'none';
                this.style.transform = 'translate(-50%, -50%) scale(1.3)';
            });

            mapMarker.addEventListener('mouseleave', function () {
                this.style.animation = 'pulse 2s infinite';
            });
        }
    }
}); 


function searchMenu() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toLowerCase();
    let menuItems = document.getElementById("menuItems");
    let categories = menuItems.getElementsByClassName("menu-category");

    for (let i = 0; i < categories.length; i++) {
        let items = categories[i].getElementsByClassName("menu-item");
        let categoryVisible = false;

        for (let j = 0; j < items.length; j++) {
            let title = items[j].getElementsByTagName("h4")[0];
            if (title) {
                let textValue = title.textContent || title.innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    items[j].style.display = "";
                    categoryVisible = true;
                } else {
                    items[j].style.display = "none";
                }
            }
        }

        if (categoryVisible) {
            categories[i].style.display = "block";
        } else {
            categories[i].style.display = "none";
        }
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
    // Select element by class name (assumes only one)
    const cartCountElem = document.querySelector('.cart-item-count');
    
    if (cartCountElem) {
      cartCountElem.textContent = count;
      cartCountElem.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }
  
  updateCartCount();
  