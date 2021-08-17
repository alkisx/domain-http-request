import Request from "./request";

class Header{
    #key = null;
    #value = null;

    /**
     * 
     * @param string key 
     * @param strign value 
     */
    constructor(key, value) {
        this.#key = key;
        this.#value = value;
    }

    valueOf() {
        return {
            [this.#key] : this.#value
        };
    }

    get header() {
        return this.valueOf();
    }

    get key() {
        return this.#key;
    }

    get value() {
        return this.#value;
    }

    /**
     * 
     * @returns string
     */
    toString() {
        return this.#key + ":" + this.#value;
    }


}

class Headers {

    #list;

    /**
     * Request
     */
    #request

    /**
     * 
     * @param Request request 
     */
    constructor(request) {
        this.#request = request;
    }

    /**
     * 
     * @param string key 
     * @param string value 
     */
    add(key,value) {
        this.#list[key]=value;
    }

    /**
     * 
     * @param Header header 
     */
    addHeader(header) {
        if(!header instanceof Header) {
            throw new Error('header must be an instance of Header');
        }
        this.#list[header.key] = header.value;
    }

    clear() {
        this.#list = {};
    }

    /**
     * 
     * @param Object options 
     */
    build(options = {}) {

    }

    /**
     * 
     * @returns array
     */
    toArray() {
        let arr = [];
        for(let key in this.#list) {
            arr.push({
                [key] : this.#list[key]
            });
        }
        return arr;
    }

    /**
     * 
     * @returns Object
     */
    toObject() {
        let obj = {};
        for(let key in this.#list) {
            obj[key] = this.#list[key];
        }
        return obj;
    }

    get list() {
        return this.#list;
    }


}