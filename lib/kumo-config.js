/* 
    --------------------------------------------------------------

        
        Author : Jorge Luis Mayorga
        Update : 3/06/18
    
    --------------------------------------------------------------
*/

'use strict';

// ---------------------------------------------- //
// Dependencies (i.e Imports, Require)            //
// ---------------------------------------------- //

// ---------------------------------------------- //


// ---------------------------------------------- //
// Kumo's Class 
// ---------------------------------------------- //
class KumoConfig {

    // constructor()
    constructor(config) {
        this.config = config;
    }
    
    getName(){
        return this.config.name;
    };
    
    getDescription(){
        return this.config.description;
    };
    
    

}
module.exports = KumoConfig;
// ---------------------------------------------- //
