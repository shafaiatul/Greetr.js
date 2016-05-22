// Gets a new object ( the architecture allows us to not have to use 'new' keyword here )
var g = $G('John', 'Doe');

//use the chainable methods
g.greet('en').setLang('en').greet(true).log();

//lets use our object on the click of the login button
$('#login').on('click',function() {
//Create  a new 'Greetr' object (let's pretend we know the name from the login)
    var loginGrtr = $G('John', 'Doe');
    //hide the login in the screen
    $('#logindiv').hide();
//fire off the HTML greeting, paasing the '#greeting' as the selector and the chosen language and the log the welcome as well
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});
