import Request from "./request";

class Url {

    #request;

    /**
     * 
     * @param Request request 
     */
    constructor(request) {
        this.#request;
    }

    /**
     * 
     * @param String path 
     * @param String|null baseUrl 
     * @returns string
     * @throws Error
     */
    build(path, baseUrl = null) {
        let bu;
        if(baseUrl) {
            bu = baseUrl.trim();
            if(bu.length < 3) {
                throw new Error('baseUrl passed is invalid');
            }
        } else {
            bu = this.baseUrl;
        }

        return bu + "/" + path;
        
    }

}


module.exports = {
    Url
};