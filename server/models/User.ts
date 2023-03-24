import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  id: {
    type: String
  }
})

const User = mongoose.model('User', userShema)

export { User }