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
     * @param String|null path 
     * @param String|null baseUrl 
     * @returns string
     * @throws Error
     */
    build(path = null, baseUrl = null) {
        let bu;
        if(baseUrl) {
            bu = baseUrl.trim();
            if(bu.length < 3) {
                throw new Error('baseUrl passed is invalid');
            }
        } else {
            bu = this.#baseUrl;
        }


        /*if(bu.substr(-1,1)==='/') {
            bu = bu.substr(0, bu.length-2);
        }*/

        let patt = /(^\/)|(\/$)/g;
        bu = bu.replace(patt, '');
        let parts = [bu];
        if(this.#request.config.path) {
            parts.push(this.#request.config.path.replace(patt,''));
        }
        if(path && path.length) {
            parts.push(path.replace(patt,''));
        }
        

        return parts.join('/');

        // return bu + "/" + path;
        
    }

}

export { Url };
// module.exports = {
//     Url
// };
