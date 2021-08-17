import Config from "./config";
import Options from "./options";
import Url from "./url";

class Request {

    #config = null;
    #options = null;
    #url = null;

    /**
     * 
     * 
     * @param Config config 
     */
    constructor(config) {
        this.#config = config;
        this.#url = new Url(this);
        this.#options = new Options(this);
        
    }


    get config() {
        return this.#config;
    }

    get options() {
        return this.#options;
    }

    get url() {
        return this.#url;
    }


}


module.exports = {
    Request,
    Config
};