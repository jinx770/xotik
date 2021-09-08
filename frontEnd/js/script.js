(function() {


// nav clicks
$('#logoBtn').click(function(){
  window.location.href='index.html';
});

$('#animalsBtn').click(function(){
  window.location.href='animal.html';
})
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


























}());
