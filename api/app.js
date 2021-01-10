const express = require('express')
const mongoose = require('mongoose');
require('./models/metas')
const Meta = mongoose.model('Meta')


const app = express()
app.use(express.json())

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "GET, 'PUT,POST");
    res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
    

    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost/manuel', {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=>{
    console.log("conexao com banco realizada com sucesso")

}).catch((erro)=>{
    console.log("conexaão com o banco falhou "+ erro)

});

app.get('/metas', async (req, res)=> {
    await Meta.find({}).then((metas)=>{
        return res.json({
            error: false,
            metas
        })
    }).catch((err)=> {
        return res.status(400).json({
            error: true,
            message:"nenhum registro encontrado"
        })
    })
    
  })

  app.post('/metas', async(req,res)=>{
      await Meta.create(req.body, (err)=>{

          if(err) return res.status(400).json({
              error: true,
              message: " Dados nao cadastrado com sucesso"
          });
      });
      return res.json({
          error: false,
          message:" Dados cadastrado com sucesso"
        

      });
  });

  app.listen(3000 , ()=>{
      console.log("servidor iniciado na porta 3000")
  })