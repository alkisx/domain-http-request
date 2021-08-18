class Config {

    #baseUrl = null;
    #path = null;
    #url = null;

    #defaultOptions = {};
    #responseTypesAllowed = ['json'];
    

    constructor(config = null) {
        if(config && Object.getOwnPropertyNames.length > 0) {
            for(pname in Object.getOwnPropertyNames) {
                if(config[pname]) {
                    this['#'+pname] = config[pname];
                }
            }
        }
    }

    set baseUrl(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    get baseUrl() {
        return this.#baseUrl;
    }

    set path(path) {
        this.#path = path;
    }

    get path() {
        return this.#path;
    }

    set url(url) {
        this.#url = url;
    }

    get url() {
        return this.#url;
    }

    set defaultOptions(defaultOptions) {
        this.#defaultOptions = defaultOptions;
    }

    get defaultOptions() {
        return this.#defaultOptions;
    }

    set responseTypesAllowed(responseTypesAllowed) {
        this.#responseTypesAllowed = responseTypesAllowed;
    }
    
    get responseTypesAllowed() {
        return this.#responseTypesAllowed;
    }

    addResponseTypeAllowed(responseType) {
        if(typeof responseType==='string' && 
        responseType.length > 0 && 
        this.#responseTypesAllowed.indexOf(responseType)===-1
        ) {
            this.#responseTypesAllowed.push(responseType);
            return true;
        }
        return false;
    }

    addResponseTypesAllowed(list) {
        if(list.length && list.length > 0) {
            for(let i = 0; i < list.length; i++) {
                if(typeof list[i]==='string' && 
                list[i].length > 0 && 
                this.#responseTypesAllowed.indexOf(list[i])===-1
                ) {
                    this.addResponseTypeAllowed(list[i]);
                }
            }
            
        }
        
    }

    

}



module.exports = {
    Config
};