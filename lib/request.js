import got from "got/dist/source/index.js";
import {Config} from "./config.js";
import {Options} from "./options.js";
import {Url} from "./url.js";

class Request {

    #config = null;
    #options = null;
    /**
     * @var null|Url
     */
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


    async request(method, path, options = {}) {
        try{
            let result = await got[method](this.#url.build(path), this.#options.build(options));

            if(!this.#config.fullResponse) {
                if(result.body) {
                    result = result.body;
                }
            }
            return result;
        }catch(err) {
            throw err
        }
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


    async get(path, options) {
        return await this.request('get', path, options);
    }

    async post(path, options) {
        return await this.request('post',path, options);
    }

    async put(path, options) {
        return await this.request('put', path, options);
    }

    async patch(path, options) {
        return await this.request('patch', path, options);
    }

    async delete(path, options) {
        return await this.request('delete', path, options);
    }





}


export{
    Request,
    Config
};
