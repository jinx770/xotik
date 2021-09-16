(async () => {




    // nav clicks
    $('#logoBtn').click(function() {
        window.location.href = 'index.html';
    });

    $('#animalsBtn').click(function() {

        if (window.location.href = 'index.html') {

            // $([document.documentElement, document.body]).animate({
            //   scrollTop: $("#listingSection").offset().top
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




    // click on user icon
    $('#user').click(function() {
        //fade in popover
        $("#headerPopover").fadeIn("slow");
        // fade in login content
        $("#loginContent").css("display", "flex");
        $("#loginContent").hide();
        $("#loginContent").fadeIn("slow");
        // remove other content
        $("#emptyCartContent").css("display", "none");
        $("#fullCartContent").css("display", "none");
        $("#createAccountContent").css("display", "none");
    });

    // show create account content on click
    $('#createAccountBtn').click(function() {
        // fade in create account content
        $("#createAccountContent").css("display", "flex");
        $("#createAccountContent").hide();
        $("#createAccountContent").fadeIn("slow");
        // remove other content
        $("#loginContent").css("display", "none");
    });

    // clicked sign up
    $('#signUpBtn').click(function() {
        // fade in login content
        // will need check to see if sign up is checked out
        $("#loginContent").css("display", "flex");
        $("#loginContent").hide();
        $("#loginContent").fadeIn("slow");
        // remove other content
        $("#createAccountContent").css("display", "none");
    });

    // click on cart icon
    $('#cart').click(function() {
        // fade in popover
        $("#headerPopover").fadeIn("slow");
        // fade in cart content
        // will need if statement to check if items in cart or not
        // fade in for empty cart
        $("#emptyCartContent").css("display", "flex");
        $("#emptyCartContent").hide();
        $("#emptyCartContent").fadeIn("slow");

        // fade in if items in cart
        // $("#fullCartContent").css("display", "flex");
        // $("#fullCartContent").hide();
        // $("#fullCartContent").fadeIn("slow");

        // remove other content
        $("#loginContent").css("display", "none");
        $("#createAccountContent").css("display", "none");
    });



    $('#popoverExit').click(function() {
        $("#headerPopover").fadeOut("slow");
        $("#loginContent").fadeOut("slow");
        $("#emptyCartContent").fadeOut("slow");
        $("#fullCartContent").css("display", "none");
        $("#createAccountContent").fadeOut("slow");
    });




    $('#popoverExit').click(function() {
        $("#headerPopover").fadeOut("slow");
        $("#loginContent").css("display", "none");
        $("#cartContent").css("display", "none");
    });





    // asking questions

    $('#askQuestionBtn').click(function() {
        $("#askQuestionForm").css("display", "flex");
        $("#askQuestionForm").hide();
        $("#askQuestionForm").show("slow");
    })


    $('#sendBtn').click(function() {
        let questionInput = document.querySelector('#questionInput').value
        console.log(questionInput);
        $("#askQuestionForm").hide("slow");
    })

    $('#questionExitBtn').click(function() {
        $("#askQuestionForm").hide("slow");
    })




// ----------------------------------------------------------------------------------------------------------------------------------



    // Logic check for the current session, gotta define it initially
    window.loggedIn = false
    window.alreadyStored = false;
    window.currentSession = "";
    window.pricesSorted = [];
    window.ratingsSorted = [];
    window.defaultSorted = [];


// ----------------------------------------------------------------------------------------------------------------------------------



    // Refresh all html vars
    let refreshElements = () => {

        // Declare all values and buttons here, any sort of variable
        window.currentSession;

        window.sessionHeader = document.querySelector("#sessionHeader") || "";
        window.loginPopOver = document.querySelector(".header-popover") || "";
        window.allPrices = document.querySelectorAll(".price") || "";
        window.titles = document.querySelectorAll(".title") || "";

        window.fileInput = document.querySelector(".ignore-me") || "";
        window.usernameInput = document.querySelector("#username") || "";
        window.passwordInput = document.querySelector("#password") || "";
        window.searchInput = document.querySelector("#searchInput") || "";
        window.filterInput = document.querySelector("#filterInput") || "";
        window.typeInput = document.querySelector("#typeInput") || "";
        window.usernameCreate = document.querySelector("#usernameCreate") || "";
        window.passwordCreate = document.querySelector("#passwordCreate") || "";
        window.allFilterInputs = document.querySelectorAll(".select") || "";

        window.signUpButton = document.querySelector("#signUpBtn") || "";
        window.loginButton = document.querySelector("#submitLogin") || "";
        window.createAccountButton = document.querySelector("#createAccountBtn") || "";
        window.searchButton = document.querySelector("#searchButton") || "";
        window.closeLoginButton = document.querySelector(".popover-exit-btn") || "";
        window.listingButton = document.querySelector(".listing-btn") || "";

        window.cardParent = document.querySelector(".all-listings") || "";
        window.cards = document.querySelectorAll(".card") || "";

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // Basic style function for changing styles with js
    let logInStyle = () => {

        // Styling
        loginButton.textContent = "Log Out";
        sessionHeader.textContent = `User: ${localStorage.getItem("currentSession")}`
        usernameInput.style.display = "none"
        passwordInput.style.display = "none"
        createAccountButton.style.display = "none"
        loginPopOver.style.height = "14%"
        loginPopOver.style.paddingBottom = "30px"

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // Basic style function for undoing previously done styling via js
    let logOutStyle = () => {

        // Clears the current session username when they sign out
        currentSession = null;

        // State check
        loggedIn = true

        // Styling
        loginButton.textContent = "Log In";
        sessionHeader.textContent = `Log In`
        usernameInput.style.display = "block"
        passwordInput.style.display = "block"
        createAccountButton.style.display = "block"
        loginPopOver.style.height = "50vh"
        loginPopOver.style.paddingBottom = "0"

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // Function for handling the animal cards on the front page.
    let handleHomeAnimals = async () => {

        // Calls our api on the server without a query, if there is no query then return all animals
        let response = await fetch('/findAnimal')

        // Saving data of the response (every animal in database shouldve been returned)
        let data = await response.json()

        // Removing all cards from the page
        cardParent.innerHTML = ""

        // Creating our own cards for the number of data arrays returned
        for (card of data) {

            // Setting each card up with relevant fields filled out using backticks
            cardParent.innerHTML += `
                <div class="card" data-objectId="${card._id}" data-price="${card.price}" data-rating="${card.rating.charAt(0)}" data-animalType="${card.type}">
                      <div class="top-info">
                          <div class="username">
                              <h5>${card.owner}</h5>
                          </div>
                          <div class="rating">
                              <h5>${card.rating}</h5>
                          </div>
                      </div>
                      <div class="card-img">
                          <button class="favourite" type="button" name="button"> <a class="fa fa-heart" href="#"></a> </button>
                          <img src="${card.url[0]}" alt="">
                      </div>
                      <div class="bottom-info">
                          <div class="title">
                              <h4>${card.name}</h4>
                          </div>
                          <div class="price">
                              <h5>$${card.price.toLocaleString()}</h5>
                              </div>
                          </div>
                  </div>
              `
        }
    }



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



// ------------------------------------------------------------------------------------------------------------------------------------



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
                console.log("Signing in")

                // Changing value to true, for next time you login
                loggedIn = true

                // Saving to localstorage so we can use it in other pages
                localStorage.setItem("currentSession", currentSession)
                localStorage.setItem("loggedIn", loggedIn)

                // Ending the thread so it doesnt alert
                return

            }

            // Alerts incorrect if the user doesn't login properly
            alert("Incorrect login!")

        }

        // If logged in, and pressing the button
        if (loggedIn) {

            // Change the log out back to its original layout
            logOutStyle()

            // Closes the login field
            closeLoginButton.click();

            // Debugging purposes
            console.log("Signing out")

            // Changing logged in to false so it can validate once
            loggedIn = false

            // Saving to localstorage so we can use it in other pages
            localStorage.setItem("currentSession", currentSession)
            localStorage.setItem("loggedIn", loggedIn)

            // Best practice return
            return

        }

    }



// ------------------------------------------------------------------------------------------------------------------------------------


    // Function for creating an account :yay:
    let createAccHandler = async () => {

    // If not logged in continue
        if (!loggedIn) {

            let username = usernameCreate.value;
            let password = passwordCreate.value;

                // Posts/sends data to the route found in server
            let response = await fetch('/createUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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



// ------------------------------------------------------------------------------------------------------------------------------------



    // Loops every .1 second running the following
    setInterval(function() {

        refreshElements()

        // Loop checks to see if its logged in for when we switch links
        localStorage.getItem("loggedIn") === "true" ? logInStyle() : null
        localStorage.getItem("loggedIn") === "true" ? loggedIn = true : null

        for (card of cards) {
            card.addEventListener('click', () => {
                window.location.href="/animalTemplate.html"
            })
        }

    }, 500);



// ------------------------------------------------------------------------------------------------------------------------------------



    // Function for running every event listener on the page
    let setupEventListeners = () => {

        // Runs the login handler when you click on the login button
        loginButton.addEventListener('click', async () => {
            loginHandler();
        });

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


// ------------------------------------------------------------------------------------------------------------------------------------


    // Runs when page gets loaded
    let setupFilters = () => {

        // Gets every input
        for (input of allFilterInputs) {

            // Adds a changed event on each input, fires when something gets changed
            input.addEventListener('change', () => {

                refreshElements();

                // Returning true or false if the value isn't empty for each input
                let typeEmpty = typeInput.value !== "" ? false : true;
                let filterEmpty = filterInput.value !== "" ? false : true;
                let searchEmpty = searchInput.value !== "" ? false : true;

                // Calls functions if its not empty with the input
                !typeEmpty ? filterCards("byType", typeInput.value) : "";
                !filterEmpty ? filterCards("byFilter", filterInput.value) : "";

                // Calls search function when user is typing
                !searchEmpty ? searchQuery(searchInput.value) : "";

            })

        }

        // Firing the search query function when you lift a key up while typing
        searchInput ? searchInput.addEventListener('keyup', () => {
            searchQuery(searchInput.value)
        }) : "";

    }




// ------------------------------------------------------------------------------------------------------------------------------------



    // Fires when you click an input
    let filterCards = ( ... args ) => {

        // Seperates the type of filter the user has clicked and what they click on
        let [queryType, parameter] = args

        refreshElements();

        // If the passed querytype call a function
        if (queryType == "byType") {
            hideCardsThatArent(parameter)
        }

        // Calls sort function if argument is byfilter
        if (queryType == "byFilter") {
            sortBy(parameter)
        }

    }



// ------------------------------------------------------------------------------------------------------------------------------------


    // Gets called every time you let go of a key when youre typing in an input
    let searchQuery = async ( arg ) => {

        // Getting every title of each animal on the page
        for (title of titles) {

            // Converting the title into lowercase and checking to see if it has the argument in it
            if (title.textContent.toLowerCase().includes(arg.toLowerCase())) {

                // Showing relevative cards
                title.parentNode.parentNode.style.display = "block"

            } else {

                // Hiding irrelevant results
                title.parentNode.parentNode.style.display = "none"

            }

        }

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // I seriously can't be bothered commenting for this 
    let sortBy = ( arg ) => {

        if (alreadyStored == false ) {
            for (var i = 0; i < cards.length; i++) {
                defaultSorted.push({
                    "element": cards[i]
                })
            }
            alreadyStored = true
        }

        switch (arg) {
            case 'lowest':
                for (card of cards) {
                    pricesSorted.push({
                        "price": card.getAttribute("data-price"),
                        "element": card
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
                        "price": card.getAttribute("data-price"),
                        "element": card
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
                        "rating": card.getAttribute("data-rating"),
                        "element": card
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



// ------------------------------------------------------------------------------------------------------------------------------------


    // Function for filtering
    let hideCardsThatArent = ( arg ) => {

        // Loop getting every element called cards
        for (card of cards) {

            // Ternary for checking the cards data against the argument passed
            let relevantCard = arg === card.getAttribute("data-animalType") ? true : false

            // If not relevant then hide it
            if (!relevantCard) {
                card.style.display = "none"
            }

            // If relevant show
            if (relevantCard) {
                card.style.display = "block"
            }

            // If filter reset show all
            if ( arg === "all") {
                card.style.display = "block"
            }

        }

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // STARTUP TASKS
    handleHomeAnimals();
    refreshElements();
    setupEventListeners();
    setupFilters();



})();
