import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Creating connection with MySQL
const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12624507",
    password: "3b5dTgQaA5",
    database: "sql12624507"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM students"
    db.query(sql, (err, result) => {
        if (err) {
            return res.json( {Message: "Error inside Server"} )
        }
        else {
            return res.json(result);
        }
    })
})

app.post("/student", (req, res) => {
    const sql = "INSERT INTO students (`Name`, `Email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if (err) 
            return res.json(err)
        else
            return res.json(result)
    })
})

app.get("/read/:id", (req, res) => {
    const sql = "SELECT * FROM students WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json( {Message: "Error inside Server"} )
        }
        else {
            return res.json(result);
        }
    })
});

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE students SET `Name` = ?, `Email` = ? WHERE ID = ? ";
    const id = req.params.id;
    console.log(req.body.name, req.body.email, id);
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            console.log("Error -> ", err);
            return res.json( {Message: err} )
        }
        else {
            return res.json(result);
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM students WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json( {Message: "Error inside Server"});
        }
        else {
            return res.json(result);
        }
    })
})

app.listen(3306, () => {
    console.log("Server running on port 8081");
})