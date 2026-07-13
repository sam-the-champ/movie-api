import { prisma } from "../config/db.js";
import bcrypt from "bcrypt"; //importing the bcryptjs package to hash the password before saving it to the database

const register = async (req, res) => {
    const { name, email, password } = req.body;

    //check if user already exist
    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });

    if (userExists) {
        return res.status(400).json({ error: "user with this email already exist" });
    }
    //hash password using bcrypt.js
    const salt = await bcrypt.gensalt(10);

    const hashedPassword = await bcrypt .hash(password, salt);


    //create user

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });
    
    res.status(201).json({     // response after succesful registeration
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            }
        }
    })

};

const login = async (req, res) => {
    const { emial, password } = req.body;

    //check if user email exist in table

    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    
    if (!user) {
        return res.status(400).json({ error: "invalid email or password" });
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: "invalid email or password" });
    }

    //generate jwt

    res.status(201).json({     // response after succesful login
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            }
        }
    })

};


export { register, login }


//the way you send data from your client to your server is through the req variable. so inside the req when i say req.anymethodnow
//it actually allows us to access abunch of things about the request, such as the headers, the parameters, and anything else,
//then there is the one thing also which is the body. and the body of a req is kind of like a json that can be sent from the 
//frontend to the backend containing data that you want to use in the backend.