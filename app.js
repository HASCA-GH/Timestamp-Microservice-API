const express = require('express')
const app = express()
const port = 3000

// var msg = 'Hello xxxx World';
// console.log(msg);

// app.get('/', (req, res) => {
//   res.send('hello World .....')
// })

/** Serve an HTML file */
app.get("/", function (req, res) {
  // res.send("Hello Express is running dude! xxxxx ");
  // res.sendFile(absolutePath);
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/api', (req, res) => {
  const d = new Date();
  req.time = new Date().toString();
  // let text = d.toUTCString();
  res.json({ 
      UTC : `${d.toUTCString()}`,
      Peru_time : `${req.time}`})
});

app.get('/api/:dateRequired', (req, res) => {
  let timeWithDash = "", timeInMiliseconds = ""
  
  //Getting the req.params
  const {dateRequired} = req.params
  // console.log(dateRequired);

  //Date with dashes
  if (dateRequired.indexOf("-") != -1) {
    const result = dateRequired.split("-");
    console.log("Resultado: ", result);
    
    //Getting the UTC (GMT)  format
    const d = new Date(`${result[0]}-${result[1]}-${result[2]}`);

    let ms =  Date.parse(`${result[0]}-${result[1]}-${result[2]}`);

    res.json({"unix": ms, "UTC": d.toUTCString() });

  } else { //Date in Milisecons format
    const d = new Date(parseInt(dateRequired));
    res.json({"unix": parseInt(dateRequired), "UTC": d.toUTCString() });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })