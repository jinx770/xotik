(function() {

    let animalDetails = async () => {

        // Grabbing individual animal in db through it's id
        response = await fetch(`/findAnimal?q=${localStorage.getItem('cardId')}`)

        // Handling the promise
        let animalData = await response.json();

        // Selectors
        let i = 0;
        owner = document.querySelector('.username');
        animalName = document.querySelector('.animal-name');
        price = document.querySelector('.price-value');
        animalDescription = document.querySelector('.animal-description');
        animalImg = document.querySelector('.animal-img');
        altImages = document.querySelectorAll('.alt-img');
        console.log(animalData[0])

        // Changes being made to DOM
        owner.textContent = animalData[0].owner;
        price.textContent = animalData[0].price;
        animalDescription.textContent = animalData[0].description;
        animalName.textContent = animalData[0].name;
        animalImg.src = animalData[0].url


    }

    animalDetails()

}());
