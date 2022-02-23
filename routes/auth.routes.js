const {Router} = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    "/register",
    [
        check("email", 'Incorrect email')
            .isEmail(),
        check("username", 'Min length of username is 3')
            .isLength({min: 3}),
        check("password", "Min length of password is 6")
            .isLength({min: 6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) return response.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data'
            })

            const {email, username, password} = request.body
            const candidate = await User.findOne({email: email})
            const candidate1 = await User.findOne({username: username})

            if (candidate) {
                return response.status(400).json({message: "That email already registered "})
            }

            if (candidate1) {
                return response.status(400).json({message: "That username already registered "})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, username, password: hashedPassword})

            await user.save()

            response.status(201).json({message: "User created"})

        } catch (e) {
            response.status(500).json({message: "Something went wrong, try again"})
        }
    })

// /api/auth/login
router.post(
    "/login",
    [
        check("username", 'Write correct username')
            .exists(),
        check("password", "Write password")
            .exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) return response.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data'
            })

            const {username, password} = request.body
            const user = await User.findOne({username: username})

            if (!user) {
                return response.status(400).json({message: "That user not exists "})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            console.log(password, user.password)
            if (!isMatch) {
                return response.status(400).json({message: "incorrect password"})
            }

            const token = jwt.sign(
                {userID: user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )

            response.json({token, userId: user.id})

        } catch (e) {
            response.status(500).json({message: "Something went wrong, try again"})
        }
    })


module.exports = router