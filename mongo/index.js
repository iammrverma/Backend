const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);
User.find({ name: 'rohit' })
    .then(res => console.log(res))
    .catch(err => console.log(err));
// User.insertMany([
//     { name: 'rakesh', email: 'afa@adf.com', age: 12 },
//     { name: 'rohit', email: 'afa@adf.com', age: 12 },
//     { name: 'rohan', email: 'afa@adf.com', age: 12 }
// ])
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// const user2 = new User({
//     name: "raj",
//     email: "adf@af.com",
//     age: 40
// });

// user2.save()
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });

main()
    .then(res => {
        console.log("connection successfull");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}