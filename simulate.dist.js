import {Request,Config} from "./index.js";
import got from 'got';
import * as util from "node:util"
import * as zlib from "node:zlib";
const inflateRaw = util.promisify(zlib.inflateRaw);

const cfg = {
    'url': 'http://tms.local',
    'path': '/api',
    options:{
        decompress: false
    }
};

const req = new Request(cfg);

console.log('------------------');

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDYzMzIwODMsInJvbGVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnYXRld2F5IiwiZXhwIjoxNjQ2MzUyMDgzfQ.NsV40rVvIrob6UzwY8i3OGf_kH9eSZk7A_ueNNIQu0Xme-jTAi8Bc7fo9F_dBDAKp1U3LifAgdumfLIYZVyCUlJAcwPS13ju8nAHgFOA_1Qx0SUWbzem6TbIOjMzfj_qFX7v9g4xpiMJhdB-ulNc1NnJY97KYzdskFOCsGlXTNp8jWzU3RLWwcvDyP_vh5RrlGpo8hPEeZTOwsxIlMRXje49If2EahIrYKm2EWISDxVb6mbQVXrJgzMHiFjOOOvs3JPjAJHrCt74C6794DOKQQNKwTe7o9-c8rSpxZH0bZY-z2zh86eluuzLf_h91bPwI-JkXF2KdxJTY6i1QSxDz2mq1rzFlpf-9W8ZROCkG404_C8Z9juTA8TcexryumlYvOljk0WR7SXxrlRwxBPOYzlk_Ee-_zv06dOs9o9oI8hyyHexmf9DB3C8hNj5O1lk5Doi889o6Lg-6zJiK77ZwBNXgWtmBOzRpNwSJSplwsQiL_ZQM4RyKzuSjrEUbQcGBDXvOIEijKsRVlP67Hu3mzxT1ByT59_GK3GFJo3COSP5L-s3Spdi-QmNxhEbwW6zVk84fBgU_bVMoLvOdksxjNuM8JCQ_Qx2AOtr7n5IHaEsiSbQNJ15XxuW_8aQKt97vbcsuDJHEQ2-8O57tRuW2ldlhkKed5CPaE1thFoQFXs";
const xHeaders = {Authorization: 'Bearer ' + token};
const authCfg = {
    'url': 'http://tms.local',
    'path': '/api/root',
    headers: xHeaders,
    // debug: true,

    options:
    {
        // responseType: 'json',
        decompress: false
    },
    fullResponse: true
};




const badReq = new Request(authCfg);

//config = {...apiConfig, ...config, ...{headers: xHeaders}, debug: false};

// const badResp = await badReq.get('user');
// const badResp2 = await badReq.patch('user/3588', {json:{myManagers:['3586','3587']}});

try{
    const badResp2 = await badReq.patch('user/3588', {json:{myManagers:[3586,3587,34431241]}});
}catch (err) {
    console.log('error: ');
    console.dir(err);
}

/*const badResp3 = badReq.patch(
    'user/3588',
    {json:{
        myManagers:[3586,3587,879790]
    }}).then(response => {
        console.log('status code: ' + response.statusCode);
        console.log('body:');
        console.dir(response.body);
    }).catch(err => {
        console.log('ERR:');
        console.dir(err);
});*/

console.log('Finished');
/*
console.log('--------- RAW GOT -------------');

try{
    const {gotResult} = await got.patch("http://tms.local/api/root/user/3588",
        {json:{
                myManagers:[3586,3587,13241234214]
            },
            headers: xHeaders,
            decompress: false,
            responseType: "json",
            resolveBodyOnly: true

        },

    );
    console.log('gotResult:');
    console.dir(gotResult);
    console.log('_________');

} catch (err) {
    /!*if(err instanceof got.RequestError) {
        err = {
                request: err.request,
                response: err.response
        }
    }
    console.log(JSON.stringify(err));*!/
    console.log('Error raw:');
    console.dir(err);
    console.log('_____________');
    console.log('Error converted:');

    let newErr = {
        message: ""+err,
        code: err.code,

    }
    if(err instanceof got.RequestError) {
        // newErr.request = err.request;

        let resp = err.response;

        newErr = {
             ...newErr,
            response: {
                code: resp.statusCode,
                statusCode: resp.statusCode,
                statusMessage: resp.statusMessage,
                url: resp.url
            }
        };
        let bodyRaw = String(await inflateRaw(resp.body));
        newErr.response.body = JSON.parse(bodyRaw);
    }

    console.dir(newErr);
    console.log('-----------------------------------');
    console.log('response headers:');
    console.dir(err.response.headers);

}*/


