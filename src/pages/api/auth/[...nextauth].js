"use client"
import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github'
 
import Google from 'next-auth/providers/google'

export default NextAuth({
    providers : [
    GitHub({
        clientId: "dc352a34360b51da2150",
        clientSecret: "760494c7e390daac75d045ab86089d431a156381",
    }),
    Google({
         clientId: "23310389581-d3r95rdiup65onjk72d0ru7cv47rgjve.apps.googleusercontent.com",
         clientSecret: "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"
     })
    ]
})