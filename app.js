// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// RENDER PRODUCTS
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProducts();

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//add to cart

function addToCart(id){
    //check if product already exist in cart

    if(cart.some((item)=>item.id===id)){
        alert("Product already in cart")
    }else{
        const item=   products.find((product)=>product.id===id);
        cart.push({
            ...item,
            numberOfUnits: 1
        })
        updateCart();
    }
    
     
}

//update cart

function updateCart(){
    renderCartItems();
    renderSubTotal();

    //save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}



//calculate and render subtotal
function renderSubTotal(){
    let totalPrice =0 , totalItems =0;

    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })

    subtotalEl.innerHTML= `Subtotal  (${totalItems} items): $${totalPrice.toFixed(2)}`;

    totalItemsInCartEl.innerHTML= totalItems;
}

function renderCartItems(){
    cartItemsEl.innerHTML=""; //clear cart element
    cart.forEach((item)=>{
        cartItemsEl.innerHTML += `
           
            <div class="cart-item">
                <div class="item-info"  >
                <img src="${item.imgSrc}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${item.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id} )" >-</div>
                    <div class="number">${item.numberOfUnits} </div>
                    
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id} ) " >+</div> 
                    
                             
                </div>
                <div onclick="removeItemFromCart(${item.id})"> 
                <img class="delete" src="./icons/delete-icon.png" alt="">
                </div>
                 
            </div>
            
        
        `
    })
}

//remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
  
    updateCart();
  }



//change number of units for an item

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits>1 ) {
          numberOfUnits--;
        } else if (action === "plus") {
          numberOfUnits++ ;
        }
      }
  
      return {
        ...item,
        numberOfUnits,
      };
    });
  
    updateCart();
  }
