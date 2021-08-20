import {Request, Config} from "./index.js";


const cfg = {
    'url': 'http://tms.local',
    'path': '/api',
    options:{
        decompress: false
    }
};

const req = new Request(cfg);



console.log('Finished');
