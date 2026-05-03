const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb+srv://anandkumarmotion:Anand%4013m@cluster0.ho07z2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/projects", projectRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req,res)=>{
  res.send("Server Running");
});

app.listen(5000, ()=>{
  console.log("Server Running on Port 5000");
});