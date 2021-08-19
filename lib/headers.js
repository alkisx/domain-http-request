import {Request} from "./request.js";

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



    /**
     * @var Header{}
     */
    #list = {};

    #headers = [];

    constructor() {

    }

    /**
     * 
     * @param string key 
     * @param string value 
     */
    addPair(key,value) {
        return this.add(new Header(key,value));
    }

    /**
     * 
     * @param Header header 
     */
    add(header) {
        if(!header instanceof Header) {
            throw new Error('header must be an instance of Header');
        }
        this.#list[header.key] = header.value;
        if(this.#headers.length > 0) {
            for(let i=0; i<this.#headers.length; i++) {
                if(this.#headers[i].key===header.key) {
                    this.#headers[i] = header;
                }
            }
        }
        return true;
    }


    find(headerOrKey) {

        if(typeof headerOrKey !=='string' && typeof headerOrKey !=='object') {
            throw new Error('Parameter passed to find() must be either a string key or an object {key:value}');
        }
        if(this.#headers.length===0) {
            return null;
        }
        let key;
        if(typeof headerOrKey === 'object') {
            if(!headerOrKey.key) {
                throw new Error('object passed to find() must at least have a "key" property');
            }
            key = headerOrKey.key;
        } else {
            key = headerOrKey;
        }
        
        return this.#list[key];

    }

    clear() {
        this.#list = {};
        this.#headers = [];
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
     * @var Object
     */
    get list() {
        return this.#list;
    }


}

export { Headers, Header};

/*module.exports = {
    Headers,
    Header
};*/
