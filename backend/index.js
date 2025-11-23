require('dotenv').config( { path: '.env' } );
const app = require('./app.js');

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `\n-------- Redmond Tech Team Website Server --------\n` + 
        `Server running on http://localhost:${PORT}`
    );
});