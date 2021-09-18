(function() {

    window.animalData = ""
    window.div = document.createElement("div") || "";
    window.displayOwner = document.querySelector('.username') || "";
    window.displayLicence = document.querySelector('.licence') || "";
    window.displayImage = document.querySelector('.animal-img') || "";
    window.displayName = document.querySelector('.animal-name') || "";
    window.displayPrice = document.querySelector('.price-value') || "";
    window.displayDelivery = document.querySelector('.delivery') || "";
    window.addToCartButton = document.querySelector('#addToCart') || "";
    window.displayLocation = document.querySelector(".sellers-location") || "";
    window.displayDescription = document.querySelector('.animal-description') || "";

    window.items = localStorage.getItem('cartItems')


    localStorage.getItem('loggedIn') === 'true' ? logInStyle() : null
    localStorage.getItem('loggedIn') === 'true' ? loggedIn = true : null

// ------------------------------------------------------------------------------------------------------------------------------------



    let animalDetails = async () => {

        // Grabbing individual animal in db through it's id
        response = await fetch(`/findAnimal?id=${localStorage.getItem('cardId')}`)

        // Handling the promise
        window.animalData = await response.json();

        // Changes being made to DOM
        displayOwner.innerHTML += `Listing by: <u class="usernameHover">${animalData[0].owner}</u>`;
        displayName.textContent = animalData[0].name;
        displayLocation.textContent = animalData[0].location
        displayDescription.textContent = animalData[0].description;
        displayPrice.textContent = animalData[0].price;
        displayImage.src = animalData[0].url

        animalData[0].delivery == "true"
            ? displayDelivery.childNodes[1].className = "fa fa-check check"
            : displayDelivery.childNodes[1].className = "fa fa-times times"

        animalData[0].license == "true"
            ? displayLicence.childNodes[1].className = "fa fa-check check"
            : displayLicence.childNodes[1].className = "fa fa-times times"

        addToCartButton.addEventListener('click', () => {

            let cartList = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
            cartList.push(animalData[0])

            localStorage.setItem("somethingInBasket", true)
            localStorage.setItem("cartItems", JSON.stringify(cartList))
            updateCart();
            setTimeout(() => {
                cart.click()
            }, 500)

        })

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    setInterval(async () => {
        try {
            if (animalData[0].length != 0) {
                div.style.display = "none"
                enableScroll();
            }
        } catch {
            return
        }

    }, 100)



// ------------------------------------------------------------------------------------------------------------------------------------



    let disableScroll = () => {
        // Get the current page scroll position
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }



// ------------------------------------------------------------------------------------------------------------------------------------



    let enableScroll = () => {
        window.onscroll = function() {};
    }



// ------------------------------------------------------------------------------------------------------------------------------------



    let hideUntilLoaded = () => {
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.background = "#121212";
        div.style.top = "0px"
        div.style.position = "absolute"
        div.innerHTML += `
            <img class="data-page" src="https://app.sophya.ai/images/system/loading-cat-transparent.gif">
            <h3 style="margin-top:200px;" class="data-page"> Loading.. </h3>

        `
        disableScroll();
        document.querySelector("body").appendChild(div);
    }



// ------------------------------------------------------------------------------------------------------------------------------------



    hideUntilLoaded()
    animalDetails()



}());
