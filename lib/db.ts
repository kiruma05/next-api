import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", 
  user: "root",      
  password: "",      
  database: "student_api", 
});

export default db;
