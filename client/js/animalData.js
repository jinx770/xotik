


// ------------------------------------------------------------------------------------------------------------------------------------
// -- DECLARATIONS
// ------------------------------------------------------------------------------------------------------------------------------------

window.animalData = ''
window.items = localStorage.getItem('cartItems')
window.div = document.createElement('div') || '';

window.questionsParent = document.querySelector('.questions-two') || '';
window.sendComment = document.querySelector('#sendBtn') || '';

window.displayOwner = document.querySelector('.username') || '';
window.displayLicence = document.querySelector('.licence') || '';
window.displayImage = document.querySelector('.animal-img') || '';
window.displayName = document.querySelector('.animal-name') || '';

window.displayPrice = document.querySelector('.price-value') || '';
window.displayDelivery = document.querySelector('.delivery') || '';
window.addToCartButton = document.querySelector('#addToCart') || '';
window.questionInput = document.querySelector('#questionInput') || '';
window.displayLocation = document.querySelector('.sellers-location') || '';
window.displayDescription = document.querySelector('.animal-description') || '';
window.cartList = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

localStorage.getItem('loggedIn') === 'true' ? logInStyle() : null
localStorage.getItem('loggedIn') === 'true' ? loggedIn = true : null



// ------------------------------------------------------------------------------------------------------------------------------------
// -- DISPLAY DETAILS
// ------------------------------------------------------------------------------------------------------------------------------------

// Func that gets ran onload
let animalDetails = async () => {

    // Grabbing individual animal in db through it's id
    response = await fetch(`/findAnimal?id=${localStorage.getItem('cardId')}`)

    // Handling the promise
    window.animalData = await response.json();
    window.comments = animalData[0].comments

    // Changes being made to DOM
    displayOwner.innerHTML += `Listing by: <u class='usernameHover'>${animalData[0].owner}</u>`;
    displayName.textContent = animalData[0].name;
    displayLocation.textContent = animalData[0].location
    displayDescription.textContent = animalData[0].description;
    displayPrice.textContent = animalData[0].price.toLocaleString();
    displayImage.src = animalData[0].url

    animalData[0].delivery == 'true' ?
        displayDelivery.childNodes[1].className = 'fa fa-check check' :
        displayDelivery.childNodes[1].className = 'fa fa-times times'

    animalData[0].license == 'true' ?
        displayLicence.childNodes[1].className = 'fa fa-check check' :
        displayLicence.childNodes[1].className = 'fa fa-times times'


    addToCartButton.addEventListener('click', () => {

        cartList.push(animalData[0])

        localStorage.setItem('somethingInBasket', true)
        localStorage.setItem('cartItems', JSON.stringify(cartList))

        setTimeout(() => {
            cart.click()
        }, 300)

    })

    loadComments()

}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- RANDOM STUFF
// ------------------------------------------------------------------------------------------------------------------------------------

// Runs every time you type in the comment field
questionInput ? questionInput.addEventListener('keydown', (event) => {

  // Checks to see if the key you pressed was the enter key
  if (event.keyCode === 13) {

    // Stops you from new lining.
    event.preventDefault();

    // Clicks the send comment button (basically pressing enter after you type your comment will submit it)
    sendComment.click()

  }

}) : null

// Loop for making an animation as data is loading
setInterval(async () => {

    // Prevent errors
    try {

        // If animal data
        if (animalData[0].length != 0) {

            // Remove div we created as the data was loading
            div.style.display = 'none'

            // Enable scrolling since there is now data to display
            enableScroll();
        }

    } catch {

        // Break thread
        return
    }

}, 100)


// Div we create for showing a loading animation while we wait for the database
// To send us data from our search, time depends on how big the image saved is
let hideUntilLoaded = () => {
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.background = '#272727';
    div.style.top = '0px'
    div.style.position = 'absolute'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.flexDirection = 'column'
    div.style.alignItems = 'center'

    // Loading gif
    div.innerHTML += `
            <img class='data-page' src='img/loading.gif'>

        `

    // Disabling scrolling so the user can go past it
    disableScroll();

    // Adding the div we just created to the body
    document.querySelector('body').appendChild(div);
}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- COMMENT LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------

// When send button on the comment section is pressed
sendComment.addEventListener('click', () => {

    // Adding the input into a comment array
    comments.push([questionInput.value, ''])

    // Sending a comment request which uploads the comment array to our database
    updateCommentRequest(comments)

    // Refreshing comments
    loadComments()

    // Setting input back to nothing
    questionInput.value = ''
})

// Request to add a comment
let updateCommentRequest = async () => {

    // Update animal, searches ID and replaces all the content with object below,
    // Same data gets updated except the new comment array which has all of our comments
    let response = await fetch('/updateAnimal', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            id: animalData[0]._id,
            name: animalData[0].name,
            type: animalData[0].type,
            url: animalData[0].url,
            price: animalData[0].price,
            rating: animalData[0].rating,
            description: animalData[0].description,
            quantity: animalData[0].quantity,
            owner: animalData[0].owner,
            license: animalData[0].license,
            delivery: animalData[0].delivery,
            comments: comments,
            location: animalData[0].location

        })

    });

}

// Function for removing a comment when you click on the X icon
let removeComment = (e) => {

    // Makes sure that the person removing it is the owner of the listing
    if (localStorage.getItem('currentSession') == localStorage.getItem('ownerOfAnimal')) {

        // Gets current item in array using the int we store on each comment
        let elementInArray = comments[e.getAttribute('data-i')]

        // Removes the comment from the comment array
        removeFromArray(comments, elementInArray)

        // Updates the database with updated comment array
        updateCommentRequest();

        // Refreshes the comments to ensure its updated
        loadComments();

    }

}

// Checking owner
let checkLogin = () => {

    // Returns true or false depending on if youre the owner of the item
    return localStorage.getItem('currentSession') === animalData[0].owner ? true : false
}

// Function that lets you reply to a question
let answerQuestion = (input) => {

    // If function above returns false
    if (!checkLogin()) {

        // Modal saying you aren't the owner
        createAlert('You are not the owner of this listing!')

        // Ending thread so the user can't continue to type
        return

    } else {

        // Getting all question elements
        let thingy = document.querySelectorAll('.question-block')

        // Getting current element using int we stored
        let currentElement = thingy[input.getAttribute('data-i')]

        // Getting the index of the comment in the comments array
        let elementInArray = comments[input.getAttribute('data-i')]

        // Changing the input to nothing
        input.textContent = ''

        // Extra check incase they login after we ran the intial
        let loop = setInterval(() => {

            // If not owner of listing
            if (!checkLogin()) {

                // Say no
                createAlert('You are not the owner of this listing!')

                // Cease loop
                clearInterval(loop)

                // End thread
                return

            } else {

                // Loop update comment answer as the text content
                elementInArray[1] = input.textContent

                // Loop send request
                updateCommentRequest();
            }
        }, 1000)
    }
}

// Function for displaying all comments
let loadComments = () => {

    // Removing previous comments
    questionsParent.innerHTML = ''

    // For storing a data attribute to allow us to get individual comments later
    let i = 0

    // Loop through all comments, seperating them into individuals called comment
    for (comment of animalData[0].comments) {

        // Creating div for each comment
        questionsParent.innerHTML += `
                <div class="question-block">
                  <div onclick="removeComment(this)" data-i='${i}' class="delete-question">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </div>
                  <div class="qa-section">
                    <div class="question">
                        <h5 style='opacity: 1;' class='q'>Q:</h5>
                        <h5 class='question-text'>${comment[0]}</h5>
                    </div>
                    <div class="answer">
                    <h5 class='q'> A:</h5>
                    <h5 contenteditable style='opacity: .5' data-i='${i}' class='answer-text' onclick='answerQuestion(this)'> ${ comment[1] != '' ? comment[1] : 'Reply' }</h5>
                    </div>
                  </div>
                </div>
            `

        // Adding 1 each time we loop through
        i++

        // Adding class if youre the owner, used for showing the hover X effect on a comment
        let block = document.querySelector(".question-block")
        localStorage.getItem("currentSession") === localStorage.getItem("ownerOfAnimal") ?
            block.className = "question-block question-hover" :
            block.className = "question-block"
    }
}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- CALLS
// ------------------------------------------------------------------------------------------------------------------------------------

hideUntilLoaded()
animalDetails()
