import express from "express";
import axios from "axios";
import { error } from "console";

const app = express();
const port = 3000;
const URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
    const result = await axios.get(URL);
    res.render("index.ejs", {content: result.data});
    } catch(error) {
        res.status(404).send(error.message);
    }
})

app.post("/day", async (req, res) => {
    const date = req.body.day;
    try{
    const result = await axios.get(URL + "&date=" + date);
    res.render("index.ejs", {content: result.data});
    } catch(error) {
        res.status(404).send(error.message);
    }
})

app.listen(port, () =>{
    console.log(`Application has started on localhost:${port}`);
})