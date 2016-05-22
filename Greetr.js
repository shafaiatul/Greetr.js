;(function(global, $) {
    // ***************************************
    // Step 1 => $G point to 'Greetr' function
    // and it returns a new Greetr.init
    // ***************************************

    //'new' an Object
    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    };

    //hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];

    //informal greetings
    var greetings = {
        en : 'Hello',
        es : 'Hola'
    };
    // formal greetings
    var formalGreetings = {
        en : 'Greetings',
        es : 'Saludos'
    };
    //logger messages
    var logMessages = {
        en : 'Logged in',
        es : 'Inicio sesion'
    };
    //prototype holds methods (to save memory space)
    Greetr.prototype = {

        //'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstname + ' ' + this.lastname;
        },
        validate: function() {
            //check that is a valid language
            //references the externally inaccessible 'supportedLangs' within the Closure
            if(supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        //retrieve messages from object by referencing to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },

        formalGreetings: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        //chainable methods return their own containing object
        greet: function(formal) {
            var msg;

            //if undefined or null it will be coerced to false
            if(formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }

            if(console) {
                console.log(msg);
            }
            //'this' refers to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            //make chainable
            return this;
        },

        setLang : function(lang) {
            //set the language
            this.language = lang;
            //validate
            this.validate();
            //make chainable
            return this;
        },

        //Adding Jquery Support
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'Jquery not loaded';
            }
            if(!selector) {
                throw 'Missing Jquery selector';
            }

            //determine the message
            var msg;
            if(formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }
            //inject the message in the chosen place in the DOM
            $(selector).html(msg);
            //make chainable
            return this;
        }

    };

    // ************************************************************
    // Step 2 => new Greetr.init builds the object, sets the values
    // ***********************************************************

    //Actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstname, lastname, language){
        // 'self' points to the empty object created by the 'new' operator
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';

        self.validate();
    };

    //Trick borrowed from jQuery so I dont have to use 'new' keyword
    //Any object created with 'Greetr.init' function should point to 'Greetr.prototype' for it's prototype chain.
    Greetr.init.prototype = Greetr.prototype;
    // Attach the Greetr to the global object, and provide a shorthand '$G' for ease of our poor fingers :P
    global.Greetr = global.$G = Greetr;

})(window, jQuery);
