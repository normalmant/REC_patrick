const express = require('express');
const app = express()
app.use(express.json())
const port = 3000




const db= require("./db");
const res = require('express/lib/response');


// VER LIVROS //
app.get("/livros", async (req,res)=>{

    try{

        const resultado= await db.pool.query("SELECT * FROM livros")
        res.status(200).json(resultado[0])

    }catch(erro){
        res.status(500).json({erro: erro.message})
    }


})

// ADICIONAR LIVROS //

app.post("/livros", async(req,res)=>{

    try{

        const dados= req.body

        const resultado=await db.pool.query(
            "INSERT INTO livros (nome,autor, editora, publicado) VALUES(?,?,?,?)",
             [dados.nome,dados.autor,dados.editora, dados.publicado ]
            )
            res.status(201).json({resultado:"Livro cadastrado, ID= "+resultado[0].insertId})
    }catch(erro){

        res.status(500).json({erro:erro.message})


    }


})










app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})