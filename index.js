const express=require("express");
const app=express();
 const bodyParser=require("body-parser");
 const cors=require("cors");
 const mysql=require("mysql2");

 const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"naglapr",
    database:"crud"
 });

 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req, res)=>{
    const extractRecords="select * from contact";
    db.query(extractRecords,(error,result)=>{
        res.send(result);
    })
});

app.post('/api/post',(req, res)=>{
    const {name, email, contact}=req.body;
    const postRecords="insert into contact (name, email, contact) values (?,?,?)";
    db.query(postRecords,[name, email, contact],(error,result)=>{
        if(error){console.log(error);}
    })
})

app.get('/api/get/export',(req, res)=>{
    const extractRecords="select * from data";
    db.query(extractRecords,(error,result)=>{
        res.send(result);
    })
});

app.post('/api/post/file',(req, res)=>{
    const exceldata=req.body;
    let strData = exceldata.str;
    
    let strArr = strData.split("/");
    console.log(strArr.length);
    for(let i= 0; i < strArr.length;i++){
        let jsonData=JSON.parse(strArr[i]);
        const id=jsonData.id;
        const name=jsonData.name;
        const email=jsonData.email;
        const postRecords="insert into data (id, name, email) values (?,?,?)";
        db.query(postRecords,[id, name, email],(error,result)=>{
            if(error){console.log(error);}
        })
    }  
})

app.delete('/api/remove/:id',(req, res)=>{
    const {id}=req.params;
    const removeRecords="delete from contact where id =?";
    db.query(removeRecords,id,(error,result)=>{
        if(error){console.log(error);}
    })
})
app.get("/api/get/:id",(req, res)=>{
    const {id}=req.params;
     const extractRecords="select * from contact where id=?";
    db.query(extractRecords,id,(error,result)=>{
        if(error){console.log(error)}
        res.send(result);
    })
});
app.put("/api/update/:id",(req, res)=>{
    const {id}=req.params;
    const {name, email, contact}=req.body;
    const updateRecords="update contact set name =?, email=?,contact=? where id=?";
    db.query(updateRecords,[name,email,contact,id],(error,result)=>{
        if(error){console.log(error)}
        res.send(result);
    })
});
// app.get("/", (req,res)=>{
//     const sqlInsert ="insert into contact (name, email, contact) values ('Ram', 'Ramn@gmail.com', 1876543210)";
//     db.query(sqlInsert, (error,result)=>{
//         console.log("error", error);
//         console.log("Result ",result);
//         res.send("Hello Jatin Pagal");
//     });
    
// })

 app.listen(5000,()=>{
    console.log("Server is running on port 5000");
 });