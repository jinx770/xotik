


// collapsible for FAQ page
var coll = document.getElementsByClassName('collapsible');
var i;



for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
}

window.onload = (event) => {

  $('#hero').velocity({
    top: '25%',
    opacity: '1',
  }, {
    duration: 2000,
    easing: 'spring',
    delay: 500,
  });

  // $('#header').velocity({
  //   opacity: 1,
  // }, {
  //   duration: 1000,
  //   easing: 'ease-in',
  //   delay: 1500,
  // });

};



// nav clicks
$('#logoBtn').click(function() {
    window.location.href = 'index.html';
});

$('#animalsBtn').click(function() {

    if (window.location.href = 'index.html') {

        // $([document.documentElement, document.body]).animate({
        //   scrollTop: $('#listingSection').offset().top
        // }, 1500);
        console.log('On inddex.html');

    } else {
        // window.location.href = 'index.html';
        console.log('NOT on inddex.html');
    }

});

//
$('#whoBtn').click(function() {
    window.location.href = 'about.html';
})

$('#listingBtn').click(function() {
    window.location.href = 'listing.html';
});
// header popover begins


// if (localStorage.getItem('loggedIn') === 'true') { do stuff }

// ?ICONS :::::::::::::::::::::;
// click on user icon
$('#user').click(function() {

  if ($('#user').hasClass('checked')) {

    // $('#user').removeClass('checked');

  } else {

    $('#user').removeClass('checked');

    if (localStorage.getItem('loggedIn') === 'true') {

      $('#headerPopover').velocity({
        width: '350px',
      }, {
        duration: 500,
        easing: 'easeInOutQuint',
        delay: 0,
      });

      $('#headerPopover').velocity({
        height: '200px',
      }, {
        duration: 500,
        easing: 'easeInOutQuint',
        delay: 0,
      });

    } else {
      $('#headerPopover').velocity({
        width: '350px',
      }, {
        duration: 500,
        easing: 'easeInOutQuint',
        delay: 0,
      });

      $('#headerPopover').velocity({
        height: '400px',
      }, {
        duration: 500,
        easing: 'easeInOutQuint',
        delay: 0,
      });
    }

    //fade in popover
    $('#headerPopover').fadeIn('slow');
    // fade in login content
    $('#loginContent').css('display', 'flex');
    $('#loginContent').hide();
    $('#loginContent').fadeIn('slow');
    // remove other content
    $('#emptyCartContent').css('display', 'none');
    $('#fullCartContent').css('display', 'none');
    $('#createAccountContent').css('display', 'none');

  }

});


//

// show create account content on click
$('#createAccountBtn').click(function() {
    // fade in create account content
    $('#createAccountContent').css('display', 'flex');
    $('#createAccountContent').hide();
    $('#createAccountContent').fadeIn('slow');
    // remove other content
    $('#loginContent').css('display', 'none');
});

// clicked sign up
$('#signUpBtn').click(function() {
    // fade in login content
    // will need check to see if sign up is checked out
    $('#loginContent').css('display', 'flex');
    $('#loginContent').hide();
    $('#loginContent').fadeIn('slow');
    // remove other content
    $('#createAccountContent').css('display', 'none');
});

// click on cart icon
$('#cart').click(function() {
    // fade in popover
    $('#headerPopover').fadeIn('slow');
    // fade in cart content
    // will need if statement to check if items in cart or not
    // fade in for empty cart

    if (localStorage.getItem('somethingInBasket') == 'true') {
        $('#fullCartContent').css('display', 'flex');
        $('#fullCartContent').hide();
        $('#fullCartContent').fadeIn('slow');
        updateCart();

        $('#headerPopover').velocity({
          width: '350px',
        }, {
          duration: 500,
          easing: 'easeInOutQuint',
          delay: 0,
        });

        $('#headerPopover').velocity({
          height: '400px',
        }, {
          duration: 500,
          easing: 'easeInOutQuint',
          delay: 0,
        });
    } else {
        $('#emptyCartContent').css('display', 'flex');
        $('#emptyCartContent').hide();
        $('#emptyCartContent').fadeIn('slow');

        $('#headerPopover').velocity({
          width: '350px',
        }, {
          duration: 500,
          easing: 'easeInOutQuint',
          delay: 0,
        });

        $('#headerPopover').velocity({
          height: '200px',
        }, {
          duration: 500,
          easing: 'easeInOutQuint',
          delay: 0,
        });
    }

    // fade in if items in cart

    // remove other content
    $('#loginContent').css('display', 'none');
    $('#createAccountContent').css('display', 'none');
});



$('#popoverExit').click(function() {

  $('#headerPopover').addClass('checked');

  $('#headerPopover').velocity({
    height: '0px',
  }, {
    duration: 500,
    easing: 'easeInOutQuint',
    delay: 0,
  });

  $('#headerPopover').velocity({
    width: '0px',
  }, {
    duration: 500,
    easing: 'easeInOutQuint',
    delay: 0,
  });

    $('#headerPopover').fadeOut('slow');
    // $('#loginContent').fadeOut('slow');
    // $('#emptyCartContent').fadeOut('slow');
    // $('#fullCartContent').css('display', 'none');
    // $('#createAccountContent').fadeOut('slow');

});




$('#popoverExit').click(function() {
    $('#headerPopover').fadeOut('slow');
    $('#loginContent').css('display', 'none');
    $('#cartContent').css('display', 'none');
});



// eplore button

$('#exploreBtn').click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#listingSection').offset().top
    }, 1500);
})




// asking questions

$('#askQuestionBtn').click(function() {
    $('#askQuestionForm').css('display', 'flex');
    $('#askQuestionForm').hide();
    $('#askQuestionForm').show('slow');
})


$('#sendBtn').click(function() {

    $('#askQuestionForm').hide('slow');
})

$('#questionExitBtn').click(function() {
    $('#askQuestionForm').hide('slow');
})



// ------------------------------------------------------------------------------------------------------------------------------------
// -- DISPLAY DETAILS
// ------------------------------------------------------------------------------------------------------------------------------------


// Logic check for the current session, gotta define it initially
window.loggedIn = false
window.alreadyStored = false;

// Empty arrays
window.cartItems = []
window.pricesSorted = [];
window.ratingsSorted = [];
window.defaultSorted = [];
window.currentSession = '';

// Basic check to prevent errors
localStorage.getItem('loggedIn')
    ? ''
    : localStorage.setItem('loggedIn', false)

localStorage.getItem('cartCost')
    ? ''
    : localStorage.setItem('cartCost', [])

// Refresh all html vars
let refreshElements = () => {

    // Declare all values and buttons here, any sort of variable
    window.titles = document.querySelectorAll('.title') || '';
    window.modalParent = document.querySelector('.modal') || '';
    window.allPrices = document.querySelectorAll('.price') || '';
    window.doneButton = document.querySelector('.modalDone') || '';
    window.sessionHeader = document.querySelector('#sessionHeader') || '';
    window.loginPopOver = document.querySelector('.header-popover') || '';

    window.typeInput = document.querySelector('#typeInput') || '';
    window.fileInput = document.querySelector('.ignore-me') || '';
    window.usernameInput = document.querySelector('#username') || '';
    window.passwordInput = document.querySelector('#password') || '';
    window.searchInput = document.querySelector('#searchInput') || '';
    window.filterInput = document.querySelector('#filterInput') || '';
    window.allFilterInputs = document.querySelectorAll('.select') || '';
    window.usernameCreate = document.querySelector('#usernameCreate') || '';
    window.passwordCreate = document.querySelector('#passwordCreate') || '';

    window.signUpButton = document.querySelector('#signUpBtn') || '';
    window.loginButton = document.querySelector('#submitLogin') || '';
    window.searchButton = document.querySelector('#searchButton') || '';
    window.listingButton = document.querySelector('.listing-btn') || '';
    window.closeLoginButton = document.querySelector('.popover-exit-btn') || '';
    window.createAccountButton = document.querySelector('#createAccountBtn') || '';

    window.userListing = document.querySelectorAll('.user-listing') || '';
    window.userListingParent = document.querySelector('.user-all-listings') || '';

    window.cards = document.querySelectorAll('.card') || '';
    window.cardParent = document.querySelector('.all-listings') || '';

    window.navAnimals = document.querySelector('#animalsBtn') || '';
    window.navWhoWeAre = document.querySelector('#whoBtn') || '';
    window.navListing = document.querySelector('#listingBtn') || '';

    window.cartParent = document.querySelector('.cart-item-content') || '';
    window.total = document.querySelector('.checkout-popover-bottom').childNodes[1] || '';
    window.cartList = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- LOGIN LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------

// Function for checking to see if the inputted data is the same in the database
let checkLoginValidity = async (...query) => {

    // Splitting arguments into variables called u and p for username, password
    let [u, p] = query

    // Sending through query variables to validate, returns true or false if login details are valid
    let data = await fetch(`/findUser?u=${u}&p=${p}`)
    let result = await data.json()

    // Check to see if inputs are empty
    u == '' || p == '' ? data = false : data = true

    // If logged in already, calls the function for signing out before it returns the result
    // If not, then ignore and continue
    loggedIn ? loginHandler() : null;

    // Saving the name of the user who's logged in for later
    window.attemptedLogin = u;

    // Returns the true/false if they've entered the right username and password
    return result

}

// Login handler function, basically for checking to see if the user is logging in or signing out!
let loginHandler = async () => {

    // Refresh all dom elements to get new values in-case they change
    refreshElements();

    // If not logged then continue
    if (!loggedIn) {

        // Function call for validation of users inputs, returns true or false
        let loginCheck = await checkLoginValidity(usernameInput.value, passwordInput.value)

        // If true
        if (loginCheck) {

            // Change the style of the login bar and the text
            logInStyle();

            // Changing the current session to the username of whoever logged in
            currentSession = attemptedLogin;

            // Closing the login field
            closeLoginButton.click();

            // Something to say you've logged in for debugging purposes
            console.log('Signing in')

            // Changing value to true, for next time you login
            loggedIn = true

            // Saving to localstorage so we can use it in other pages
            localStorage.setItem('currentSession', currentSession)
            localStorage.setItem('loggedIn', loggedIn)

            // Ending the thread so it doesnt alert
            return

        }

        // Alerts incorrect if the user doesn't login properly
        createAlert('Incorrect login!')
        closeLoginButton.click();

    }

    // If logged in, and pressing the button
    if (loggedIn) {

        // Change the log out back to its original layout
        logOutStyle()

        // Closes the login field
        closeLoginButton.click();

        // Debugging purposes
        console.log('Signing out')

        // Changing logged in to false so it can validate once
        loggedIn = false

        // Saving to localstorage so we can use it in other pages
        localStorage.setItem('currentSession', currentSession)
        localStorage.setItem('loggedIn', loggedIn)

        // Best practice return
        return

    }

}

// Function for creating an account :yay:
let createAccHandler = async () => {

    // If not logged in continue
    if (!loggedIn) {

        let username = usernameCreate.value;
        let password = passwordCreate.value;

        // Check to make sure the account the user is creating isnt empty
        if (username == '' || password == '') {

            // Alerting if it is empty
            createAlert('Please make sure all fields are filled out!')

            // Ending thread to prevent it from continuing
            return

        } else {

            // Post request to the server, with relevant data sent
            let response = await fetch('/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    fullName: '.',
                    username: username,
                    phoneNo: '.',
                    email: '.',
                    description: '.',
                    password: password

                })

            })

        }

    }

}

// Basic style function for changing styles with js
let logInStyle = () => {

    // Styling
    loginButton.textContent = 'Log Out';
    sessionHeader.textContent = `User: ${localStorage.getItem('currentSession')}`
    usernameInput.style.display = 'none'
    passwordInput.style.display = 'none'
    createAccountButton.style.display = 'none'

}

// Basic style function for undoing previously done styling via js
let logOutStyle = () => {

    // Clears the current session username when they sign out
    currentSession = null;

    // State check
    loggedIn = true

    // Styling
    loginButton.textContent = 'Log In';
    sessionHeader.textContent = `Log In`
    usernameInput.style.display = 'block'
    passwordInput.style.display = 'block'
    createAccountButton.style.display = 'block'
    loginPopOver.style.height = '50vh'
    loginPopOver.style.paddingBottom = '0'

}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- ANIMAL CARDS
// ------------------------------------------------------------------------------------------------------------------------------------

// Function for handling the animal cards on the front page.
let handleHomeAnimals = async () => {

    // Calls our api on the server without a query, if there is no query then return all animals
    let response = await fetch('/findAnimal')

    // Saving data of the response (every animal in database shouldve been returned)
    let data = await response.json()

    // Removing all cards from the page
    cardParent.innerHTML = ''

    // Creating our own cards for the number of data arrays returned
    for (card of data) {

        // Setting each card up with relevant fields filled out using backticks
        cardParent.innerHTML += `
                <div class='card hvr-float' onclick='getId(this)' data-objectId='${card._id}' data-price='${card.price}' data-animalName='${card.name}' data-rating='${card.rating.charAt(0)}' data-animalType='${card.type}'>
                    <div class='top-info'>
                        <div class='username'>
                            <h5>${card.owner}</h5>
                        </div>
                        <div class='rating'>
                            <h5>${card.rating}</h5>
                        </div>
                        </div>
                        <div class='card-img'>
                            <button class='favourite' type='button' name='button'> <a class='fa fa-heart' href='#'></a> </button>
                            <img src='${card.url}' alt=''>
                        </div>
                        <div class='bottom-info'>
                            <div class='title'>
                                <h4>${card.name}</h4>
                            </div>
                        <div class='price'>
                            <h5>$${card.price.toLocaleString()}</h5>
                            </div>
                        </div>
                </div>
            `
    }
}

// Runs when page gets loaded
let setupFilters = () => {

    // Gets every input
    for (input of allFilterInputs) {

        // Adds a changed event on each input, fires when something gets changed
        input.addEventListener('change', () => {

            refreshElements();

            // Returning true or false if the value isn't empty for each input
            let typeEmpty = typeInput.value !== '' ? false : true;
            let filterEmpty = filterInput.value !== '' ? false : true;
            let searchEmpty = searchInput.value !== '' ? false : true;

            // Calls functions if its not empty with the input
            !typeEmpty ? filterCards('byType', typeInput.value) : '';
            !filterEmpty ? filterCards('byFilter', filterInput.value) : '';

            // Calls search function when user is typing
            !searchEmpty ? searchQuery(searchInput.value) : '';

        })

    }

    // Firing the search query function when you lift a key up while typing
    searchInput ? searchInput.addEventListener('keyup', () => {
        searchQuery(searchInput.value)
    }) : '';

}

// Fires when you click an input
let filterCards = (...args) => {

    // Seperates the type of filter the user has clicked and what they click on
    let [queryType, parameter] = args

    refreshElements();

    // If the passed querytype call a function
    if (queryType == 'byType') {
        hideCardsThatArent(parameter)
    }

    // Calls sort function if argument is byfilter
    if (queryType == 'byFilter') {
        sortBy(parameter)
    }

}

// Gets called every time you let go of a key when youre typing in an input
let searchQuery = async (arg) => {

    // Getting every title of each animal on the page
    for (title of titles) {

        // Converting the title into lowercase and checking to see if it has the argument in it
        if (title.textContent.toLowerCase().includes(arg.toLowerCase())) {

            // Showing relevative cards
            title.parentNode.parentNode.style.display = 'block'

        } else {

            // Hiding irrelevant results
            title.parentNode.parentNode.style.display = 'none'

        }

    }

}

// I seriously can't be bothered commenting for this, the logic is an actual eyesore
let sortBy = (arg) => {

    if (alreadyStored == false) {
        for (var i = 0; i < cards.length; i++) {
            defaultSorted.push({
                'element': cards[i]
            })
        }
        alreadyStored = true
    }

    switch (arg) {
        case 'lowest':
            for (card of cards) {
                pricesSorted.push({
                    'price': card.getAttribute('data-price'),
                    'element': card
                });
                pricesSorted.sort((a, b) => (a.price - b.price));
            }
            for (let i = 0; i < pricesSorted.length; i++) {
                cardParent.appendChild(pricesSorted[i].element)
            }
            break;

        case 'highest':
            for (card of cards) {
                pricesSorted.push({
                    'price': card.getAttribute('data-price'),
                    'element': card
                });
                pricesSorted.sort((a, b) => (b.price - a.price));
            }
            for (let i = 0; i < pricesSorted.length; i++) {
                cardParent.appendChild(pricesSorted[i].element)
            }
            break;

        case 'viewed':
            for (card of cards) {
                ratingsSorted.push({
                    'rating': card.getAttribute('data-rating'),
                    'element': card
                });
                ratingsSorted.sort((a, b) => (b.rating - a.rating));
            }
            for (let i = 0; i < ratingsSorted.length; i++) {
                cardParent.appendChild(ratingsSorted[i].element)
            }
            break;

        case 'none':
            for (let i = 0; i < defaultSorted.length; i++) {
                cardParent.appendChild(defaultSorted[i].element)
            }
            break;

    }

}

// Function for filtering
let hideCardsThatArent = (arg) => {

    // Loop getting every element called cards
    for (card of cards) {

        // Ternary for checking the cards data against the argument passed
        let relevantCard = arg === card.getAttribute('data-animalType') ? true : false

        // If not relevant then hide it
        if (!relevantCard) {
            card.style.display = 'none'
        }

        // If relevant show
        if (relevantCard) {
            card.style.display = 'block'
        }

        // If filter reset show all
        if (arg === 'all') {
            card.style.display = 'block'
        }

    }

}


// ------------------------------------------------------------------------------------------------------------------------------------
// CART LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------

// Updates when user loads any page
let updateCart = () => {

    // Clearing the div
    cartParent.innerHTML = '';

    // Emptying the current cart cost
    window.cartCost = []
    localStorage.setItem('cartCost', JSON.stringify([]))


    // Looping through all items locally stored
    for (item of cartList) {

        // Collecting the cost of each item in the cart
        cartCost.push(item.price)

        // Creating new divs for the cart purchases
        cartParent.innerHTML += `
                <div class='cart-item' id='${item._id}' data-id='${item._id}'>
                    <div class='cart-item-img'>
                        <img class='cart-image' src='${item.url}' alt=''>
                    </div>
                <div class='cart-item-text'>
                    <h5 class='cart-item-title data-id='${item._id}''>${item.name}</h5>
                    <div class='cart-item-text-row'>
                        <h6 class='cart-item-price'>$${item.price.toLocaleString()}</h6>
                        <h6 class='cart-remove-btn' onclick='remove(this)' id='cartRemoveBtn'>Remove</h6>
                    </div>
                </div>
            </div>
        `
    }

    // Appending cart cost
    localStorage.setItem('cartCost', JSON.stringify(cartCost))

    // Rightarrow func for adding each item in an array together
    total.textContent = `Total: $${cartCost.reduce((current, a) => current + a, 0).toLocaleString()}`

}

// Function for removing an item in the array
let removeFromArray = ( arr, value ) => {

    // Checking the index of the item in the array passed
    let index = arr.indexOf(value);

    // Cutting it from the array
    if (index > -1) {
        arr.splice(index, 1);
    }

    // Returning the new array
    return arr;
}

// Function invoked when user clicks remove button in the cart
let remove = ( obj ) => {

    // Getting id of the item they click
    let id = obj.parentNode.parentNode.parentNode.getAttribute('data-id')

    // Running loop to check the item they click against what we've saved in the array
    for (item of cartList) {

        // Locating the item they click with an item in the array
        if (item._id == id) {

            // Removing it from the cart div
            obj.parentNode.parentNode.parentNode.remove()

            // Removing it from the array
            removeFromArray(cartList, item)

            // Updating localstorage with the new array
            localStorage.setItem('cartItems', JSON.stringify(cartList))

        }

    }

    updateCart();

}

// This is a clone of the one above, except it removes one parent above the previous
let removeFromPage = (obj) => {

    // Getting id of the item they click
    let id = obj.parentNode.parentNode.parentNode.getAttribute('data-id')

    // Running loop to check the item they click against what we've saved in the array
    for (item of cartList) {

        // console.log(item._id, id)
        // Locating the item they click with an item in the array
        if (item._id == id) {

            // Removing it from the cart div
            obj.parentNode.parentNode.parentNode.parentNode.remove()

            // Removing it from the array
            removeFromArray(cartList, item)

            // Updating localstorage with the new array
            localStorage.setItem('cartItems', JSON.stringify(cartList))

        }

    }

    updateCart();

}



// ------------------------------------------------------------------------------------------------------------------------------------
// RANDOM STUFF
// ------------------------------------------------------------------------------------------------------------------------------------

// Loops every .1 second running the following
setInterval(function() {

    refreshElements()

    // Loop checks to see if its logged in for when we switch links
    localStorage.getItem('loggedIn') === 'true' ? logInStyle() : null
    localStorage.getItem('loggedIn') === 'true' ? loggedIn = true : null

    // Modal listener
    doneButton ? doneButton.addEventListener('click', async () => {

        // Removes the popup modal
        modalParent.remove();

        // Enables scroll once again
        enableScroll();

    }) : null;

}, 500);

let getId = (e) => {
    localStorage.setItem('cardId', e.getAttribute('data-objectid'))
    window.location.href = '/animalTemplate.html';
}

let redirect = (a) => {
    cartList.length == 0 ? createAlert('Uh oh! Looks like your cart is empty! \n Looks like you need to go shopping :)') : window.location.href = a
}

// Function for running every event listener on the page
let setupEventListeners = () => {

    // Runs the login handler when you click on the login button
    loginButton.addEventListener('click', async () => {
        loginHandler();
    });

    myAccountBtn.addEventListener('click', () => {
        loggedIn != true ? createAlert('Log in to view your account!') : window.location.href='/user.html'
    })

    // Runs every time you type in the password input field
    passwordCreate ? passwordCreate.addEventListener('keydown', (event) => {

        // Checks to see if the key you pressed was the enter key
        if (event.keyCode === 13) {

            // Stops you from new lining.
            event.preventDefault();

            // Clicks the login (basically pressing enter after you type your password will submit the login)
            loginButton.click()

        }

    }) : null

    // Runs every time you type in the password input field
    passwordInput.addEventListener('keydown', (event) => {

        // Checks to see if the key you pressed was the enter key
        if (event.keyCode === 13) {

            // Stops you from new lining.
            event.preventDefault();

            // Clicks the login (basically pressing enter after you type your password will submit the login)
            loginButton.click()

        }

    });

    // Runs createAccHandler when you click sign up btn
    signUpButton ? signUpButton.addEventListener('click', async () => {
        createAccHandler();
    }) : null;

}

let disableScroll = () => {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

// Enabling scrolling
let enableScroll = () => {
    window.onscroll = function() {};
}

let createAlert = (msg) => {

    document.querySelector('.modal-here').innerHTML += `
        <div class='modal'>
          <h3>${msg}</h3>
          <button type='button' class='button-secondary modalDone' name='button'>Done</button>
        </div>`
    headerPopover.style.dispaly == 'block' ? loginButton.click() : null
    disableScroll();

}



// ------------------------------------------------------------------------------------------------------------------------------------
// STARTUP TASKS
// ------------------------------------------------------------------------------------------------------------------------------------

window.location.href == 'http://localhost:3000/index.html' || window.location.href == `http://localhost:3000` ? handleHomeAnimals() : null
refreshElements();
setupEventListeners();
setupFilters();
