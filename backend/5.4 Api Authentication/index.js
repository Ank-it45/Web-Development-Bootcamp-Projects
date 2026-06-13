import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "janjan29";
const yourPassword = "janjan@29";
const yourAPIKey = "3892097f-e680-41dd-8d7e-9f768e94e50c";
const yourBearerToken = "3f019c94-449a-4dac-810d-931398f5e669";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"/random");
    const result = JSON.stringify(response.data)
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
   try {
    const response = await axios.get(API_URL+"/all?page=2",{
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = JSON.stringify(response.data)
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {

  try {
    const response = await axios.get(API_URL+"/filter",{
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    const result = JSON.stringify(response.data)
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try {
    const response = await axios.get(API_URL+"/secrets/2",/*This is your server talking to another server.*/{
      headers: {
        Authorization: `Bearer ${yourBearerToken}` /*When API receives request:It checks:Is token valid?If YES:Send protected data If NO:401 Unauthorized*/
      },
    });
    const result = JSON.stringify(response.data)
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
// bearer token k work flow
// Browser
//    ↓ GET /bearerToken
// Express Route
//    ↓
// Axios GET request
//    ↓
// Authorization Header Sent
//    ↓
// Secrets API
//    ↓
// Protected JSON Response
//    ↓
// Express receives data
//    ↓
// res.render()
//    ↓
// EJS generates HTML
//    ↓
// Browser displays content



  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
