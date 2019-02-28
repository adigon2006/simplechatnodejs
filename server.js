var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.Promise = Promise
var dbURL = 'mongodb+srv://adigs_3:Mayowa1989@testcluster-wvvyj.mongodb.net/test?retryWrites=true'
var Message = mongoose.model('Message',{
name:String,
message:String
})

app.get('/messages',(req,res) => {
 Message.find({},(err,messages) => {
    res.send(messages)
 })   
   
})

app.get('/messages/:user',(req,res) => {
    var user = req.params.user
    Message.find({name:user},(err,messages) => {
       res.send(messages)
    })   
      
   })

app.post('/messages', async (req,res) => {

    try { 
        
        var message = new Message(req.body)

        
        var savedMessage = await message.save()

        console.log('saved')

        var censored = await Message.findOne({message:"badword"}) 
    
        
        if(censored)        
            await Message.deleteOne({_id:censored.id})   
        else      
            io.emit('message',req.body)
    
        res.sendStatus(200)    
    } catch (error) {
        res.sendStatus(500)
        return console.log(error)  
    }
    finally{
      console.log("a post message called")  
    }

})
   

io.on('connection',(socket) => {  
 console.log('a user is connected')   
})

mongoose.connect(dbURL,{useNewUrlParser:true},(err) => {
    console.log('mongo db connection',err)
})

var server = http.listen(3022,() => {
 console.log("Server is listening on port",server.address().port)   
})