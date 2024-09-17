const server = require('./api/server');

const port = 3000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`\n ***** listening on the port ${port} ***** \n`)
});