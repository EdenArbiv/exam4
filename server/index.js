const express = require("express");
const cors = require("cors");
const { mySql } = require("./db");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/customers", async (req, res) => {
  try {
    const customers = await mySql(`SELECT * FROM customers`);
    res.send(customers);
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/taskslist", async (req, res) => {
  try {
    const tasks = await mySql(`SELECT tasks.*,
    customers.name as customer,
    customers.job ,
    customers.phone,
    customers.email
    FROM tasks
    inner join customers on tasks.customer_id = customers.id
    order by date DESC;`)
    res.send(tasks)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/addtask", async (req, res) => {
  try {
    const {description, customer_id} = req.body
    if(!description || !customer_id){
        return res.status(400).send({msg:'missing some info'})
    }
    await mySql(`insert into tasks(description, customer_id)
    values("${description}", ${customer_id});`)
    res.send({msg:'task added!'})
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const {id} = req.params
    const {done} = req.body
    if(!id){
        return res.status(400).send({msg:'task not found'})
    }
    if(done){
      await mySql(`UPDATE tasks SET done = 0 WHERE id = ${id};`)
      return res.send({msg:'task update!'})
    }else{
      await mySql(`UPDATE tasks SET done = 1 WHERE id = ${id};`)
      return res.send({msg:'task done!'})
    }
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


app.delete("/:id", async (req, res) => {
  try {
    const {id}= req.params
    await mySql(`DELETE FROM tasks WHERE id= ${id};`)
    res.send({msg:'task deleted!'})
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(1000, () => console.log("server up & running"));
