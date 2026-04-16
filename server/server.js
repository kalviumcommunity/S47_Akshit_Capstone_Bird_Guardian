require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, mongoose } = require('./config/dbConn'); 
const authRoute = require('./routes/auth-router')
const postRoute = require('./routes/post-router')
const contactRoute = require('./routes/contact-router')
const errorMiddleware = require('./middlewares/error-middleware')
const app = express();

connectDB(process.env.DATABASE_URI);

const corsOptions = {
    origin: process.env.Connecting_URL ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
     
app.use('/auth', authRoute)
app.use('/posts', postRoute)
app.use('/', contactRoute)

app.use(errorMiddleware)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    
});
