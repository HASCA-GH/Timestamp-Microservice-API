const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const port = 3000

/** Serve an HTML file */
app.get("/", function (req, res) {
  // res.send("Hello Express is running dude! xxxxx ");
  // res.sendFile(absolutePath);
  res.sendFile(__dirname + "/views/index.html");
});

let myobj = {}
app.get('/api', (req, res) => {
  myobj['unix']  = new Date().getTime();
  myobj['utc']  = new Date().toUTCString();
  res.json(myobj);
});


app.get('/apizz', (req, res) => {
  const d = new Date();
  req.time = new Date().toString();
  res.json({ 
      UTC : `${d.toUTCString()}`,
      Peru_time : `${req.time}`})
  // const d = new Date();
  // const dToString = d.toString();
  
  // res.json({ 
  //     UTC : `${d.toUTCString()}`,
  //     Peru_time : `${dToString}`})
});

app.get('/api/:input', (req, res) => {
  // Getting the req.params
  let input  = req.params.input
  
  let fecha = new Date(input);
  
  if (fecha.toString() === 'Invalid Date') {
    fecha = new Date(parseInt(input));
  }

  if (fecha.toString() === 'Invalid Date') {
    return res.json({error: "Invalid Date"})
  } else {
    return res.json({unix: fecha.getTime(), utc: fecha.toUTCString()})
  }

  // if (input.includes('-')) {
  // // if (input.indexOf("-") != -1) {
  //   myobj['unix']  = parseInt(new Date(input).getTime());
  //   myobj['utc']  = new Date(input).toUTCString();

  // } else {
  //   input = parseInt(input);
  //   myobj['unix']  = new Date(input).getTime();
  //   myobj['utc']  = new Date(input).toUTCString();
  // }
  // if (!myobj['unix'] || !myobj['utc']) {
  //   return res.json({error: 'Invalid Date'})
  // }
  // res.json(myobj);
});

app.get('/api/json/:dateRequired', (req, res) => {
  let timeWithDash = "", timeInMiliseconds = ""
  
  //Getting the req.params
  const {dateRequired} = req.params

  //Date with dashes
  if (dateRequired.indexOf("-") != -1) {
    const result = dateRequired.split("-");
    console.log("Resultado: ", result);
    
    //Getting the UTC (GMT)  format
    const d = new Date(`${result[0]}-${result[1]}-${result[2]}`);

    let ms =  Date.parse(`${result[0]}-${result[1]}-${result[2]}`);

    res.json({"unix": ms, "utc": d.toUTCString() });

  } else { //Date in Milisecons format
    const d = new Date(parseInt(dateRequired));
    res.json({"unix": parseInt(dateRequired), "utc": d.toUTCString() });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })