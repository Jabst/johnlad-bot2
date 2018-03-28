var Discord = require('discord.js');
var request = require('request');


const client = new Discord.Client()
 
const getErrorMessage = maxId => maxId ? 'A puta não tem assim tanta foto no insta' : 'Essa puta tem o insta privado'

const key = 'CC83wl-OSvJS2KcwxCKM3wCZXEA';
 
const getPiropo = (msg, username) => {
  if(username.includes('ines')) {
    msg.channel.send("Ai inês inês, com esse cu dás jantar para três")
  }
  if(username.includes('maria')) {
    msg.channel.send("Oh maria dá-mo pito, oh maria dá-mo cá")
  }
  if(username.includes('diana')) {
    msg.channel.send('A única diana que gosto é esta https://scontent-frt3-2.cdninstagram.com/vp/54d0873ea742325215e89f722525b0ae/5B4C4EF6/t51.2885-15/s1080x1080/e15/fr/26154187_140927293285298_6816544815979692032_n.jpg')
  }
  if(username.includes('jessica')) {
    msg.channel.send('Ai jessica contigo dia é praia, noite é kiay')
  }
  if(username.includes('beatriz')){
    msg.channel.send('Beatriz, se me deres o cu eu fico feliz')
  }
  if(username.includes('rita')){
    msg.channel.send('Esta rita é muito pita')
  }
}
 
const getPhotos = (msg, username, start, end, maxId) => {
  console.log(username, start, end, maxId);
  request(`https://www.instagram.com/${username}/?__a=1&max_id=${maxId || ''}`, (err, res) => {
    if (err) {
      msg.channel.send(getErrorMessage(maxId))
    } else {
      try {
        //console.log(res.body);
        const photos = JSON.parse(res.body).graphql.user.edge_owner_to_timeline_media.edges;

        
        if (!photos.length) {
          msg.channel.send(getErrorMessage(maxId))
        } else {
          if(start == -1){
            msg.channel.send(photos[Math.min(photos.length, Math.floor(Math.random() * Math.min(12, photos.length)))].node.display_url)
            getPiropo(msg, username)
          }
          else {
            if (start < photos.length) {
              photos
                .filter((_, i) => i >= start && i <= end)
                .forEach(photo => msg.channel.send(photo.node.display_url))
            }
            start = Math.max(start - photos.length, 0)
            end -= photos.length
            if(end > 0) {
              getPhotos(msg, username, start, end, photos[photos.length - 1].id)
            }
            else {
              getPiropo(msg, username)
            }
          }
        }
      }
      catch(e) {
        msg.channel.send('Esse insta não existe')
      }
    }
  })
}

const getCleverBot = (msg, fields) => {
  var string = "";
  for(var i = 2 ; i < fields.length; i++){
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
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
 
client.on('message', msg => {
  const content = msg.content.toLowerCase()
  const fields = /johnlad (\S+) ?(\d*)?-?(\d*)?/.exec(content)

  const instafields = msg.content.toLowerCase().split(' ');

  const cleverbotfields = msg.content.toLowerCase().split(' ');
  if (instafields){
    if (instafields[1] == "fetch") {
      console.log(instafields);
      getPhotos(msg, instafields[2], instafields[3].split('-')[0] || -1, instafields[3].split('-')[1], 4)
    }
  }
  if(cleverbotfields){
    if(cleverbotfields[1] == "talk"){
      getCleverBot(msg, cleverbotfields);
    }
  }
  if (content.includes('csgostats')) {
    msg.channel.send('És o pior jogador de cs do Putas & Vinho Verde. A minha avó tem melhor pontaria.')
  }
  if (content.includes('this is to go even further beyond')){
    msg.channel.send('@everyone AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH https://media1.giphy.com/media/Po7vUVPOYKqlO/200.gif')
  }
  if(content.includes('why?')){
    msg.channel.send('Because fuck you that\'s why, nigga');
  }
  if (content.includes('johnlad, apologize to black')){
    msg.channel.send('Sorry uncle Blacky');
  }
  if (content.includes('johnlad do the reeeee')){
    msg.channel.send('http://i0.kym-cdn.com/entries/icons/original/000/017/830/b49.gif');
  }
  if (content.includes('johnlad do the sad reeeee')){
    msg.channel.send('https://ih1.redbubble.net/image.195485388.5310/flat,800x800,075,f.jpg');
  }
  if (content.includes('johnlad what next?')){
    msg.channel.send('https://i.imgflip.com/1avf97.jpg');
  }
  
})
 
client.login('NDIzMTcwNjgwMTQyNjkyMzUz.DYmcAA.vrqI2qt_u9lSH6R_EHobFtaswNg')

