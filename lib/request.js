import got from "got/dist/source/index.js";
import {Config} from "./config.js";
import {Options} from "./options.js";
import {Url} from "./url.js";
import * as zlib from "node:zlib";
import * as util from "node:util"
const inflateRaw = util.promisify(zlib.inflateRaw);


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


    async uncompressBody(body) {
        return await inflateRaw(body);
    }

    async request(method, path, options = {}) {
        if(this.#config.debug) {
            console.info('#DEBUG - url: ' + this.#url.build(path));
        }
        options = this.#options.build(options);
        try{

            let result = await got[method](this.#url.build(path), options);
            // console.log('result.body:');
            // console.dir(result.body);
            //console.log('decompress: ' + this.#options.decompress);
            if(result.headers['content-encoding']){
                //console.log('there is content-encoding: ' + result.headers['content-encoding']);
                if(result.headers['content-encoding'] === 'deflate' && 
                options.decompress!==undefined && options.decompress===false) {
                    //console.log('will INFATE');
                    result.body = String(await inflateRaw(result.body)); 
                    switch(options.responseType) {
                        case 'json':
                            result.body = JSON.parse(result.body);
                            break;
                        default:

                    }        
                }
            }

            if(!this.#config.fullResponse) {
                if(result.body) {
                    result = result.body;
                }
            }
            return result;
        }catch(err) {
            let newErr = new Error();
            if(err instanceof got.RequestError) {
                let resp = err.response;
                /*newErr = {
                    message: ""+err,
                    code: resp.statusCode ?? resp.code ?? err.code,
                    response: {
                        code: resp.statusCode,
                        statusCode: resp.statusCode,
                        statusMessage: resp.statusMessage,
                        url: resp.url
                    }
                };*/

                newErr.message = ""+err;
                newErr.code = resp.statusCode ?? resp.code ?? err.code;
                newErr.response = {
                    code: resp.statusCode,
                    statusCode: resp.statusCode,
                    statusMessage: resp.statusMessage,
                    url: resp.url
                };

                if(resp.headers['content-encoding']){
                    //console.log('there is content-encoding: ' + result.headers['content-encoding']);
                    let bodyString;
                    if(resp.headers['content-encoding'] === 'deflate' &&
                        options.decompress!==undefined && options.decompress===false) {
                        //console.log('will INFLATE');
                        bodyString = String(await inflateRaw(resp.body));
                    } else {
                        bodyString = String(resp.body);
                    }
                    switch(options.responseType) {
                        case 'json':
                            newErr.response.body = JSON.parse(bodyString);
                            break;
                        default:
                            newErr.response.body = bodyString;
                    }
                }
            } else {
                newErr = err;
            }


            throw newErr;
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
