//jshint esversion:6
const express = require('express');
const router = express.Router();
router.use(express.static("public"));

let Customer = require('../models/customer');
let cid=1110;



router.get("/login", function(req, res){
  res.sendFile(__dirname +'/clogin.html');
});




router.post("/register",function(req,res){
    res.render("customer/register",{
          viewTitle: "Customer Registration Form"
      });
});
router.post("/regsub", function(req, res){
    let customer = new Customer();
    cid=cid+1;
    console.log(cid);
    customer.customerid = cid;
    customer.email=req.body.email;
    customer.customerpassword=req.body.customerpassword;
    customer.firstname=req.body.customername;
    customer.firstname=req.body.firstname;
    customer.middlename=req.body.middlename;
    customer.lastname=req.body.lastname;
    customer.dob=req.body.dob;
    customer.phonenumber=req.body.phonenumber;
    customer.occupation=req.body.occupation;
    customer.aincome=req.body.aincome;
    customer.address=req.body.address;

    customer.save(function(err,customer){
        if (err){
            console.log(err);
            res.send("Error");
            return;}
        else{
        console.log("Saved customer to DB");
        res.redirect("/customer/login");
        }
    });
});




router.post("/login", function(req, res){
  console.log(req.body.customerid);
  console.log(req.body.password);
  let id=req.body.customerid;
  let pass=req.body.password;
  Customer.findOne({customerid:id},function(err,customer){
      if(err){
          console.log(err);
      }else{
          console.log(customer.customerpassword);
          if(customer.customerpassword==pass){
              res.send("Logged in");
          }
      }
  }

  );
});


module.exports = router;
