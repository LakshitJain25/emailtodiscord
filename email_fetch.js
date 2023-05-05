const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const axios = require('axios')
let Gmail = require('node-gmail-api')

const generateConfig = (url, accessToken) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };

  const oAuth2Client = new google.auth.OAuth2(
   "",
   "",
    "http://localhost:3000/"
  );
  oAuth2Client.setCredentials({ refresh_token: "" });
  
  async function getmessage(id){
    const url = `https://gmail.googleapis.com/gmail/v1/users/lakshit331jain@gmail.com/messages/${id}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    // console.log(response.data.payload.body.data)
    let message64 = response.data.payload.body.data
    // console.log(message64)
    let decodedmessage = Buffer.from(message64,"base64").toString('ascii')
    console.log(decodedmessage)
  }
  
  async function getUser(email) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/lakshit331jain@gmail.com/messages`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      console.log(response.data.messages[0].id)
      await getmessage(response.data.messages[12].id)
      
    } catch (error) {
      console.log(error);
    }
  }


  async function trynew(){
    const { token } = await oAuth2Client.getAccessToken();
    let gmail = new Gmail(token)
    let s = gmail.messages('label:inbox',{max:10})
    s.on('data',(d)=>{
      console.log(d.snippet)
    })
  }
trynew()