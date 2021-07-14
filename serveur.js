let http= require('http')
let fs= require('fs')
let url= require('url')
const EventEmitter = require('events')
let ovh = require('ovh')({
    appKey: '',
    appSecret: '',
    consumerKey: ''
  });
let modif=true

  //Variable qui fait office d'objet et permet de lancer le serveur, sert aussi de routeur sur le cite
let App={
    Start:function(port){
        console.log('Serveur lancer')
        let emitter= new EventEmitter()
        let serveur= http.createServer((request,response)=>{
            response.writeHead(200,{
                'content-type': 'text/html; charset=utf-8'                
            })
            if(request.url==='/'){              
                emitter.emit('index',response)
            }
            else if(request.url.includes('/recap')){
                emitter.emit('recap',request,response)
            }
            else if(request.url.includes('/sms')){
                emitter.emit('sms',request,response)
            }
            else if(request.url.includes('/formulaire')){
                emitter.emit('formulaire',request,response)
            }
            else{
                fs.readFile('pages/erreur.html','utf-8',(err,data)=>{
                    response.end(data)
                })
                //response.end()
            }

        }).listen(port)
        
        return emitter
    }
}

let app = App.Start(8080)

//Evenement index qui va diriger sur la pages d'acceuil du cite
app.on('formulaire',function(request,response){
    fs.readFile('pages/formulaire.html','utf-8',(err,data)=>{
        if(err){
            fs.readFile('pages/erreur.html','utf-8',(err,data)=>{
                response.end(data)
            })
            
        }
        else{
            let query=url.parse(request.url,true).query
            if(modif==true){     
                ovh.appKey=query.appkey
                ovh.appSecret=query.secret
                ovh.consumerKey=query.consumer
                modif=false
            }
            response.end(data)
        }
})})
//Evenement recap qui va diriger vers le récapitulatif
app.on('recap',function(request,response){
    fs.readFile('pages/recap.html','utf-8',(err,data)=>{
        if(err){
            fs.readFile('pages/erreur.html','utf-8',(err,data)=>{
                response.end(data)
            })
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
//Evenement qui permet d'envoyer le sms au numéro spécifier dans le formulaire
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
      fs.readFile('pages/formulaire.html','utf-8',(err,data)=>{
        if(err){
            response.end("Ce fichier n'existe pas")
        }
        else{
            response.end(data)
        }
      })
})

app.on('index',function(response){
     fs.readFile('index.html','utf-8',(err,data)=>{
         if(err){
            fs.readFile('pages/erreur.html','utf-8',(err,data)=>{
                response.end(data)
            })
         }
         else{
             modif=true
             data=data.replace('{{appkey}}',ovh.appKey)
             data=data.replace('{{secret}}',ovh.appSecret)
             data=data.replace('{{consumer}}',ovh.consumerKey)
             response.end(data)
         }
     })
})
