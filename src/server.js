import express from "express";
import movieRoute from "./routes/movieRoutes.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoute from "./routes/authRoutes.js"

dotenv.config();

connectDB(); //connect to the database

const app = express();
//body parsing middleware
app.use(express.json());  // using a middleware that comes with express that is called express.json. it handles every json sent as
//a body of any req
app.use(express.urlencoded({ extended: true }));//this says to express to automatically parse data from an HTML form submission
//so that you can access it in the req.body

app.use("/api/movies", movieRoute);
app.use("/api/auth", authRoute);

const PORT = 5001;

app.get("/api", (req, res) => {
  res.json({ message: "api is running......." })
});

app.listen(PORT, () => {
  console.log(`api is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  //this is a nodejs process event that is emitted when a promise is rejected 
  // and no error handler is attached to the promise within a turn of the event loop. so this listens to an event unhadledRejection 
  // and then it takes a callback function that takes an error object as an argument 
  // and then we log the error message and then we disconnect from the database and then we close the server 
  // and then we exit the process with failure
  console.error(`unhandledRejection error: ${err.message}`);
  disconnectDB();
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  //this is a nodejs process event that is emitted when an exception bubbles all the way back to the event loop
  // and is not handled by any try/catch block. so we listen to this event and then we log the error message
  console.error(`uncaughtException error: ${err.message}`);
  disconnectDB();
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

  process.on("SIGTERM", () => {
    //this is a nodejs process event that is emitted when the process is terminated. so we listen to this event and then we log the message
    console.log("SIGTERM signal received: closing server"); 
    server.close(async () => {
      await disconnectDB();
      process.exit(1);
    });
  })




//so after creatinf the sever and sucessfully eunning it i want to move to the database now, i am going to create
//a config folder and in it my db .js and at the same time i am going to create a prisma folder outside of my src folder
//to do that i used these commands
//fist i installed prisma by running npm install prisma --save-dev and then i initialized the prisma by running npx prisma init
//so it created a bucnh of stuffs
//then i sintalled prima client using npm install @prisma/client:
//an ORM is a tool that allows you to interact with your database in a more convenient way, using JavaScript/TypeScript instead of raw SQL queries. Prisma Client is the part of Prisma that you use in your application code to query your database.
//now to connect our database to our project we connect it to prisma by going to the .env file and changing the DATABASE_URL to our database url
// and then we go to the schema.prisma file and change the provider to postgresql
// and then we run npx prisma db push to push our schema to the database
//in order to get the dotenv file to work we need to install dotenv package by running npm install dotenv
// and then we import it in our server.js file and then we call the config method on it
//now we create the part of our project that is going to configure the connection to our database
// and we do that by creating a config folder and in it a db.js file
//we have created the config folder and in it the db.js, we imported the prisma client package and then created an instance of the prisma client
//and then the logs we handle both developemnt and production mode, see more in db.js file. and then we created a connectDB function
// that connects to the database and a disconnectDB function that disconnects from the database and then we created them as async functions
// because they are going to be used in the server.js file and then
// we exported them as an array so that we can use them in other parts of our application
// i used the try catch block to catch any errors that might occur when connecting to the database
// and then we log the error message if the connection to the database fails
// now in server.js we imported the connectDB and disconnectDB functions and then we called the connectDB function
// to connect to the database
//in our server.js we connected by calling each of the function, first with connect db
//whenever i connect database, i need to gracefully handle cases in whcih there are issues. we are connecting to the db but when the
//app breaks, we want to disconnect from the db so that there is no memory leaks. to do that i want to handle three different situations
//in my computer's process that could lead to us wanting to disconnect from our database. so these three situations
// first if there is an unhandled rejection(explanation in the code above for it)
//second is the uncaught exception, which is an event that is emitted when an exception bubbles all the way back to the event loop
// and is not handled by any try/catch block. so we listen to this event and then we log the error message
// and then we disconnect from the database and then we close the server and then we exit the process with failure
//the third is the SIGTERM signal, which is a signal that is sent to a process to request its termination.
// so we listen to this event and then we log the message
//and then we disconnect from the database and then we close the server and then we exit the process with failure
// and then we log the message that the process is terminated


//now we can start building our db tables. how do we do that? we go to the schema.prisma file and then we create our models.
// a model is a representation of a table in the database. so we create a model for our contacts table
// and then we define the fields of the table and their types. after that we run npx prisma db push to push our schema to the database.
//so we defined our user model. in order to send the changes we made in the schema, and have it permanent in our table, we run
//npx prisma migrate dev --name <any name>
//so now since we are using prisma client, we need to generate the types for the tables we created in the schema.prisma file.
// so i can easily for example whenever i want to add data to our database, i could go to the route and say user.create and then add
//the user. it is so that we have the types inscribed in. what we need to do is generate our types after making those changes.
//so on top of making this migration, anytime we make a change in our tables, we also need to run npx prisma generate
// to generate the types for the tables we created in the schema.prisma file. so we can easily use them in our code.
//we have created all our models, now we can start creating our routes and controllers for our models.
// so we can create a routes folder
//i alredy have i movieRoute file in it but i am going to now create my auth route
//it is recomended that for each route, i create a controller that will run the actual thing when my empoint is hit
//so i am creating a folder, controllers, and i will create auth controller.js
//so for each route we are going to create a corresponding function which will be in the controllers folder
//something to note: node js and express servers, do not know how to naturally handle json by default so in our server we add
//above the api i am going to add the body parsing middlware:added it already
//install bycrptjs for hashig of the password
//install jwt and then create the helper function for generating jwt in another folder called utils
// and utils folder is basically for any kind of helper file that contains a function that we want to reuse through out our api
// so in it for jwt i created a generateToken.js file
//so for prisma 7 i had to dowload an adapter then i edited the db,js to import and use it
//creating a seed file, to add data to the database, mock data(not real data). so i will create a seed file
//a seed file is a file that contains a function that all it deos is it adds data to the db, mock data so we can test while building
//so now i will create my seed file in the prisma folder 
// and then i will add a script in the package.json file to run the seed file