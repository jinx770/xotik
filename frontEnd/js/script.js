(async () => {


  // nav clicks
  $('#logoBtn').click(function() {
    window.location.href = 'index.html';
  });

  $('#animalsBtn').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#listingSection").offset().top
    }, 1500);
  });

  //
  // $('#whoBtn').click(function(){
  //
  // })
  //
  // $('#trustBtn').click(function(){
  //
  // })

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




  //  -----------------------------------------------------------------------

  // asking questions

  $('#askQuestionBtn').click(function(){
    $("#askQuestionForm").css("display", "flex");
    $("#askQuestionForm").hide();
    $("#askQuestionForm").show("slow");
  })


  $('#sendBtn').click(function(){
    let questionInput = document.querySelector('#questionInput').value
    console.log(questionInput);
    $("#askQuestionForm").hide("slow");
  })

  $('#questionExitBtn').click(function(){
    $("#askQuestionForm").hide("slow");
  })




  // ----------------------------------------------------------------------------------------------------------------------------------



      // Logic check for the current session, gotta define it initially
      window.loggedIn = false
      window.currentSession = "";



  // ----------------------------------------------------------------------------------------------------------------------------------



      // Refresh all html vars
      let refreshElements = () => {

          // Declare all values and buttons here, any sort of variable
          window.currentSession;

          window.sessionHeader = document.querySelector("#sessionHeader") || "";
          window.loginPopOver = document.querySelector(".header-popover") || "";
          window.fileInput = document.querySelector(".ignore-me") || "";

          window.usernameInput = document.querySelector("#username") || "";
          window.passwordInput = document.querySelector("#password") || "";

          window.loginButton = document.querySelector("#submitLogin") || "";
          window.createAccountButton = document.querySelector("#createAccountBtn") || "";
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
          sessionHeader.textContent=`User: ${localStorage.getItem("currentSession")}`
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
          sessionHeader.textContent=`Log In`
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
                  <div class="card">
                      <div class="top-info">
                          <div class="username">
                              <h5>John Doe</h5>
                          </div>
                          <div class="rating">
                              <h5>${card.rating}</h5>
                          </div>
                      </div>
                      <div class="card-img">
                          <button class="favourite" type="button" name="button"> <a class="fa fa-heart" href="#"></a> </button>
                          <img src="${card.url}" alt="">
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
      let checkLoginValidity = async ( ... query ) => {

          // Splitting arguments into variables called u and p for username, password
          let [u, p] = query

          // Sending a request to the api we made in the backend
          // Checks to see if the inputted value, u exists, if it does then return true else, false
          let result = await fetch(`/findUser?q=${u}`);

          // Saves the results as rawData
          let rawData = await result.json();

          // Ternary operator for checking to see if the result is indeed a valid username
          let foundResult = typeof rawData[0] !== "undefined" ? true : false

          // If it is valid then it will check to see if the password is also valid, returning true or false
          let isValid = ( foundResult && rawData[0].username === u && rawData[0].password === p ) ? true : false


          // If logged in already, calls the function for signing out before it returns the result
          // If not, then ignore and continue
          loggedIn ? loginHandler() : null;

          // Saving the name of the user who's logged in for later
          window.attemptedLogin = u;

          // Returns the true/false if they've entered the right username and password
          return isValid

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
              if ( loginCheck ) {

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
          if ( loggedIn ) {

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



      // Loops every .1 second running the following
      setInterval(function () {

          // Loop checks to see if its logged in for when we switch links
          localStorage.getItem("loggedIn") === "true" ? logInStyle() : null
          localStorage.getItem("loggedIn") === "true" ? loggedIn=true : null


      }, 100);




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

          // Next event listener would go here

          listingButton.addEventListener('click', () => {
              console.log(fileInput.value)
          })


      }



  // ------------------------------------------------------------------------------------------------------------------------------------



      // STARTUP TASKS
      handleHomeAnimals();
      refreshElements();
      setupEventListeners();



  })();
