import {Config, Request} from "./request.js";
import {Headers} from "./headers.js";


class Options {

    #request;

    static NO_HEADERS = 'no_headers';
    static NO_DEFAULT_HEADERS = 'no_default_headers';

    static NO_DEFAULT_OPTIONS = 'no_default_options';

    #defaultHeaders = {};

    #response = {
        full: true
    };

    #defaultOptions = {};

    /**
     *
     * @param request: Request
     */
    constructor(request) {
        this.#request = request;
        this.#defaultHeaders = this.#request.config.headers;
        this.#defaultOptions = this.#request.config.options;
    }

    static clearHeaderOptions(options) {
        if(options[Options.NO_HEADERS]) {
            delete options[Options.NO_HEADERS];
        }
        if(options[Options.NO_DEFAULT_HEADERS]) {
            delete options[Options.NO_DEFAULT_HEADERS];
        }
    }

    #buildHeaders(options = {}){
        let headers = {};
        const noHeaders = !!options[Options.NO_HEADERS];
        const noDefaultHeaders = !!options[Options.NO_DEFAULT_HEADERS];
        if(noHeaders) {
            return {};
        }
        let optionHeaders = options.headers?? {};
        if(optionHeaders instanceof Headers) {
            optionHeaders = optionHeaders.list;
        }
        if(noDefaultHeaders) {
            return optionHeaders;
        }
        Options.clearHeaderOptions(options);
        return {
          ...this.#defaultHeaders,
          ...optionHeaders
        };

    }


    build(options = {}) {
        const obj = {};
        if(!options[Options.NO_DEFAULT_OPTIONS]) {
            options = {...this.#defaultOptions, ...options};
        }
        obj.headers = this.#buildHeaders(options);
        if(Object.getOwnPropertyNames(obj.headers).length === 0) {
            delete obj.headers;
        }
        if(this.#request.config.debug) {
            console.info('-------Headers:-----');
            console.dir(obj.headers);
            console.info('_________ end headers ________');
        }
        if(!options.responseType) {
            options.responseType = Config.RESPONSE_TYPE_DEFAULT;
        }
        if(!options.debug) {
            options.debug = Config.DEBUG_DEFAULT;
        }
        /*console.log('----- options: -----');
        console.dir(options);
        console.log('_________ end options _______');*/

        return {...options, ...obj};
    }

    /**
     * @returns {{}}
     */
    get defaultHeaders() {
        return this.#defaultHeaders;
    }

    /**
     * @returns {{}}
     */
    get defaultOptions() {
        return this.#defaultOptions;
    }

}

export {
    Options
};
