const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
});

const Person = mongoose.model('Person', personSchema);


exports.createPerson = (name) => {
    var person = new Person({
        name: name
    })

    return person
}

exports.getAllPeople = async() => {
    return await Person.find({})
}