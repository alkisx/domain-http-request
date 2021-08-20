class Config {

    static CONFIG_PROPERTIES = [
      'url','path','options','responseTypesAllowed', 'headers','fullResponse'
    ];

    static RESPONSE_TYPE_DEFAULT = 'json';

    static FULL_RESPONSE_DEFAULT = false;

    static DEBUG_DEFAULT = false;

    #url = null;
    #path = null;

    #options = {};
    #responseTypesAllowed = ['json'];
    #fullResponse = Config.FULL_RESPONSE_DEFAULT;
    #debug = Config.DEBUG_DEFAULT;

    #headers = {};
    /**
     * 
     * @param {url,path}|null config 
     */
    constructor(config = null) {
        if(config && Object.getOwnPropertyNames(config).length > 0) {
            for(pname in Object.getOwnPropertyNames(config)) {
                if(Config.CONFIG_PROPERTIES[pname] && config[pname]) {
                    this['#'+pname] = config[pname];
                }
            }
        }
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

    set options(options) {
        this.#options = options;
    }

    get options() {
        return this.#options;
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

    /**
     *
     * @returns {boolean}
     */
    get fullResponse() {
        return this.#fullResponse;
    }

    get debug() {
        return this.#debug;
    }

}
    





export {Config}
