const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://shapeupsoftware:shapeupsoftware@cluster0.gtafqez.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

// 우리가 사용하는 라우터
app.use('/api/user', require('./routes/user'));
app.use('/api/assembly', require('./routes/assembly'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})