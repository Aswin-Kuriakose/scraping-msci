import dotenv from 'dotenv'
dotenv.config()

import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

const proxyUrl = process.env.PROXY_URL
const targetUrl = 'https://'

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    agent: new HttpsProxyAgent(proxyUrl) 
}
async function getData() {
    try {
        const response = await fetch(targetUrl, options)
        const data = await response.json()        
    } catch (error) {
        console.error(error)
    }

}

getData()