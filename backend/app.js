const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTyperoutes");
const jobRoute = require("./routes/jobsRoutes");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
//datbase connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
// app.use(cors());

app.use(cors({
  origin: [
    "jobsweb-heph-git-main-muzammilh10s-projects.vercel.app",
    "jobsweb-heph-75n0hb0ut-muzammilh10s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowing all methods
  credentials: true
}));


//routes moddleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobTypeRoute);
app.use("/api", jobRoute);


app.use('/',(req,res) => {
  res.json('hellloooooooo')
})


app.use('/',(req,res) => {
  res.json(`helllo ${process.env.DATABASE}`)
})

//error middlewar
app.use(errorHandler);
//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
