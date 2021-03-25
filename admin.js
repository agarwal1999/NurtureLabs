const express = require('express');
const router = express.Router();
const Advisor = require('./models/advisor');


router.post('/advisor', (req, res)=>{
    const {name, photoUrl} = req.body;
    const advisor = new Advisor({name, photoUrl});
    advisor.save(err=>{
        if(!err){
            res.sendStatus(200);
        }else{
            console.log(err);
            res.sendStatus(400);
        }
    })
})

module.exports = router;