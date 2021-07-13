let http= require('http')
let fs= require('fs')
let url= require('url')
const EventEmitter = require('events')
const ovh = require('ovh')({
    appKey: 'Xw9N8B3qYjdLLJac',
    appSecret: 'aQrjqSxKcidBzHMJi1BHQMGBUqskb8KL',
    consumerKey: 'MCPucWVerDskP4nz7T9UnKmeom50vkx0'
  });

let App={
    Start:function(port){
        console.log('Serveur lancer')
        let emitter= new EventEmitter()
        let serveur= http.createServer((request,response)=>{
            response.writeHead(200,{
                'content-type': 'text/html; charset=utf-8'                
            })
            if(request.url==='/'){  
                console.log(request.url)            
                emitter.emit('index',response)
            }
            else if(request.url.includes('/recap')){
                emitter.emit('recap',request,response)
            }
            else if(request.url.includes('/sms')){
                emitter.emit('sms',request,response)
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
    fs.readFile('index.html','utf-8',(err,data)=>{
        if(err){
            response.end("Ce fichier n'existe pas")
        }
        else{          
            response.end(data)
        }
})})
app.on('recap',function(request,response){
    fs.readFile('pages/recap.html','utf-8',(err,data)=>{
        if(err){
            response.end("Ce fichier n'existe pas")
        }
        else{
            let query=url.parse(request.url,true).query
            data=data.replace('{{prenom}}',query.prenom)
            data=data.replace('{{nom}}',query.nom)
            data=data.replace('{{tel}}',query.tel)
            data=data.replace('{{mail}}',query.email)
            data=data.replace('{{adresse}}',query.adresse)
            data=data.replace('{{date}}',query.date)
            response.end(data)
        }
    })
})
app.on('sms',function(request,response){
    ovh.request('GET', '/sms', function (err, serviceName) {
        if(err) {
          console.log(err, serviceName);
        }
        else {
            lien=request.url.replace('/sms','/recap')
          console.log("My account SMS is " + serviceName);
          ovh.request('POST', '/sms/' + serviceName + '/jobs/', {
            message: 'Votre récapitulatif est disponible ici :\n'+'https://localexo1.loca.lt/'+lien,
            senderForResponse: true,
            receivers: ['0033'+url.parse(request.url,true).query.tel]
          }, function (errsend, result) {
            console.log(errsend, result);
          });
        }
      });
      fs.readFile('index.html','utf-8',(err,data)=>{
        if(err){
            response.end("Ce fichier n'existe pas")
        }
        else{
            response.end(data)
        }
      })
})

