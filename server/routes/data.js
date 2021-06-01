const express = require('express');
const router = express.Router();
const Data = require("../models/data");

router.post('/', (req,res)=>{
    const datas = new Data(req.body);
    console.log("datas ",datas);
    datas.save((err, data)=>{
        if(err){
            return res.status(400).json({
                err:"NOT able to save data in db"
            })
        }
        return res.json({
            id:data._id,
            one:data.one,
            two:data.two,
            three:data.three,
            createdAt:data.createdAt,
        });
    });
})

router.get('/', (req,res)=>{
    Data.find()
     .exec((err, data)=>{
         if(err){
             return res.status(400).json({
                 error:"No data found"
             })
         }
        return res.json(data);
     })
})

module.exports = router;