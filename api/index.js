//dont put @ to your user password in mongo =db cluster
const express = require('express');
const cors = require('cors');   
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const multer = require('multer');

require('dotenv').config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

//middleware
app.use(express.json());
//middleware to read cookies
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
   
}));
//to display uploaded photo link
app.use('/uploads',express.static(__dirname+'/uploads'));

mongoose.connect(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.json("working still")
})

app.post('/register',async (req,res)=>{
    const {name, email, password} = req.body;
   
        try{
            const userData = await User.create({
            name,
            email,
            //dont store password as plain text use encryption
            //use bcrypt to hash password
            //salt should always be string
            password:bcrypt.hashSync(password,bcryptSalt),
        });
          res.json(userData);
        }catch (e){
            res.status(422).json(e);

        }
    
   

});

app.post('/login',async (req,res)=>{
    //grab from request body
    const {email,password}=req.body;
    try{
        const userData = await User.findOne({email});
        if(userData){
            const passwordMatch = bcrypt.compareSync(password,userData.password)
            if(passwordMatch){

                //jwt is used to create token this token is used to authenticate user 
                //and give access to the user by sending this token to the user 
                //and user will send this token to the server to access the data
                //creating jwt and assigning it
                //4 parameter are 1. payload 2. secret key 3. options 4. callback function

                //aslo in future we will use sameSite: 'none' and secure: true
                //why sameSite: 'none' because we are using cross site cookies
                //samesite helps us to send cookies in different domain or host 
                jwt.sign({
                    email:userData.email , 
                    id:userData._id, 
                     },
                jwtSecret,{},(err,token)=>{
                 if(err) throw err;
                 res.cookie('token',token).json(userData);
                });
                
            }else{
                res.status(422).json('password incorrect');
            }
        }else{
            res.json('not found')
        }
    
    }catch (e){
      
    res.status(422).json(e);
    }
    
})


//profile endpoint
app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
 
    
    //if get a token verify it using jwt
    if(token){
        jwt.verify(token, jwtSecret, {} ,async (err,user)=>{
           if(err) throw err;
            const {name,email,_id} = await  User.findById(user.id);
           res.json({name,email,_id});
        })
       
    }else{
        res.json(null);
    }
    
})

app.post('/logout',(req,res)=>{
   res.cookie('token','').json(true);

});
console.log(__dirname);
app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo' + Date.now()+'.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    })
    res.json(newName);
    
})

//why we use multer
//multer is used to upload files
//photosMiddleware.array('photos',100)
//photos is the name of the field in the form and 100 is the maximum number of files that can be uploaded
const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles =[];
    for(let i = 0;i<req.files.length;i++){
        //rename the file
        const{path,originalname}=req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});

app.listen(4000);
