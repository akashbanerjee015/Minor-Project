"use client"

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    useEffect(() => {
        user && createNewUser();
    }, [user]);

    const createNewUser = async () => {
        try {
            const result = await axios.post('/api/user');
            // optionally use result.data if needed
            console.debug('/api/user response', result?.data);
        } catch (err) {
            console.error('createNewUser error', err);
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}



export default Provider

