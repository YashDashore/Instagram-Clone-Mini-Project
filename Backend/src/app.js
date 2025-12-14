import express from "express";

const app = express();

app.use(express.json()); //Accepting the json file.
app.use(
    express.urlencoded({
        limit: "20kb",
    })
);

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

export { app };