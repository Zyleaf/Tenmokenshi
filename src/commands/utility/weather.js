const dotenv = require('dotenv').config();
const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Weather extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        let UNIT = args[0];
        const LOCATION = parsedArgs.substring(2, parsedArgs.length);
        
        if (UNIT.toLowerCase() === 'c') {
            UNIT = 'metric';
        } else if (UNIT.toLowerCase() === 'f') {
            UNIT = 'imperial';
        } else if (UNIT.toLowerCase() === 'k') {
            UNIT = 'kelvin';
        }

        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=${UNIT}&appid=${process.env.OPENWEATHER_API_KEY}`;

        const getWeather = async () => {
            try {
                const response = await axios.get(URL);
                const countryFlagURL = `https://www.countryflags.io/${response.data.sys.country}/flat/64.png`;

                switch (UNIT) {
                    case 'metric':
                        message.channel.send(embedBuilder(true, true,
                            `Weather report for ${response.data.name} | ${response.data.sys.country}`,
                            false,
                            countryFlagURL,
                            `\`\`\`${response.data.weather[0].description.toUpperCase()}\`\`\``,
                            [
                                { name: '`Temperature`', value: `\`\`\`${Math.round(response.data.main.temp)}°C\`\`\``, inline: true },
                                { name: '`Feels like`', value: `\`\`\`${Math.round(response.data.main.feels_like)}°C\`\`\``, inline: true },
                                { name: '`Minimum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_min)}°C\`\`\``, inline: true },
                                { name: '`Maximum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_max)}°C\`\`\``, inline: true },
                                { name: '`Humidity`', value: `\`\`\`${response.data.main.humidity}%\`\`\``, inline: true },
                                { name: '`Wind speed`', value: `\`\`\`${Math.round(response.data.wind.speed)}m/s\`\`\``, inline: true }
                            ],
                            false, true, true));
                        break;

                    case 'imperial':
                        message.channel.send(embedBuilder(true, true,
                            `Weather report for ${response.data.name} | ${response.data.sys.country}`,
                            false,
                            countryFlagURL,
                            `\`\`\`${response.data.weather[0].description.toUpperCase()}\`\`\``,
                            [
                                { name: '`Temperature`', value: `\`\`\`${Math.round(response.data.main.temp)}°F\`\`\``, inline: true },
                                { name: '`Feels like`', value: `\`\`\`${Math.round(response.data.main.feels_like)}°F\`\`\``, inline: true },
                                { name: '`Minimum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_min)}°F\`\`\``, inline: true },
                                { name: '`Maximum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_max)}°F\`\`\``, inline: true },
                                { name: '`Humidity`', value: `\`\`\`${response.data.main.humidity}%\`\`\``, inline: true },
                                { name: '`Wind speed`', value: `\`\`\`${Math.round(response.data.wind.speed)}mph\`\`\``, inline: true }
                            ],
                            false, true, true));
                        break;

                    case 'kelvin':
                        message.channel.send(embedBuilder(true, true,
                            `Weather report for ${response.data.name} | ${response.data.sys.country}`,
                            false,
                            countryFlagURL,
                            `\`\`\`${response.data.weather[0].description.toUpperCase()}\`\`\``,
                            [
                                { name: '`Temperature`', value: `\`\`\`${Math.round(response.data.main.temp)}K\`\`\``, inline: true },
                                { name: '`Feels like`', value: `\`\`\`${Math.round(response.data.main.feels_like)}K\`\`\``, inline: true },
                                { name: '`Minimum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_min)}K\`\`\``, inline: true },
                                { name: '`Maximum temperature`', value: `\`\`\`${Math.round(response.data.main.temp_max)}K\`\`\``, inline: true },
                                { name: '`Humidity`', value: `\`\`\`${response.data.main.humidity}%\`\`\``, inline: true },
                                { name: '`Wind speed`', value: `\`\`\`${Math.round(response.data.wind.speed)}m/s\`\`\``, inline: true }
                            ],
                            false, true, true));
                        break;

                    default:
                        break;
                }
            } catch (error) {
                message.channel.send(embedBuilder(true, true, `Something went wrong!`, false, false, `\`${error}\``, false, false, true, true));
            }
        }
        getWeather();

    }
}

module.exports = {
    name: 'Weather',
    usage: [],
    aliases: ['temp'],
    requiredArgs: false,
    permissions: [],
    description: 'Sends back the weather info!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Weather(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};