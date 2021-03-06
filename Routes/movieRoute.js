const express = require("express");
const movieRoute = express.Router();
const Products = require("../Model/productModels");

//Main Page Routes
//@/filmler ---FILMLER----
movieRoute.get("/",async (req,res)=>{

    let query = Products.find({isSeries:false});

    //Searching for names
    if(req.query.name !=null && req.query.name !== ""){
        let query = query.regex("name",new RegExp(req.query.name,"i"))
    };
    
    //Categories of the films
    if(req.query.types){
     query = query.regex("type",new RegExp(req.query.types,"i"))
    }

    //Searching for producers
   if(req.query.producers){
      query = query.regex("producer",new RegExp(req.query.producers,"i"));
   }
    

    // if(req.query.name != null && req.query.name !== ""){
    //     searchOptions.name = new RegExp(req.query.name,'i');
    // }
    // const product = await Products.find({isSeries:false},searchOptions);
    const product = await query.exec();
    res.render("films/index",{
      movies:product,
       searchOptions:req.query
    })
 });

//----------------------------------------------------------------------


//Exporting the route
module.exports = movieRoute; 