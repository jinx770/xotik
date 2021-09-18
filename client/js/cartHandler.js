(function() {

    window.cartParent = document.querySelector('.cart-page-content') || "";
    window.checkOutButton = document.querySelector("#checkoutButton") || "";
    window.cartList = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

    let updateCartPage = () => {
        cartParent.innerHTML = "";
        for (item of cartList) {
            cartParent.innerHTML += `
                <div class="cart-page-item">
                  <div class="cart-page-item-content id="${item._id}" data-id="${item._id}"">
                    <div class="cart-page-img">
                      <img src="${item.url}" alt="">
                    </div>
                    <div class="cart-page-item-text">
                      <div class="cart-page-item-details">
                        <h6>${item.owner}</h6>
                        <h2>${item.name}</h2>
                        <h6 class="cart-remove-btn" onclick="removeFromPage(this)" id="cartRemoveBtn">Remove</h6>
                      </div>
                      <div class="cart-page-item-price">
                          <h2>$${item.price.toLocaleString()}</h2>
                      </div>
                    </div>
                  </div>
                </div>
            `
        }
    }

    checkOutButton.addEventListener('click', () => {
        createAlert("spook!!!")
    })

    updateCartPage()

}());
