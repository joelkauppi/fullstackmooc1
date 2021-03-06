const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const URL = process.env.MONGODB_URL
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then (
    res => {
      console.log(`added ${res.name} phone ${res.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  Person.find({}).then( res => {
    console.log('Phonebook:')
    res.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

