const app = require('./config/express');
const config = require('./config/config');


//initiallize mongo
require('./config/mongoose');


//listening to port
app.listen (config.port,()=>{
    console.log(`server started on port ${config.port}`);
});