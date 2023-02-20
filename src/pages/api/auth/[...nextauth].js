import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github'
 
export default NextAuth({
    providers : [
    GitHub({
        clientId: "4096e1784875e6a35033",
        clientSecret: "0b7e25e8c1a556618ec2223669a236ae462d5baf",
    })
    ]
})