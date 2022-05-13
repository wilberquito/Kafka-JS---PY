import fetch from 'node-fetch';

async function consumGithub() {
    const response = await fetch('https://github.com/');
    const body = await response.text();
    console.log(body)
}

async function consumConnectors() {
    const [username, password] = ['admin', 'egeI0El7ZOrOeqIJMKyQ']
    const init = {
        method: 'get',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64')
        }
    }
    const response = await fetch('https://calonge.dev.recitty.com/ihub/connectors', init);
    const body = await response.text();
    console.log(body)
}


consumConnectors();