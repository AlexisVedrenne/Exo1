let http= require('http')
let fs= require('fs')
let url= require('url')
const EventEmitter = require('events')

let App={
    Start:function(port){
        let emitter= new EventEmitter()
        let serveur= http.createServer((request,response)=>{
            console.log('Il y a eu une requete')
            response.writeHead(200,{
                'content-type': 'text/html; charset=utf-8'                
            })
            if(request.url==='/'){              
                emitter.emit('index',response)
            }
            else{
                response.end()
            }
        }).listen(port)
        
        return emitter
    }
}

let app = App.Start(8080)
app.on('index',function(response){
    fs.readFile('index.html',(err,data)=>{
        if(err){
            response.end("Ce fichier n'existe pas")
        }
        else{          
            response.end(data)
        }
})})


