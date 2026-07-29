import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const payLoad = { id: userId };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '7h' });


res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
    sameSite: "strict", // Adjust based on your requirements. this will stop the brower from sending 
    // the cookie along with cross-site requests. this is a security measure to prevent CSRF attacks
    maxAge: 7 * 60 * 60 * 1000, // 7 hours in milliseconds
});

    return token;

}

//this will generate a jwt token and we are going to store a part of the user in that token and that part of the user
//is what we are going to be using to identify the user when they make requests to our api.
// so we are going to store the user id in the token
//then it is going to sign this jwt with our server's secret key and then we are going to set an expiration time
// for the token so that it is not valid forever
//to create the token and sign in with our secret we have to do the following
//first, pass the user if as the parameter to the function and then in the functionwe create a payload object that contains
// the user id and then we use the jwt.sign method to sign the payload with our secret key
// and then we set an expiration time for the token
//and nnow we want to make sure that we save the jwt in the http only  cookie. i have created the cookie named it token but let's
//name it jwt and then set the value to be the token that we generated
