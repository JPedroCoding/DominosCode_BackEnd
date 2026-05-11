const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db.connection");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));  

app.post("/login", (req, res)=>{
    console.log("bateu na rota");
    const {email,senha} = req.body;
    console.log(email, senha);
    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(query,[email,senha], (err,result) =>{
        console.log(result);


        if (err){
            return res.status(500).json({error: 'Erro ao consultar o banco de dados'});
            console.error(err);


        }
        if(result.length > 0){
            res.json({sucesso:true})
        }else {
            res.json({sucesso:false})
        }
    });
});

app.listen(3000,() => {
    console.log('Servidor rodando na porta 3000');
});