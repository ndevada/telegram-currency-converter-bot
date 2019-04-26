const axios     = require('axios');
const BASE_URL  = 'https://free.currconv.com/api/v7/';
const KEY       = 'get key on https://www.currencyconverterapi.com/';

exports.ok = async (from, to) => {
    try {
        let query = `${from}_${to}`;
        return await axios.get(`${BASE_URL}convert?q=${query}&compact=ultra&apiKey=${KEY}`);
    } catch (error) {
        console.log(error);
    }
}