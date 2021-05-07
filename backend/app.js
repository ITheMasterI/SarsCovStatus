const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

const Usuario = require('./models/usuario');
const usuario = require('./models/usuario');

mongoose.connect('mongodb+srv://sars_status:ninabola1@cluster6.uosqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
  console.log("Conexão OK");
}).catch(() => {
  console.log("Erro ao conectar-se com o Banco de Dados");
})


const usuarios = [
]


app.post('/api/usuarios', (req, res, next) => {
  const usuario = new Usuario({
    nome: req.body.nome,
    cpf: req.body.cpf,
    email: req.body.email,
    status: req.body.status,
    relatorio: req.body.relatorio
  })
  usuario.save().
  then (usuarioInserido => {
  res.status(201).json({
  mensagem: 'Paciente inserido',
  id: usuarioInserido._id
  })
  })
});

app.get('/api/usuarios', (req, res, next) => {
  Usuario.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents
    });
  })
});


app.get("/api/usuarios/:id", (req, res, next) =>{

  Usuario.findOne({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({usuario: resultado})


  });
  });



app.delete ('/api/usuarios/:id', (req, res, next) => {
  Usuario.deleteOne ({_id: req.params.id}).then((resultado) => {
  console.log (resultado);
  res.status(200).json({mensagem: "Paciente removido"})
  });
  });




  app.put('/api/usuarios/:id', (req, res, next) => {
    const usuario = new Usuario({
      _id: req.params.id,
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      status: req.body.status,
      relatorio: req.body.relatorio
    });
    Usuario.updateOne({_id: req.params.id}, usuario)
    .then((resultado) => {
      console.log(resultado);
    }).catch((err) => {
      console.log(err);
    });
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'});
  })


//-----------------------------Implementando Chat Real-time-------------------------
























module.exports = app;






