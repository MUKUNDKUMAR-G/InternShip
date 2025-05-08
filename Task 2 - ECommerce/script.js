// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1799,
    image:
      "https://www.boat-lifestyle.com/cdn/shop/products/main-img3_600x.png?v=1616562632&width=150",
    stock: 10,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1399,
    image:
      "https://www.gonoise.com/cdn/shop/files/1_1db2f324-b707-41f3-a926-ec458bacbcac.webp?v=1721392436",
    stock: 15,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 869,
    image:
      "https://aristavault.com/cdn/shop/files/Smart_Fingerlock_Backpack_Leather_In_Black.webp?v=1740034540&width=208",
    stock: 20,
    category: "Accessories",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 499,
    image:
      "https://m.media-amazon.com/images/I/31ROHZJMEUL._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 30,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Gaming Keyboard",
    price: 1499,
    image:
      "https://www.bigbasket.com/media/uploads/p/l/40325606_2-zebronics-kb-multimedia-usb-keyboard-transformer-k1-black.jpg",
    stock: 12,
    category: "Electronics",
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 999,
    image:
      "https://www.bigbasket.com/media/uploads/p/l/40325604_1-zebronics-io13-300hb-usb-hub.jpg",
    stock: 25,
    category: "Electronics",
  },
  // Men's Products
  {
    id: 7,
    name: "Men's Classic Suit",
    price: 2999.99,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQiJpKYf5oZeiBm2KUpUxDPWTlsXO9BZGvHid47u1fjGLmcYPiroCWfSVVU6NxAnPZQFZ75LvPieThTf041Re5dGn77g7IkMVqpUMLoPK2SMWgu4Jneyog9",
    stock: 15,
    category: "Men",
  },
  {
    id: 8,
    name: "Men's Casual Shirt",
    price: 499.99,
    image: "https://images.meesho.com/images/products/50519349/hucoe_1200.jpg",
    stock: 25,
    category: "Men",
  },
  {
    id: 9,
    name: "Men's Casual Jeans",
    price: 799.99,
    image: "https://m.media-amazon.com/images/I/71YlxXgHvpL._SX679_.jpg",
    stock: 50,
    category: "Men",
  },
  {
    id: 10,
    name: "Men's Formal Shoe",
    price: 1999.99,
    image: "https://m.media-amazon.com/images/I/61fPdP3HiCL._SX695_.jpg",
    stock: 8,
    category: "Men",
  },
  // Women's Products
  {
    id: 11,
    name: "Women's Summer Dress",
    price: 1779.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSTER-iOS3_2wTxg6gZCWyuLDrC2Hjh_vSg12GQ1ChPTnAf5Fj4V0lbLLedI37qYurKpixbjQMuSYbWSY29A9kEVCFmZc0Kw6XeozBzaMK0GgJZqFn4BWU",
    stock: 200,
    category: "Women",
  },
  {
    id: 12,
    name: "Women's Handbag",
    price: 1129.99,
    image: "https://m.media-amazon.com/images/I/81pF4OQ4VwL._SY695_.jpg",
    stock: 5,
    category: "Women",
  },
  {
    id: 13,
    name: "Women's Jewwllery set",
    price: 19999.99,
    image: "https://m.media-amazon.com/images/I/71ooQyvpGCL._SY625_.jpg",
    stock: 2,
    category: "Women",
  },
  {
    id: 14,
    name: "Women's Sandle",
    price: 399,
    image: "https://m.media-amazon.com/images/I/51wOpVoHfjL._SY695_.jpg",
    stock: 120,
    category: "Women",
  },
  // Kids' Products
  {
    id: 15,
    name: "Kids' Casual Wear",
    price: 349,
    image: "https://m.media-amazon.com/images/I/81ZVAYvhg9L._SX679_.jpg",
    stock: 30,
    category: "Kids",
  },
  {
    id: 16,
    name: "Kids' LEGO",
    price: 200,
    image:
      "https://m.media-amazon.com/images/I/41Ffyp35dfL._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 5,
    category: "Kids",
  },
  {
    id: 17,
    name: "Kids' Diaper",
    price: 999,
    image:
      "https://m.media-amazon.com/images/I/51f-SljGwAL._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 30,
    category: "Kids",
  },
  {
    id: 18,
    name: "Kids' FootWear",
    price: 379,
    image: "https://m.media-amazon.com/images/I/51PG4zjPaBL._SY695_.jpg",
    stock: 15,
    category: "Kids",
  },
  // Home & Decor Products
  {
    id: 19,
    name: "Modern Coffee Table",
    price: 17000,
    image:
      "https://m.media-amazon.com/images/I/41wV6f7KbHL._SX300_SY300_QL70_FMwebp_.jpg",
    stock: 8,
    category: "Home & Decor",
  },
  {
    id: 20,
    name: "Modern Sootisyahi",
    price: 899,
    image: "https://m.media-amazon.com/images/I/81yWokPV2RL._SX679_.jpg",
    stock: 15,
    category: "Home & Decor",
  },
];

class ShopState {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.filters = {
      category: "all",
      maxPrice: null,
      searchQuery: "",
    };
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

// Shop Controller
class ShopController {
  constructor() {
    this.state = new ShopState();
    this.initializeElements();
    this.attachEventListeners();
    this.render();
  }

  initializeElements() {
    this.elements = {
      featuredProducts: document.querySelector("#products .products-grid"),
      cartModal: document.querySelector(".cart-modal"),
      cartIcon: document.querySelector(".cart-icon"),
      closeCart: document.querySelector(".close-cart"),
      cartItems: document.querySelector(".cart-items"),
      cartCount: document.querySelector(".cart-count"),
      totalAmount: document.querySelector(".total-amount"),
      checkoutBtn: document.querySelector(".checkout-btn"),
      menProducts: document.querySelector(".men-products"),
      womenProducts: document.querySelector(".women-products"),
      kidsProducts: document.querySelector(".kids-products"),
      electronicsProducts: document.querySelector(".electronics-products"),
      homeDecorProducts: document.querySelector(".home-decor-products"),
    };
  }

  attachEventListeners() {
    // Cart toggle
    this.elements.cartIcon.addEventListener("click", () =>
      this.toggleCart(true)
    );
    this.elements.closeCart.addEventListener("click", () =>
      this.toggleCart(false)
    );

    // Outside click
    document.addEventListener("click", (e) => {
      if (
        !this.elements.cartModal.contains(e.target) &&
        !this.elements.cartIcon.contains(e.target)
      ) {
        this.toggleCart(false);
      }
    });

    // Checkout
    this.elements.checkoutBtn.addEventListener("click", () =>
      this.handleCheckout()
    );

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.toggleCart(false);
    });
  }

  toggleCart(show) {
    this.elements.cartModal.classList.toggle("open", show);
  }

  async handleCheckout() {
    try {
      if (this.state.cart.length === 0) {
        this.showNotification("Your cart is empty!", "error");
        return;
      }

      // Simulate API call
      await this.simulateCheckout();

      this.showNotification("Thank you for your purchase!", "success");
      this.state.cart = [];
      this.state.saveCart();
      this.updateCart();
      this.toggleCart(false);
    } catch (error) {
      this.showNotification("Checkout failed. Please try again.", "error");
      console.error("Checkout error:", error);
    }
  }

  simulateCheckout() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItem = this.state.cart.find((item) => item.id === productId);

    if (cartItem) {
      if (cartItem.quantity < product.stock) {
        cartItem.quantity++;
      } else {
        this.showNotification("Maximum stock reached", "warning");
        return;
      }
    } else {
      this.state.cart.push({
        ...product,
        quantity: 1,
      });
    }

    this.state.saveCart();
    this.updateCart();
    this.showNotification("Added to cart!", "success");
  }

  updateQuantity(productId, newQuantity) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (newQuantity < 1) {
      this.state.cart = this.state.cart.filter((item) => item.id !== productId);
      this.showNotification("Item removed from cart", "info");
    } else if (newQuantity <= product.stock) {
      const item = this.state.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    } else {
      this.showNotification("Maximum stock reached", "warning");
      return;
    }

    this.state.saveCart();
    this.updateCart();
  }

  updateCart() {
    const newCount = this.state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.elements.cartCount.textContent = newCount;
    this.elements.cartCount.classList.add("bounce");
    setTimeout(() => this.elements.cartCount.classList.remove("bounce"), 300);

    // Update cart items
    this.elements.cartItems.innerHTML = this.state.cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" 
                                onclick="shopController.updateQuantity(${
                                  item.id
                                }, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" 
                                onclick="shopController.updateQuantity(${
                                  item.id
                                }, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    // Update total with animation
    const total = this.state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.elements.totalAmount.textContent = `₹ ${total.toFixed(2)}`;
    this.elements.totalAmount.classList.add("highlight");
    setTimeout(
      () => this.elements.totalAmount.classList.remove("highlight"),
      300
    );
  }

  filterProducts() {
    return products.filter((product) => {
      const matchesCategory =
        this.state.filters.category === "all" ||
        product.category === this.state.filters.category;
      const matchesPrice =
        !this.state.filters.maxPrice ||
        product.price <= this.state.filters.maxPrice;
      const matchesSearch =
        !this.state.filters.searchQuery ||
        product.name
          .toLowerCase()
          .includes(this.state.filters.searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }

  renderCategoryProducts(category) {
    const categoryProducts = products.filter((product) => {
      if (category === "featured") {
        return product.category === "Electronics";
      }
      return product.category === category;
    });

    return categoryProducts
      .map(
        (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <p class="product-stock">In Stock: ${product.stock}</p>
        <button class="add-to-cart" 
                onclick="shopController.addToCart(${product.id})"
                ${product.stock === 0 ? "disabled" : ""}>
          ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  `
      )
      .join("");
  }

  render() {
    if (
      this.state.filters.category !== "all" ||
      this.state.filters.maxPrice ||
      this.state.filters.searchQuery
    ) {
      const filteredProducts = this.filterProducts();
      if (this.elements.featuredProducts) {
        this.elements.featuredProducts.innerHTML = filteredProducts
          .map(
            (product) => `
          <div class="product-card">
            <img src="${product.image}" alt="${
              product.name
            }" class="product-image">
            <div class="product-info">
              <h3 class="product-title">${product.name}</h3>
              <p class="product-price">₹ ${product.price.toFixed(2)}</p>
              <p class="product-stock">In Stock: ${product.stock}</p>
              <button class="add-to-cart" 
                      onclick="shopController.addToCart(${product.id})"
                      ${product.stock === 0 ? "disabled" : ""}>
                ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        `
          )
          .join("");
      }
    } else {
      if (this.elements.featuredProducts) {
        this.elements.featuredProducts.innerHTML =
          this.renderCategoryProducts("featured");
      }

      if (this.elements.menProducts) {
        this.elements.menProducts.innerHTML =
          this.renderCategoryProducts("Men");
      }
      if (this.elements.womenProducts) {
        this.elements.womenProducts.innerHTML =
          this.renderCategoryProducts("Women");
      }
      if (this.elements.kidsProducts) {
        this.elements.kidsProducts.innerHTML =
          this.renderCategoryProducts("Kids");
      }
      if (this.elements.electronicsProducts) {
        this.elements.electronicsProducts.innerHTML =
          this.renderCategoryProducts("Electronics");
      }
      if (this.elements.homeDecorProducts) {
        this.elements.homeDecorProducts.innerHTML =
          this.renderCategoryProducts("Home & Decor");
      }
    }
  }
}

const shopController = new ShopController();

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector(".submit-btn");
    const originalBtnText = submitBtn.textContent;

    // Collect form data
    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      await new Promise((resolve) => setTimeout(resolve, 1500));

      shopController.showNotification("Message sent successfully!", "success");

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      shopController.showNotification(
        "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const statsContainer = document.querySelector(".stats-container");
if (statsContainer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".stat-number").forEach((stat) => {
            stat.style.animation = "countUp 2s ease-out forwards";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsContainer);
}
