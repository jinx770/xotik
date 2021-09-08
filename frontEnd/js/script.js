( async () => {


    // nav clicks
    $('#logoBtn').click(function(){
      window.location.href='index.html';
    });

    // $('#animalsBtn').click(function(){
    //
    // })
    //
    // $('#whoBtn').click(function(){
    //
    // })
    //
    // $('#trustBtn').click(function(){
    //
    // })

    $('#listingBtn').click(function(){
      window.location.href='listing.html';
    });
    // header popover begins


    $('#user').click(function(){
        $("#headerPopover").fadeIn("slow");
        $("#loginContent").css("display", "flex");
        $("#cartContent").css("display", "none");
    });

    $('#cart').click(function(){
        $("#headerPopover").fadeIn("slow");
        $("#cartContent").css("display", "flex");
        $("#loginContent").css("display", "none");
    });



    $('#popoverExit').click(function(){
        $("#headerPopover").fadeOut("slow");
        $("#loginContent").css("display", "none");
        $("#cartContent").css("display", "none");
    });



// ----------------------------------------------------------------------------------------------------------------------------------



    let response = await fetch('/findAnimal')
    let data = await response.json()

    let cardParent = document.querySelector(".all-listings");
    let cards = document.querySelectorAll(".card");

    cardParent.innerHTML = ""
    for (card of data) {
        cardParent.innerHTML += `
            <div class="card">
              <div class="top-info">
                <div class="username">
                  <h5>John Doe</h5>
                </div>
                <div class="rating">
                  <h5>4.5#</h5>
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











})();
