import { Client, IntentsBitField, Message } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
    ]
})

client.on('ready',()=>{
    console.log("BOT READY")
})

client.on('messageCreate',(message)=>{
    if(message.content === "HELLO")message.reply("HI")
})

client.login(process.env.TOKEN)