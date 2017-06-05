import axios from 'axios'
const MockAdapter = require('axios-mock-adapter')
import server from '../config'

const host = server.server
let mock = new MockAdapter(axios)

mock.onGet(host + 'api/1/news/').reply(200, {
    code: '200',
    data: [{
        title: '123'
    }]
})

