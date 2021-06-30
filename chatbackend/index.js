const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require ("body-parser");
const mysql = require("mysql");
const sendEmail = require('./email');
const emailCrypter = require('./emailCrypter');




const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'chat',
}

)
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res) =>{
    res.send("hello");
});
// app.get("/register", (req,res) =>{
//     res.send("reg");
// });
app.post("/register", (req,res) =>{

    const first_name= req.body.first_name;
    const last_name= req.body.last_name;
    const email= req.body.email;
    const password= req.body.password;
    //res.send(req.body.first_name);
    console.log("This is user data : " + req.body.first_name);
    const sqlInsert = "INSERT INTO user (first_name,last_name,email,password) VALUES (?,?,?,?)";
    db.query(sqlInsert, [first_name,last_name,email,password], (err,result) =>{
           
        async function start() {
            try{
                //const saveVendeur = await vendeur.save();
                //http://localhost:3001/api/users/verification?id=4&userKey=saraElhamel@gmail.com
                await sendEmail("http://localhost:3001/api/users/verification?id=4&userKey=" + emailCrypter.convertToHex(email));
                //res.json(saveVendeur);
            }catch (err)
            {
        //res.json({message:err});
        console.log(err);
            }
         }
         start()
            res.send("saved");
    });
    
});
app.post("/login", (req,res) =>{
    const email= req.body.email;
    const password= req.body.password;
    const sqlInsert = "INSERT INTO user (email,password) VALUES (?,?)";
    db.query(sqlInsert, [email,password], (err,result) =>{
           console.log(result)
       
    });
    
});
// app.get("/user", () =>{
//     db.connect(function(err) {
//         const is_account_verified= is_account_verified;
//         db.query("SELECT is_account_verified FROM user WHERE id = 50 ", function (res, result) {
            
//            if (is_account_verified === 1){
//                //console.log("permetted")
//                res.send("permetted");
//            }else{
//                //console.log("denied")
//                res.send("denied");
//            }
//         });
//       });
   
// });
app.get('/api/users/verification', function(req, res) {
    const user_id = req.query.id;
    const userKey = req.query.userKey;
    const given_email = emailCrypter.convertFromHex(userKey);
    var email;
    db.query("SELECT email FROM user WHERE id = $user_id", function (res, result) {
        email= result.email;
       if (given_email === email){
           //console.log("permetted")
           //res.send("this is account is already verified");
           db.query("SELECT is_account_verified FROM user WHERE id =" + user_id, function (res, result) {
            const is_account_verified= result[0].is_account_verified;
           if (is_account_verified === 1){
               //console.log("permetted")
               res.send("this is account is already verified");
               console.log("this is account is already verified")
           }else{
               //console.log("denied")
               //res.send("this is account is already verified");
               var sql = "UPDATE user SET is_account_verified = '1' WHERE id = " + user_id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
      res.send("Account verified successfully");
      console.log("Account verified successfully")
           }
        });
       }else{
           //console.log("denied")
           //res.send("this is account is already verified");
           res.send("your account is suspended! try to contact support .");
           console.log("your account is suspended! try to contact support .")
           
       }
    });
//     db.query("SELECT is_account_verified FROM user WHERE id =" + user_id, function (res, result) {
//         const is_account_verified= result[0].is_account_verified;
//        if (is_account_verified === 1){
//            //console.log("permetted")
//            res.send("this is account is already verified");
//        }else{
//            //console.log("denied")
//            //res.send("this is account is already verified");
//            var sql = "UPDATE user SET is_account_verified = '1' WHERE id = " + user_id;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
//   });
//        }
//     });
//     if(email === "saraelhamel88@gmail.com")
//     {
// response = "your Account is verified your can chat now"
//     }
//     else
//     {
//         response = "there is something wrong please try later!"
//     }
    //console.log(SHA256(email));
    //var sha1 = require('sha1');

    //var shashMail = parseInt(email.replace(/^#/, ''), 16);
   // var hex = parseInt(email.replace(/^#/, ""), 16);

//console.log(hash);
    // res.send({
    //   'result': "you did a good",
    //   'email': email,
    // });
  });
  


app.listen(3001, ()=> {
    console.log("running on port 3001");
});

    
