const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use( express.json() );

// Definition of Routes
app.use('/hitsAgency', require('./routes/register'));
app.use('/hitsAgency', require('./routes/hits'));
app.use('/hitsAgency',require('./routes/hitmen'))


app.listen( process.env.PORT, () => {
    console.log(`Server listen: ${ process.env.PORT}`);
});