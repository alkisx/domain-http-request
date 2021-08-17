import Request from "./request";


class Options {

    #request;

    #headers = {
        NO_HEADERS: 'no_headers',
        NO_DEFAULTS: 'no_defaults',
    };

    /**
     * 
     * @param Request request 
     */
    constructor(request) {
        this.#request = request;
    }


    build(options = {}) {
        const obj = {};
        if(!options.noHeaders) {
            obj.headers = {...this.#request};
        }
    }

    /**
     * Options for headers
     */
    get headers() {
        return this.#headers;
    }


}

module.exports = {
    Options
};