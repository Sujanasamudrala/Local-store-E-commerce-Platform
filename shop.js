const products = [
    { id: 1, name: "Dress", description: "Women Georgette Blue Dress", price: 1699, image: "dress.png" },
    { id: 2, name: "Personal Computer", description: "DELL PC", price: 89999, image: "laptop.png" },
    { id: 3, name: "Books", description: "Story Books", price: 399, image: "books.png" },
    { id: 3, name: "Chocolates", description: "Kitkat pack", price: 159, image: "chocolate.png"}
  ];
  
  let cart = [];
  
  function displayProducts(list = products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    list.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Rs ${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
  }
  
  function updateCart() {
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - Rs${item.price}
        <button onclick="removeFromCart(${index})" style="margin-left:10px; background:red; color:white;">Delete</button>
      `;
      cartList.appendChild(li);
    });
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }  
  
  function searchProducts() {
    const term = document.getElementById("searchBar").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(filtered);
  }
  
  function placeOrder() {
    if (cart.length > 0) {
      const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
      localStorage.setItem("orderTotal", totalCost.toFixed(2));
      window.location.href = "confirmation.html";
    } else {
      alert("Cart is empty!");
    }
  }  
  
  window.onload = () => displayProducts();
  