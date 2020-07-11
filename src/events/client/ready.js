const axios = require('axios');
const updateStatus = require('../../snippets/readyEvent/updateStatus');

module.exports = async (client) => {
    console.log('Bot online!');
    updateStatus(client);

    /* try {
        const headers = {
            'Host': 'https://discord.bots.gg/api/v1',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiNTI2NDQ5ODcxNjcxMDAxMDk4IiwiaWF0IjoxNTk0NDc2NjYzfQ.bEt_2GEPVFKBbVDIp5GWrGj4GzH5jzyx0nfSBgFzwX8',
            'Content-Type': 'application/json'
        };
        const data = {
            "shardCount": 1,
            "guildCount": client.guilds.size
        };
        const response = await axios.post('https://discord.bots.gg/api/v1/bots/704858947701571666/stats', data, {
            headers: headers
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }*/
};