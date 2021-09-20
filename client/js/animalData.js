
// ------------------------------------------------------------------------------------------------------------------------------------
// -- DISPLAY DETAILS
// ------------------------------------------------------------------------------------------------------------------------------------



window.animalData = ''
window.items = localStorage.getItem('cartItems')
window.div = document.createElement('div') || '';
window.sendComment = document.querySelector('#sendBtn') || '';
window.displayOwner = document.querySelector('.username') || '';
window.displayLicence = document.querySelector('.licence') || '';
window.displayImage = document.querySelector('.animal-img') || '';
window.displayName = document.querySelector('.animal-name') || '';
window.questionsParent = document.querySelector('.questions') || '';
window.displayPrice = document.querySelector('.price-value') || '';
window.displayDelivery = document.querySelector('.delivery') || '';
window.addToCartButton = document.querySelector('#addToCart') || '';
window.questionInput = document.querySelector('#questionInput') || '';
window.displayLocation = document.querySelector('.sellers-location') || '';
window.displayDescription = document.querySelector('.animal-description') || '';

localStorage.getItem('loggedIn') === 'true' ? logInStyle() : null
localStorage.getItem('loggedIn') === 'true' ? loggedIn = true : null

window.cartList = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


// ------------------------------------------------------------------------------------------------------------------------------------
// -- DISPLAY DETAILS
// ------------------------------------------------------------------------------------------------------------------------------------


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



setInterval(async () => {
    try {
        if (animalData[0].length != 0) {
            div.style.display = 'none'
            enableScroll();
        }
    } catch {
        return
    }

}, 100)


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
    div.innerHTML += `
            <img class='data-page' src='img/loading.gif'>

        `
    disableScroll();
    document.querySelector('body').appendChild(div);
}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- COMMENT LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------


sendComment.addEventListener('click', () => {
    comments.push([questionInput.value, ''])
    updateCommentRequest(comments)
    loadComments()
    questionInput.value = ''
})




let updateCommentRequest = async () => {

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
            location: location

        })

    });

}

let checkLogin = () => {
    return localStorage.getItem('currentSession') === animalData[0].owner ? true : false
}

let answerQuestion = ( input ) => {

    if (!checkLogin()) {
        createAlert('You are not the owner of this listing!')
        return
    } else {

        let thingy = document.querySelectorAll('.question-block')
        let currentElement = thingy[input.getAttribute('data-i')]
        let elementInArray = comments[input.getAttribute('data-i')]
        input.textContent=''

        let loop = setInterval(() => {
            if (!checkLogin()) {
                createAlert('You are not the owner of this listing!')
                clearInterval(loop)
                return
            } else {
                elementInArray[1] = input.textContent
                updateCommentRequest();
            }
        }, 1000)
    }
}

let loadComments = () => {
    questionsParent.innerHTML = ''
    let i = 0
    for (comment of animalData[0].comments) {
        questionsParent.innerHTML += `
                <div class='question-block'>
                    <div class='question'>
                        <h5 style='opacity: 1;' class='q'>Q:</h5>
                        <h5 class='question-text'>${comment[0]}</h5>
                    </div>
                    <div class='answer'>
                        <h5 class='q'> A:</h5>
                        <h5 contenteditable style='opacity: .5' data-i='${i}' class='answer-text' onclick='answerQuestion(this)'> ${ comment[1] != '' ? comment[1] : 'Click me!' }</h5>
                    </div>
                </div>
            `
            i++
    }
}


hideUntilLoaded()
animalDetails()
