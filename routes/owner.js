//jshint esversion:6
const express = require('express');
const router = express.Router();
router.use(express.static("public"));

let Owner = require('../models/owner');
let Customer = require('../models/customer');
let Property = require('../models/property');
let Registration = require('../models/registration');
let Loan = require('../models/loan');
let Testimonial = require('../models/testimonial');
let Transaction = require('../models/transaction');
let Cancellation = require('../models/cancellation');

router.get("/login", function(req, res){
  res.sendFile(__dirname +'/ologin.html');
});

router.get("/home", function(req, res){
  res.sendFile(__dirname +'/home.html');
});
// router.post("/home", function(req, res){
//   res.sendFile(__dirname +'/home.html');
// });
router.get("/owner/home", function(req, res){
  res.sendFile(__dirname +'/home.html');
});

router.get("/home/about", function(req, res){
  res.sendFile(__dirname +'/about.html');
});

router.post("/login", function(req, res){
  //console.log(req.body.ownerid);
  //console.log(req.body.password);
  let id=req.body.ownerid;
  let pass=req.body.password;
  Owner.findOne({ownerid:9999},function(err,owner){
      if(err){
          console.log(err);
      }else{
          //console.log(owner.ownerpassword);
          if(owner.ownerpassword==pass){
              // res.send("Logged in");
              res.redirect("/owner/home");
          }
      }
  }
  );
});

// router.get("/home", function(req, res){
//     res.render("owner/home", {});
// });









router.get("/home/addcustomer", function(req, res){
    res.render("owner/customer", {
          viewTitle: "Add Customer"
      });
});

cid=2110;
router.post('/customersub', (req, res) => {
    console.log(req.body._id);
    if (req.body._id == ''){
        insertcustomerRecord(req, res);}
    else{
        updatecustomerRecord(req, res);}
});

function insertcustomerRecord(req, res){
    let customer = new Customer();
    cid=cid+1;
    console.log(cid);
    customer.customerid = cid;
    customer.emailid=req.body.emailid;
    customer.customerpassword=cid;
    customer.firstname=req.body.customername;
    customer.firstname=req.body.firstname;
    customer.middlename=req.body.middlename;
    customer.lastname=req.body.lastname;
    customer.dateofbirth=req.body.dateofbirth;
    customer.phonenumber=req.body.phonenumber;
    customer.occupation=req.body.occupation;
    customer.annualincome=req.body.annualincome;
    customer.address=req.body.address;

    customer.save(function(err,customer){
        if (!err){
            console.log("Saved property to DB");
            res.redirect("/owner/home/customerlist");
        }
        else{
            console.log(err);
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("owner/customer", {
                        viewTitle: "Add Customer",
                        customer: req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }


    });
}

function updatecustomerRecord(req, res) {
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('home/customerlist'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("owner/customer", {
                    viewTitle: 'Update Customer',
                    customer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/home/customerlist', (req, res) => {
    Customer.find({})
        .lean()
        .then(docs=>{
            res.render("owner/customerlist", {
                list: docs
            });
        })
        .catch(err=>console.log("Error retrieving list.", err))
});

router.get('/home/customerupdate/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("owner/customer", {
                viewTitle: "Update Customer",
                customer: doc
            });
        }
    });
});

router.get('/home/customerdelete/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/owner/home/customerlist');
        }
        else { console.log('Error in delete :' + err); }
    });
});





















router.get("/home/addproperty", function(req, res){
    res.render("owner/property", {
          viewTitle: "Add Property"
      });
});
let pid=3110;
router.post('/propertysub', (req, res) => {
    console.log(req.body._id);
    if (req.body._id == ''){
        insertpropertyRecord(req, res);}
    else{
        updatepropertyRecord(req, res);}
});

function insertpropertyRecord(req, res){
    let property = new Property();
    pid=pid+1;
    console.log(pid);
    property.propertyid = pid;
    property.propertyname = req.body.propertyname;
    property.propertystatus= req.body.propertystatus;
    property.propertytype = req.body.propertytype;
    property.propertybhk = req.body.propertybhk;
    property.area = req.body.area;
    property.price = req.body.price;
    property.location = req.body.location;
    property.save(function(err,property){
    if (!err){
        console.log("Saved property to DB");
        res.redirect("/owner/home/propertylist");
    }
    else{
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("owner/property", {
                    viewTitle: "Add Property",
                    property: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
      });
 }

 function updatepropertyRecord(req, res) {
     Property.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
         if (!err) { res.redirect('home/propertylist'); }
         else {
             if (err.name == 'ValidationError') {
                 handleValidationError(err, req.body);
                 res.render("owner/property", {
                     viewTitle: 'Update Property',
                     property: req.body
                 });
             }
             else
                 console.log('Error during record update : ' + err);
         }
     });
 }

 router.get('/home/propertylist', (req, res) => {
     Property.find((err, docs) => {
         if (!err) {
             res.render("owner/propertylist", {
                 list: docs
             });
         }
         else {
             console.log('Error in retrieving list :' + err);
         }
     });
 });

 router.get('/home/propertyupdate/:id', (req, res) => {
     Property.findById(req.params.id, (err, doc) => {
         if (!err) {
             res.render("owner/property", {
                 viewTitle: "Update Property",
                 property: doc
             });
         }
     });
 });

 router.get('/home/propertydelete/:id', (req, res) => {
     Property.findByIdAndRemove(req.params.id, (err, doc) => {
         if (!err) {
             res.redirect('/owner/home/propertylist');
         }
         else { console.log('Error in delete :' + err); }
     });
 });




















 router.get("/home/addregistration", function(req, res){
     res.render("owner/registration", {
           viewTitle: "Add Registration"
       });
 });
 let rid=4110;
 router.post('/registrationsub', (req, res) => {
     let registration = new Registration();
     rid=rid+1;
     console.log(pid);
     registration.registrationid = rid;
     registration.propertyname = req.body.propertyname;
     registration.customername = req.body.customername;
     registration.registrationdate = req.body.registrationdate;
     registration.registrationstatus = req.body.registrationstatus;
     registration.save(function(err,property){
     if (!err){
         console.log("Saved registration to DB");
         res.redirect("/owner/home/registrationlist");
     }
     else{
             if (err.name == 'ValidationError') {
                 handleValidationError(err, req.body);
                 res.render("owner/registration", {
                     viewTitle: "Add Registration",
                     registration: req.body
                 });
             }
             else
                 console.log('Error during record insertion : ' + err);
         }
       });

 });

  router.get('/home/registrationlist', (req, res) => {
      Registration.find((err, docs) => {
          if (!err) {
              res.render("owner/registrationlist", {
                  list: docs
              });
          }
          else {
              console.log('Error in retrieving list :' + err);
          }
      });
  });






























  router.get("/home/addloan", function(req, res){
      res.render("owner/loan", {
            viewTitle: "Add Loan Provider"
        });
  });
  let lid=5110;
  router.post('/loansub', (req, res) => {
      console.log(req.body._id);
      if (req.body._id == ''){
          insertloanRecord(req, res);}
      else{
          updateloanRecord(req, res);}
  });

  function insertloanRecord(req, res){
      let loan = new Loan();
      lid=lid+1;
      console.log(lid);
      loan.loanid = lid;
      loan.bankname = req.body.bankname;
      loan.rate = req.body.rate;
      loan.installments = req.body.installments;
      loan.fee = req.body.fee;
      loan.tenure = req.body.tenure;
      loan.maxamt = req.body.maxamt;
      loan.emailid = req.body.emailid;
      loan.save(function(err,loan){
      if (!err){
          console.log("Saved loan to DB");
          res.redirect("/owner/home/loanlist");
      }
      else{
              if (err.name == 'ValidationError') {
                  handleValidationError(err, req.body);
                  res.render("owner/loan", {
                      viewTitle: "Add Loan Provider",
                      loan: req.body
                  });
              }
              else
                  console.log('Error during record insertion : ' + err);
          }
        });
   }

   function updateloanRecord(req, res) {
       Loan.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
           if (!err) { res.redirect('home/loanlist'); }
           else {
               if (err.name == 'ValidationError') {
                   handleValidationError(err, req.body);
                   res.render("owner/loan", {
                       viewTitle: 'Update Loan Provider',
                       loan: req.body
                   });
               }
               else
                   console.log('Error during record update : ' + err);
           }
       });
   }

   router.get('/home/loanlist', (req, res) => {
       Loan.find((err, docs) => {
           if (!err) {
               res.render("owner/loanlist", {
                   list: docs
               });
           }
           else {
               console.log('Error in retrieving list :' + err);
           }
       });
   });

   router.get('/home/loanupdate/:id', (req, res) => {
       Loan.findById(req.params.id, (err, doc) => {
           if (!err) {
               res.render("owner/loan", {
                   viewTitle: "Update Loan Provider",
                   loan: doc
               });
           }
       });
   });

   router.get('/home/loandelete/:id', (req, res) => {
       Loan.findByIdAndRemove(req.params.id, (err, doc) => {
           if (!err) {
               res.redirect('/owner/home/loanlist');
           }
           else { console.log('Error in delete :' + err); }
       });
   });




























   router.get("/home/addtestimonial", function(req, res){
       res.render("owner/testimonial", {
             viewTitle: "Add Testimonial"
         });
   });
   let tid=6110;
   router.post('/testimonialsub', (req, res) => {
       console.log(req.body._id);
       if (req.body._id == ''){
           inserttestimonialRecord(req, res);}
       else{
           updatetestimonialRecord(req, res);}
   });

   function inserttestimonialRecord(req, res){
       let testimonial = new Testimonial();
       tid=tid+1;
       console.log(tid);
       testimonial.testimonialid = tid;
       testimonial.customername = req.body.customername;
       testimonial.occupation = req.body.occupation;
       testimonial.propertyname = req.body.propertyname;
       testimonial.customerdesc= req.body.customerdesc;
       testimonial.customersat = req.body.customersat;
       testimonial.save(function(err,testimonial){
       if (!err){
           console.log("Saved testimonial to DB");
           res.redirect("/owner/home/testimoniallist");
       }
       else{
               if (err.name == 'ValidationError') {
                   handleValidationError(err, req.body);
                   res.render("owner/testimonial", {
                       viewTitle: "Add Testimonial",
                       testimonial: req.body
                   });
               }
               else
                   console.log('Error during record insertion : ' + err);
           }
         });
    }

    function updatetestimonialRecord(req, res) {
        Testimonial.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('home/testimonialist'); }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("owner/testimonial", {
                        viewTitle: 'Update Testimonial',
                        testimonial: req.body
                    });
                }
                else
                    console.log('Error during record update : ' + err);
            }
        });
    }

    router.get('/home/testimoniallist', (req, res) => {
        Testimonial.find((err, docs) => {
            if (!err) {
                res.render("owner/testimoniallist", {
                    list: docs
                });
            }
            else {
                console.log('Error in retrieving list :' + err);
            }
        });
    });

    router.get('/home/testimonialupdate/:id', (req, res) => {
        Testimonial.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("owner/testimonial", {
                    viewTitle: "Update Testimonial",
                    testimonial: doc
                });
            }
        });
    });

    router.get('/home/testimonialdelete/:id', (req, res) => {
        Testimonial.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('/owner/home/testimoniallist');
            }
            else { console.log('Error in delete :' + err); }
        });
    });




















    router.get("/home/addtransaction", function(req, res){
        res.render("owner/transaction", {
              viewTitle: "Add Transaction"
          });
    });
    let trid=7110;
    router.post('/transactionsub', (req, res) => {
        let transaction = new Transaction();
        trid=trid+1;
        console.log(trid);
        transaction.transactionid=trid;
        transaction.transactiondate = req.body.transactiondate;
        transaction.transactionmode = req.body.transactionmode;
        transaction.bankname = req.body.bankname;
        transaction.amtpaid = req.body.amtpaid;
        transaction.transactionstatus = req.body.transactionstatus;
        transaction.referencenum = req.body.referencenum;
        transaction.save(function(err,transaction){
        if (!err){

            console.log("Saved transaction to DB");
            res.redirect("/owner/home/transactionlist");
        }
        else{
                console.log(err);
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("owner/transaction", {
                        viewTitle: "Add Transaction",
                        transaction: req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
          });

    });

     router.get('/home/transactionlist', (req, res) => {
         Transaction.find((err, docs) => {
             if (!err) {
                 res.render("owner/transactionlist", {
                     list: docs
                 });
             }
             else {
                 console.log('Error in retrieving list :' + err);
             }
         });
     });

























     router.get("/home/addcancellation", function(req, res){
         res.render("owner/cancellation", {
               viewTitle: "Add Cancellation"
           });
     });
     let ctid=7110;
     router.post('/cancellationsub', (req, res) => {
         let cancellation = new Cancellation();
         ctid=ctid+1;
         console.log(ctid);
         cancellation.cancellationid = ctid;
         cancellation.propertyname = req.body.propertyname;
         cancellation.customername = req.body.customername;
         cancellation.cancellationdate = req.body.cancellationdate;
         cancellation.amtrefund = req.body.amtrefund;
         cancellation.referencenum = req.body.referencenum;
         cancellation.save(function(err,property){
         if (!err){
             console.log("Saved cancellation to DB");
             res.redirect("/owner/home/cancellationlist");
         }
         else{
                console.log(err);
                 if (err.name == 'ValidationError') {
                     handleValidationError(err, req.body);
                     res.render("owner/cancellation", {
                         viewTitle: "Add cancellation",
                         cancellation: req.body
                     });
                 }
                 else
                     console.log('Error during record insertion : ' + err);
             }
           });

     });

      router.get('/home/cancellationlist', (req, res) => {
          Cancellation.find((err, docs) => {
              if (!err) {
                  res.render("owner/cancellationlist", {
                      list: docs
                  });
              }
              else {
                  console.log('Error in retrieving list :' + err);
              }
          });
      });










let field;
 function handleValidationError(err, body) {
     for (field in err.errors) {
         switch (err.errors[field].path) {
             case 'referencenum':
                 body.referencenumError= err.errors[field].message;
                 break;
            case 'amtrefund':
                     body.amtrefundError= err.errors[field].message;
                     break;
             case 'cancellationdate':
                 body.cancellationdateError= err.errors[field].message;
                 break;
             case 'customername':
                 body.customernameError= err.errors[field].message;
                 break;
            case 'propertyname':
                     body.propertynameError= err.errors[field].message;
                     break;




             case 'referencenum':
                 body.referencenumError= err.errors[field].message;
                 break;
             case 'transactionstatus':
                 body.transactionstatusError= err.errors[field].message;
                 break;
            case 'amtpaid':
                     body.amtpaidError= err.errors[field].message;
                     break;
             case 'bankname':
                 body.banknameError= err.errors[field].message;
                 break;
             case 'transactionmode':
                 body.transactionmodeError= err.errors[field].message;
                 break;
            case 'transactiondate':
                     body.transactiondateError= err.errors[field].message;
                     break;





             case 'customersat':
                 body.customersatError= err.errors[field].message;
                 break;
             case 'propertyname':
                 body.propertynameError= err.errors[field].message;
                 break;
            case 'customername':
                     body.customernameError= err.errors[field].message;
                     break;




             case 'registrationstatus':
                 body.registrationstatusError= err.errors[field].message;
                 break;
             case 'registrationdate':
                 body.registrationdateError= err.errors[field].message;
                 break;
            case 'customername':
                     body.customernameError= err.errors[field].message;
                     break;
             case 'propertyname':
                 body.propertynameError= err.errors[field].message;
                 break;





             case 'emailid':
                 body.emailidError= err.errors[field].message;
                 break;
             case 'tenure':
                 body.tenureError= err.errors[field].message;
                 break;
            case 'maxamt':
                     body.maxamtError= err.errors[field].message;
                     break;
             case 'rate':
                 body.rateError= err.errors[field].message;
                 break;
             case 'bankname':
                 body.banknameError= err.errors[field].message;
                 break;





             case 'location':
                 body.locationError= err.errors[field].message;
                 break;
             case 'price':
                 body.priceError= err.errors[field].message;
                 break;
             case 'area':
                 body.areaError= err.errors[field].message;
                 break;
             case 'propertybhk':
                 body.propertybhkError= err.errors[field].message;
                 break;
             case 'propertytype':
                 body.propertytypeError= err.errors[field].message;
                 break;
             case 'propertystatus':
                 body.propertystatusError= err.errors[field].message;
                 break;
             case 'propertyname':
                 body.propertynameError= err.errors[field].message;
                 break;





             case 'address':
                 body.addressError= err.errors[field].message;
                 break;
             case 'annualincome':
                 body.annualincomeError= err.errors[field].message;
                 break;
             case 'occupation':
                 body.occupationError= err.errors[field].message;
                 break;
             case 'phonenumber':
                 body.phonenumberError= err.errors[field].message;
                 break;
             case 'dateofbirth':
                 body.dateofbirthError= err.errors[field].message;
                 break;
             case 'lastname':
                 body.lastnameError= err.errors[field].message;
                 break;
             case 'emailid':
                 body.emailError= err.errors[field].message;
                 break;
             case 'firstname':
                 body.firstnameError= err.errors[field].message;
                 break;

         }
     }
 }


module.exports = router;
