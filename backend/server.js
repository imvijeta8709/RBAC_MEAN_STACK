const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require("dotenv").config();

const port=process.env.PORT || 5000


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connect successfully")
})

app.use('/api/auth',require('./routes/auth.route'));
app.use('/api/roles',require('./routes/role.route'));
app.use('/api/permissions',require('./routes/permission.route'))
app.use('/api/users',require('./routes/user.route'))


app.listen(port,()=>{
console.log("Server is running")
})