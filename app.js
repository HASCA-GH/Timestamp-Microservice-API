const express = require('express')
const app = express()
const port = 3000

// var msg = 'Hello xxxx World';
// console.log(msg);

app.get('/', (req, res) => {
  res.send('hello xxxxworld')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })