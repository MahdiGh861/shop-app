import { hashSync } from "bcryptjs";

export const userData = {
    users: [
        {
            name: 'mahdi',
            email: 'mahdi@gmail.com',
            password: hashSync('654321', 10),
            role: 'admin',
        },
        {
            name: 'ali',
            email: 'ali@gmail.com',
            password: hashSync('123456', 10),
            role: 'user',
        },
    ]
}