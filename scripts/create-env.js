/* Require the filesystem */
const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.API} \n`);