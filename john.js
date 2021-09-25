let Discord = require('discord.js');
let request = require('request');

const fs = require("fs");

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
let utils = require("./utils.js");

let { VoiceChannel } = require('discord.js');


let client;

const createAndLogin = () => {

  client = new Discord.Client();

  client.login('NDIzMTcwNjgwMTQyNjkyMzUz.WqgKaA._wEP1QemhSo31Re2_raN4OpHm3k')
}

createAndLogin();

// const voiceChannel = new Discord.VoiceChannel();


const key = 'P-3neK1e9CtQLCAqjS10Fj82aP1GIiH_';
 

 const getCleverBot = (msg, fields) => {
  let string = "";
  for(let i = 2 ; i < fields.length; i++){
    string += fields[i] + " ";
  }

    console.log(`http://www.cleverbot.com/getreply?key=${key}&input=${encodeURI(string)}&cs=76nxdxIJ02AAA&callback=ProcessReply`);
  request(`http://www.cleverbot.com/getreply?key=${key}&input=${encodeURI(string)}&cs=76nxdxIJ02AAA&callback=ProcessReply`, (err, res) => {
    if (err) {
      msg.channel.send(getErrorMessage(maxId))
    } else {
      try {
        
        console.log(res.body);
        // console.log(JSON.parse(res.body));

        var message = JSON.parse(res.body.substring(res.body.lastIndexOf("(")+ 1, res.body.lastIndexOf(")"))).output;

        msg.channel.send(message);
        
      }
      catch(e) {
        msg.channel.send('Esse insta não existe')
      }
    }
  })
  
}
 

const joinServer = () => {
  
  
}

/*client.on('join', (cmd, msg) => {
  
});*/

const msgReceived = (msg) => {
  const msgfields = msg.content.split(' ');

  if(msgfields){
    if(msgfields[1] == "talk"){
      getCleverBot(msg, msgfields);
    }
    else if(msgfields[1] == "carneiro"){
      carneiro(msg);
    }
    else if(msgfields[1] == "rickroll") {
      rickroll(msg);
    }
    else if(msgfields[1] == "yt") {
      if (msgfields[2]) {
        yt(msg, msgfields[2]);
      }
    }
    else if(msgfields[1] == "CALOU") {
      shutup(msg);
    }
    else if(msgfields[1] == "scry") {
      scry(msg);
    }
    else if(msgfields[1] == "listen") {
      listen(msg);
    }
    else if(msgfields[1] == "greeter") {
      greeter(msg);
    }
    else if(msgfields[1] == "naruto") {
      naruto(msg);
    }
    else if(msgfields[1] == "monteiro"){
      monteiro(msg);
    }
    else if (msgfields[1] == "boas") {
      carneiroboas(msg)
    }
    else if (msgfields[1] == "chuveiro") {
      chuveiro(msg)
    }
    else if (msgfields[1] == "rank") {
      rank(msg)
    }
    else if (msgfields[1] == "mimimi") {
      mimimi(msg)
    }
    else if (msgfields[1] == "woo") {
      woo(msg)
    }
    else if (msgfields[1] == "power") {
      power(msg)
    }
    else if (msgfields[1] == "sharingan") {
      sharingan(msg)
    }
    else if (msgfields[1] == "pessoa") {
      pessoa(msg)
    }
    else if (msgfields[1] == "bitch") {
      bitch(msg)
    }
    else if(msgfields[1] == "maionese") {
      maionese(msg)
    }
  }
}
 
client.on('message', (msg, smthing) => {

  const content = msg.content.toLowerCase()
  const fields = /johnlad (\S+) ?(\D*)?-?(\D*)? ?(\D*)?-?(\D*)? (\S+)/.exec(content);

  msgReceived(msg)
  
})

client.on('ready', () => {
  if (!client.user) {
    client.user = {
      tag: "alhexanBOT"
    }
  }

  console.log(`Logged in as ${client.user.tag}!`)
})

const shutup = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.leave();
}

const listen = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {
    
    const receiver = connection.createReceiver();    

    connection.on('speaking', (user, speaking) => {
      if(speaking) {
        const audioStream = receiver.createPCMStream(user); //READABLE STREAM

        const outputStream = utils.generateOutputFile(channel, user); // WRITABLE STREAM

        audioStream.on("data", chunk => {
          outputStream.write(chunk);
        });

        audioStream.on('end', () => {
          msg.channel.send(`I'm no longer listening to ${user}`);
          outputStream.end();
          audioStream.destroy();
        })

        // connection = null;
        
      }      
    })

    
  }).catch(console.error);
  
}

const rickroll = (msg) => {

  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const stream = ytdl('https://www.youtube.com/watch?v=kOHB85vDuow', { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
  
}

const naruto = (msg) => {
  
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const stream = ytdl('https://www.youtube.com/watch?v=mjjkHg5FOhk', { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const carneiro = (msg) => {
  
  const channel = client.channels.get(msg.member.voiceChannelID);

  // console.log(msg.member.voiceChannelID);
  console.log(channel);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/carneiro1.mp4");

    /*dispatcher.on('end', () => {
      channel.leave();
    })*/

  }).catch(console.error);
}

const bitch = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/bitch.mp3");

    /*dispatcher.on('end', () => {
      channel.leave();
    })*/

  }).catch(console.error);
}

const maionese = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/maionese.mp3");

    /*dispatcher.on('end', () => {
      channel.leave();
    })*/

  }).catch(console.error);
}

const sharingan = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/sharingan.mp3");

    /*dispatcher.on('end', () => {
      channel.leave();
    })*/

  }).catch(console.error);
}

const rank = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/rank.mp3");

    /*dispatcher.on('end', () => {
      channel.leave();
    })*/

  }).catch(console.error);
}


const scry = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/scry_em_draft.mp3");

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const carneiroboas = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/carneiro_bomdia.mp3");

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const monteiro = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/monteiro.mp4");

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const woo = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/woow.mp3");

  }).catch(console.error);
}

const pessoa = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/pessoa.mp3");

  }).catch(console.error);
}

const power = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/power.mp3");

  }).catch(console.error);
}



const chuveiro = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/chuveiro.mp3");

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const mimimi = (msg) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const dispatcher = connection.playFile("./assets/mimimi.mp3");

    dispatcher.on('end', () => {
      channel.leave();
    })

  }).catch(console.error);
}

const yt = (msg, url) => {
  const channel = client.channels.get(msg.member.voiceChannelID);

  channel.join().then(connection => {

    const stream = ytdl(`${url}`, { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);


  }).catch(console.error);
}

const greeter = (msg) => {

  const channel = client.channels.get(msg.member.voiceChannelID);
  
  msg.channel.send("Estou a cumprimentar o pessoal :kekw:");
  
  client.on('voiceStateUpdate', (oldMember, newMember) => {
    
    // console.log(newMember);
    
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
    channel.join().then(connection => {


      if(oldUserChannel === undefined && newUserChannel !== undefined) {

        if(newMember.user.id == "400977627374157825") {
          msg.channel.send("Olá " + newMember.user.username);
          const dispatcher = connection.playFile("./assets/carneiroin.mp3");

          dispatcher.on('end', () => {
            channel.leave();
          })
        }

        if (newMember.user.id == "112272338459906048") {
          msg.channel.send("Olá " + newMember.user.username);
          const dispatcher = connection.playFile("./assets/carneiroin.mp3");

          dispatcher.on('end', () => {
            channel.leave();
          })
        }
   
     } else if(newUserChannel === undefined){
   
       // User leaves a voice channel
   
     }

      

    });

  });
}
 


const johnladBypass = (msg) => {
  data = {
    content: `johnlad ${msg}`,
    member: {
      channelID: 546726308923834382,
    }
  }

  
  msgReceived(data);

}


exports.johnladBypass = johnladBypass;
exports.cenas = "cenas";
exports.init = createAndLogin;
