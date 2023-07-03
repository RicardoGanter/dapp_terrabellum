"use client"
import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github'
 
import Google from 'next-auth/providers/google'

export default NextAuth({
    providers : [
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
         clientId: "23310389581-d3r95rdiup65onjk72d0ru7cv47rgjve.apps.googleusercontent.com",
         clientSecret: "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",
     })
    ]
})