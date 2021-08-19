//import Request from "./request.js";

class Url {

    #request;
    /**
     * @var string
     */
    #baseUrl;


    /**
     * 
     * @param Request request 
     */
    constructor(request) {
        this.#request = request;
        this.#baseUrl = this.#request.config.url;
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
            bu = this.#baseUrl;
        }

        return bu + "/" + path;
        
    }

}

export { Url };
// module.exports = {
//     Url
// };
