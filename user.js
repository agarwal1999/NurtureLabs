require('dotenv').config();

const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/user');
const Advisor = require('./models/advisor');
const user = require('./models/user');

router.post('/register', (req, res)=>{
    const {name, email, password} = req.body;
    const hashedPw = md5(password);
    const user = new User({name, email, password:hashedPw});
    const token = jwt.sign({name:user.name, email:user.email}, process.env.ACCESS_TOKEN_SECRET);
    const id = user._id;
    user.save(err=>{
        if(!err){
            res.status(200).json({
                token,
                id
            });
        }else{
            console.log(err);
            res.sendStatus(400);
        }
    })
})

router.post('/login', (req, res)=>{
        const{email, password} = req.body;
        User.findOne({email:email}, (err, foundUser)=>{
            if(err){
                res.sendStatus(401);
            }else{
                if(foundUser.password !== md5(password)){
                    res.sendStatus(401);
                }else{
                    const id = foundUser._id;
                    const token = jwt.sign({name:foundUser.name, email:user.email}, process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).json({
                        token,
                        id
                    })
                }
            }
        })
})

router.get('/:id/advisor', (req, res)=>{
    Advisor.find((err, advisors)=>{
        if(!err){
            res.status(200).json(advisors);
        }
    });
    
})

router.post('/:id/advisor/:advisorId', (req, res)=>{
    try{
        const {id, advisorId} = req.params;
        const booking = {date:req.body.date, advisor:advisorId}
        User.findOneAndUpdate({_id:id},{ $push: { bookings: booking} },err=>{
            if(!err){
                res.sendStatus(200);
            }
        });
    }catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/:id/advisor/booking', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        let response = []
        for (let booking of user.bookings) {
            let advisor = await Advisor.findById(booking.advisor)
            let advisorObject = {
                advisorId: advisor._id,
                name: advisor.name,
                photoUrl: advisor.photoUrl,
                date: booking.date,
                bookingId: booking._id
            }
            response.push(advisorObject)
        }
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

module.exports = router;