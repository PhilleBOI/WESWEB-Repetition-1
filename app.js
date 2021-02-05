//Inkludera Express.js
const express = require('express')
//Inkludera dbModule.js
const dbModule = require('./dBModule')
//Inkludera MessageModel för att kunna spara meddelanden i databasen 
const PersonModel = require('./PersonModel')
//Gör en instans klassen express
const app = express()
//Ange porten som servern kommer att lyssna på.
const port = 3000

//Sökväg till sökväg till en mapp för alla statiska sidor och sätt den som default sökväg.
const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

//Sätt upp servern så att den kan tyda json och urlencoded
app.use(express.json())
app.use(express.urlencoded())

//Ställ in EJS som vymotor för servern. 
app.set('view engine' , 'ejs')

//Lyssnar på GET requests på addressen <domain>/
app.get('/', async(req, res) => {
  const nameList = await PersonModel.getAllPeople()
  console.log(nameList)
    //rendera sidan index.ejs
  res.render('./index.ejs', {names: nameList})
})

//Lyssnar på POST requests på addressen <domain>/
app.post('/', function (req, res) {

    const persone = PersonModel.createPerson(req.body.name)

    dbModule.storeElement(persone)

    //Omdirigera klienten till huvudsidan
    res.redirect('/')
})

//Sätt igång servern så att den kan ta emot requests på vald port.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))