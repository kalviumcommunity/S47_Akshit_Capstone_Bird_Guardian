require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, mongoose } = require('./config/dbConn'); 
const authRoute = require('./router/auth-router')
const contactRoute = require('./router/contact-router')
const errorMiddleware = require('./middlewares/error-middleware')
const app = express();


// Connect to DB
connectDB(process.env.DATABASE_URI);

const corsOptions = {
    origin: process.env.Connecting_URL , // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
     
app.use('/', authRoute)
app.use('/', contactRoute)

app.use(errorMiddleware)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
