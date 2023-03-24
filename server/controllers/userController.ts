import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import config from 'config'

import { User } from '../models/User'
import { Request, Response } from 'express'

const signinController = async (req: Request, res: Response) => {
  if(req.body.googleAccessToken){
    //  Google OAuth
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${req.body.googleAccessToken}`
      }
    }).then(async response => {
      const email = response.data.email;

      const alreadyExistUser = await User.findOne({ email })

      if (!alreadyExistUser) {
        return res.status(400).json({ message: 'User does not exist' })
      }

      const token = jwt.sign({
        email: alreadyExistUser.email,
        id: alreadyExistUser._id
      }, config.get('JWT_SECRET'), {expiresIn: "4h"})

      res.status(200).json({result: alreadyExistUser, token})
    })
  }else{
    // Normal Login
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    try {
      const alreadyExistUser = await User.findOne({ email })

      if (!alreadyExistUser) {
        return res.status(400).json({ message: 'User does not exist' })
      }

      const isPasswordValid = await bcrypt.compare(password, alreadyExistUser.password!);

      if(!isPasswordValid) {
        return res.status(400).json({message: "Invalid password"})
      }

      const token = jwt.sign({
        email: alreadyExistUser.email,
        id: alreadyExistUser._id
      }, config.get('JWT_SECRET'), {expiresIn: "4h"})

      res.status(200).json({result: alreadyExistUser, token})
    } catch (err) {
      
    }
  }
}

const signupController = async (req: Request, res: Response) => {
  if (req.body.googleAccessToken) {
    // Google OAuth
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${req.body.googleAccessToken}`
      }
    }).then(async response => {
      const name = response.data.given_name + ' ' + response.data.family_name;
      const email = response.data.email;
      const picture = response.data.picture;

      const alreadyExistUser = await User.findOne({ email })

      if (alreadyExistUser) {
        return res.status(400).json({ message: 'User already exists' })
      }
      const result = await User.create({ name, email, avatar: picture })

      const token = jwt.sign({
        email: result.email,
        id: result._id
      }, config.get('JWT_SECRET'), { expiresIn: '4h' })
      res.status(200).json({result, token})
    }).catch(err =>{
      res.status(400).json({message: "Invalid info!"})
    })
  }else{
    // normal form data
    const {name, email, confirmPassword, password} = req.body;
    try {
      if(!email || !name || !confirmPassword || !password || password.length <= 8){
        res.status(400).json({message: "Invalid field!"})
      }
      const alreadyExistUser = await User.findOne({ email })

      if (alreadyExistUser) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const hashPassword = await bcrypt.hash(password, 12)

      const result = await User.create({ name, email, password: hashPassword })

      const token = jwt.sign({
        email: result.email,
        id: result._id
      }, config.get('JWT_SECRET'), { expiresIn: '4h' })
      res.status(200).json({ result, token })
    } catch (err) {
      console.log(err)
    }
  }
}

export {
  signinController,
  signupController
}