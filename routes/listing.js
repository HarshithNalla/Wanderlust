const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const  wrapAsync=require("../utils/wrapAsync.js");
const  ExpressError=require("../utils/ExpressError.js");
const {isLoggedin} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingcontroller=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingcontroller.index))//index route
.post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.createListing));//create route


 //New route
 router.get("/new",isLoggedin,listingcontroller.renderNewForm
    // console.log(req.user);//to know request has user parameter
    // if(!req.isAuthenticated()){
    //     req.flash("error","you must be logged in to create a listing");
    //     res.redirect("/login");
    // }
     );
 
router.route("/:id")
.get(wrapAsync(listingcontroller.showlisting))//show route
.put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.updateListing))//update route
.delete(isLoggedin,isOwner,wrapAsync(listingcontroller.destroyListing));//delete route

 
 
 

//Edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingcontroller.renderEditForm));





module.exports=router;