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
        obj.headers = this.#buildHeaders(options);
        if(!options.responseType) {
            options.responseType = Config.RESPONSE_TYPE_DEFAULT;
        }
        if(!options[Options.NO_DEFAULT_OPTIONS]) {
            options = {...this.#defaultOptions, ...options};
        }
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
