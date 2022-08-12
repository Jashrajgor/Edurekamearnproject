// Node project for Zomato-base website
import myexpress, { response } from 'express'
import mymongodb from 'mongodb'
import cors from 'cors'
const app = new myexpress()
app.use(myexpress.json())
app.use(cors({
    origin : '*'
}))
const mongodbdriver = mymongodb.MongoClient  // making a mongodbdriver and assing  it with the mymongodb.MongolClinet
let databsename    // In this variable i will store the mongodb database name
const mongodburl = "mongodb://127.0.0.1:27017/"    // Url of the mongodb to connect with mongodb compass

// connect method is used to connect with mongodb compass
mongodbdriver.connect(mongodburl , (Error,myd)=>{   
    if(Error) throw Error
    databsename = myd.db("restaurentdata")
    console.log("Database connected successfully")
})

// Geting the data on the base of the location name 
app.get('/datafromreact' , (req,res)=>{
    const nameoflocation = req.query.name
    console.log(nameoflocation)
    databsename.collection('details').find({name : nameoflocation}).toArray((error,data)=>{
        if (error) throw error
        res.send(data)
    })
})

// Geting the data on the base on cuision Name like breakfast , dinner etc..
app.get('/dataofcuision', (req , res)=>{
    const CuisionName = req.query.cuision
    databsename.collection('cusine').find({name : CuisionName}).toArray((error , data)=>{
        if (error) throw error
        res.send(data)
        console.log(data)
    })
})

// Finding the data on the base on sort fileter like (low to high) and (high to low)
app.get('/dataofsort', (req , res)=>{
    const sordata = req.query.sortoption
    console.log(sordata)
    if(sordata == "high"){
    databsename.collection('details').find().sort({"cost":1}).toArray((error , data)=>{
        if(error) throw error
        res.send(data)
        console.log("high method")
    })
   }
   else{
    databsename.collection('details').find().sort({"cost":-1}).toArray((error , data)=>{
        if(error) throw error
        res.send(data)
        console.log("low method")
    })
   }
})

// Port numner of the node project 
app.listen(2020);