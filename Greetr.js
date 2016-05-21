(function(global, $) {

    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    };

    Greetr.prototype = {};

    Greetr.init = function(firstname, lastname, language){
        //my 'self' points to the empty object created by the 'new' operator
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
    };
    //Any object created with 'Greetr.init' function should point to 'Greetr.prototype' for it's prototype chain.
    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.$G = Greetr;

})(window, jQuery);
