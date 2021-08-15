const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')

client.on('message', message => {
    if(message.content.startsWith(`!한강`)){
        function Hangang(){
            axios
            .get(
                `http://hangang.dkserver.wo.tc/`
            )
            .then(function (response) {
                try{
                    const time = JSON.stringify(response.data.time).split(' ')[1].split('"')[0].slice(0, 2)
                    if(Number(time) <= 12){
                        const embed = new Discord.MessageEmbed()
                        .setTitle('한강 물 온도')
                        .setColor('BLUE')
                        .addField('**온도**', `${response.data.temp}도`, true)
                        .addField('**날짜**', JSON.stringify(response.data.time).split('"')[1].split(" ")[0], true)
                        .addField('**시간**', `오전 ${JSON.stringify(response.data.time).split(' ')[1].split('"')[0]}`, true)
                        message.channel.send(embed)
                    }
                    else{
                        const embed = new Discord.MessageEmbed()
                        .setTitle('한강 물 온도')
                        .setColor('BLUE')
                        .addField('**온도**', `${response.data.temp}도`, true)
                        .addField('**날짜**', JSON.stringify(response.data.time).split('"')[1].split(" ")[0], true)
                        .addField('**시간**', `오후 ${Number(time) - 12}:${JSON.stringify(response.data.time).split(' ')[1].split('"')[0].slice('3', '8')}`, true)
                        message.channel.send(embed)
                    }
                }
                catch(error){
                    message.reply('Error')
                }
            })
            .catch(function (error, response) {
                message.reply('Error');
            });
        }
        Hangang()
    }
})

client.login('토큰 여기에 입력')
