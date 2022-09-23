const express=require('express');
const multer=require('multer');
const cors=require('cors');
const bodyparser=require('body-parser');

const app=express();
const mysql=require('mysql');

app.use(cors({ origin:'*'}));
app.use(bodyparser.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'P@s5w0rd',
    port:3306,
    database:'uploadfile'
  
  })


app.get('/',(req,res)=>{
    res.send("Hello World")
})

// Multer Concepts ---------

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './upload');    
    }, 
    filename: function (req, file, cb) { 
       cb(null ,`${file.originalname}`);   
    }
 });

 var uploads = multer({ storage: storage })


 app.post('/image',uploads.single('ram'),(req,res)=>{

    let Typeoffile=req.file.filename;
    let Locationpath=req.file.path;
console.log('rrr',Typeoffile,Locationpath)
    let sql=`insert into uploadfile.practise (typeoffile,locationpath) values('${Typeoffile}','${Locationpath}')`

    db.query(sql,(err,result)=>{
        if(err){
            console.log("Throw error",err);
        }
       else{
            res.send({
                message:'Posted the image successfully',
                success:result
            })
        }
    })

    
    // console.log(req);
    // console.log(res);


     
    //  if(err) {
    //     console.log(err);
    //    res.status(400).send("Something went wrong!");
    //  }
    //  res.send(req.file);
   
 });

 var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './upload');    
    }, 
    filename: function (req, file, cb) { 
       cb(null ,`${file.originalname}`);   
    }
 });

 var uploads = multer({ storage: storage })

 app.post('/images',uploads.array('ram',3),(req,res)=>{
let resdata=[];
let val=req.files
    val.forEach((x)=>{

        let Typeoffile=x.filename;
        let Locationpath=x.path;

    console.log('rrr',Typeoffile,Locationpath)
        let sql=`insert into uploadfile.practise (typeoffile,locationpath) values('${Typeoffile}','${Locationpath}')`
    
        db.query(sql,(err,result)=>{
            if(err){
                console.log("Throw error",err);
            }
           else{
               resdata.push(result)
            }
        })

    })
 if(resdata.length==val.length){
    res.send({resdata})
 }

    // console.log(req);
    // console.log(res);


     
    //  if(err) {
    //     console.log(err);
    //    res.status(400).send("Something went wrong!");
    //  }
     res.send(req.files);
   
 });

app.listen(3000, () => { 

    console.log('Started on port 3000');
});