(function(global, $) {
    // ***************************************
    // Step 1 => $G point to 'Greetr' function
    // and it returns a new Greetr.init
    // ***************************************
    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    };

    var supportedLangs = ['en', 'es'];

    var greetings = {
        en : 'Hello',
        es : 'Hola'
    };

    var formalGreetings = {
        en : 'Greetings',
        es : 'Saludos'
    };

    var logMessages = {
        en : 'Logged in',
        es : 'Inicio sesion'
    };

    Greetr.prototype = {

        fullName: function() {
            return this.firstname + ' ' + this.lastname;
        },
        validate: function() {
            if(supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },

        formalGreetings: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

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
            return this;
        },

        setLang : function(lang) {
            this.language = lang;

            this.validate();

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
            var msg;
            if(formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }
            $(selector).html(msg);

            return this;
        }

    };

    // ************************************************************
    // Step 2 => new Greetr.init builds the object, sets the values
    // ***********************************************************
    Greetr.init = function(firstname, lastname, language){
        // 'self' points to the empty object created by the 'new' operator
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
    };
    //Any object created with 'Greetr.init' function should point to 'Greetr.prototype' for it's prototype chain.
    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.$G = Greetr;

})(window, jQuery);
