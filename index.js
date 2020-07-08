const express = require('express');
const app =express();
app.get('/',(req,res)=>{
    res.send({hi: 'Bharadwaj'});
});
app.listen(5000);