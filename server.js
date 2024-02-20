
const http = require('http');
const app = require('./app');
const srv = http.createServer(app);
const port = 5050;

srv.listen(port,()=>{
    console.log('Server On Air. Welcome To Port 5050');});