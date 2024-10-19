const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Admin:10977@nelson707.oszdhpg.mongodb.net/Task-Management').then(()=>console.log("DB Connected"))
}

module.exports = {connectDB}