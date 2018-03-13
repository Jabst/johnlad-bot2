var Discord = require('discord.js');
var request = require('request');
const client = new Discord.Client()
 
const getErrorMessage = maxId => maxId ? 'A puta não tem assim tanta foto no insta' : 'Essa puta tem o insta privado'
 
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
  request(`https://www.instagram.com/${username}/?__a=1&max_id=${maxId || ''}`, (err, res) => {
    if (err) {
      msg.channel.send(getErrorMessage(maxId))
    } else {
      try {
        const photos = JSON.parse(res.body).user.media.nodes
        if (!photos.length) {
          msg.channel.send(getErrorMessage(maxId))
        } else {
          if(start == -1){
            msg.channel.send(photos[Math.min(photos.length, Math.floor(Math.random() * Math.min(12, photos.length)))].display_src)
            getPiropo(msg, username)
          }
          else {
            if (start < photos.length) {
              photos
                .filter((_, i) => i >= start && i <= end)
                .forEach(photo => msg.channel.send(photo.display_src))
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
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
 
client.on('message', msg => {
  const content = msg.content.toLowerCase()
  const fields = /johnlad (\S+) ?(\d*)?-?(\d*)?/.exec(content)
  if (fields.length > 0){
    if (fields[1] == "fetch") {
      getPhotos(msg, fields[2], fields[3] || -1, fields[4] || fields[3])
    }
  }  
  if (content.includes('csgostats')) {
    msg.channel.send('És o pior jogador de cs do Putas & Vinho Verde. A minha avó tem melhor pontaria.')
  }
  if (content.includes('this is to go even further beyond')){
    msg.channel.send('@everyone AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
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
})
 
client.login('NDIzMTcwNjgwMTQyNjkyMzUz.DYmcAA.vrqI2qt_u9lSH6R_EHobFtaswNg')

