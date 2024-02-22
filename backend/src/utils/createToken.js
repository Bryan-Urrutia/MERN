import jwt from 'jsonwebtoken';

const createtoken = (email, id) =>{
    let token;

    const payload = {
        email: email,
        id: id
    }

    return token = "Bearer " +jwt.sign(payload, "Random", { expiresIn: "1d" })
}

export default createtoken