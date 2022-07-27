import axios from 'axios'

const sendAPI = async (method, path, data) => {
    const pathBuilder = require('./Path')
    const config = {
        method,
        url: pathBuilder.buildPath(path),
    }
    switch(method){
        case 'get':
            config.params = data;
            break;
        default:
        case 'post':
        case 'put':
        case 'delete':
            config.data = data;
            break;
    }
    const res = await axios(config);
    return res;

}

export default sendAPI