'use client'

import { useSession } from "next-auth/react"

export default function AuthCheck({ children}: { children: React.ReactNode }) {
    const sessionData = useSession()

    if(sessionData.status === 'authenticated') {
        return <>{children}</>
    } else {
        return <></>
    }
}