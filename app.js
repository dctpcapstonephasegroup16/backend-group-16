const  express  = require("express");
const {connectToMongoDB} = require('./db');
const userRoute = require('./route/userRoute');
const teacherRoute = require('./route/teacherRoute');
const courseRoute = require('./route/courseRoute');
const assessmentRoute = require("./route/assessmentRoute")
const questionRoute = require("./route/questionRoute")
 require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3000

 app.use(express.json());

 app.use(express.urlencoded({extended:true}))

app.use("/api/v1/users", userRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/courses", courseRoute)
app.use("/api/v1/assessments", assessmentRoute)
app.use("/api/v1/questions", questionRoute)
 // connecting to MongoDB
 connectToMongoDB();

 app.use('/', (req, res) => {
    res.status(200).send('app is working fine');
 })

app.listen(PORT, () => {
console.log(`Server running on port: http://localhost:${PORT}`)
})

