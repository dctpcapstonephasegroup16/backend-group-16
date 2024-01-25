const  express  = require("express");
const {connectToMongoDB} = require('./db');
const userRoute = require('./route/userRoute');
 require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3000

 app.use(express.json());

 app.use(express.urlencoded({extended:true}))

app.use("/api/v1/users", userRoute);
 // connecting to MongoDB
 connectToMongoDB();

 app.use('/', (req, res) => {
    res.status(200).send('app is working fine');
 })

app.listen(PORT, () => {
console.log(`Server running on port: http://localhost:${PORT}`)
})

