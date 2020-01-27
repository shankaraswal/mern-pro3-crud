const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const {mongourl} =require('./env_config/keys')
const Info = require('./models/user_tables');
mongoose.connect(mongourl, {useNewUrlParser:true});

module.exports = (app) => {
    //GET METHOD: to render
    app.get('/', (req, res) => {
        Info.find({}).then(data =>{
            res.render('home', {
                userdata: data,
                title: "Home Page",
                success: ""
            })
        });
    });

    app.get('/home', (req, res) => {
        Info.find({}).then(data =>{
            res.send(data);
        });
    })

    app.get('/userdetail/:id', (req, res)=>{
        Info.findById({_id:req.params.id}).then(data =>{
            res.render('userdetail', {
                userdata: data,
                title: "User Detail ",
                success: ""
            })
        })
    });

    app.get('/userdetailReact/:id', (req, res)=>{
        Info.findById({_id:req.params.id}).then(data =>{
            res.send(data);
        })
    });
    
    app.get('/edituser/:id', (req, res)=>{
        Info.findById({_id:req.params.id}).then(data =>{
            res.render('edituser', {
                userdata: data,
                title: "Edit User Detail ",
                isChecked:  data.check ==='working' ? 'checked' : '' ,  
                success: ""
            })
        })
    });


    app.get('/about', (req, res) => {
        res.render('about', {
            title: "About Page"
        })
    })
    
    app.post('/sent', async (req, res) => {
        try{
        let isChecked = req.body.check === 'on' ? "working" : "not working";
        const Item = new Info({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            check: isChecked
         })

         await Item.save();
            res.send(Item);
         }
        catch(err){
            res.status(500)
        }
    })

    app.put('/update', async (req, res)=>{
        alert('asdfas')
        try {
            let isChecked = req.body.check === 'on' ? "working" : "not working";
            const Item = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                check: isChecked
             }
            console.log(Item)
            const record = await Info.findByIdAndUpdate({
                _id: req.body.userid
            }, Item, {
                new: true
            })
            res.send(record);

        } catch(err){
            res.status(500)
        }
    })

    app.delete('/remove/:id', (req, res)=>{
        Info.findOneAndRemove({_id:req.params.id}).then(data =>{
            res.send(data);
        })
    })
}