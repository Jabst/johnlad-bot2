const fs = require("fs");

function generateOutputFile(channel, member) {
    const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;

    return fs.createWriteStream(fileName);
}

module.exports = {
    generateOutputFile: generateOutputFile
}



