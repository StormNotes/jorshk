
const cors = require('cors');
const mySql = require('mysql');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());

const db = mySql.createConnection({
  user:'root',
  host:'localhost',
  password: 'password',
  database: 'registrostrabajadores'
});

app.post('/create',(req,res)=>{
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const entrada = req.body.entrada;
  const salida = req.body.salida;
  console.log(id,name,entrada,salida);
  db.query('INSERT INTO registrosentradasalida (id,name,horario_entrada,horario_salida) VALUES (?,?,?,?)',[id,name,entrada,salida],(err,result) =>{
    if(err){
      console.log(err);
    }else{
      res.send('Values inserted to the table');
    };
  });
});

app.put("/update",(req,res)=>{
  const id = req.body.id;
  const horarioUpdated = req.body.horario_entrada
  db.query("UPDATE registrosentradasalida SET horario_entrada = ? WHERE id = ?", [horarioUpdated, id], (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});

app.delete('/delete/:id', (req,res)=>{
  const id = req.params.id;
  db.query("DELETE FROM registrosentradasalida WHERE id = ?",id, (err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.get('/getEmpleados', (req, res) => {
  db.query('SELECT * FROM registrosentradasalida', (err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.listen(3001, ()=>{
  console.log('server is working');
});