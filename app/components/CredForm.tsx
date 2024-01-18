"use client"
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface Roles {
    name: string;    
}

const CredForm = () => {
    const router = useRouter();


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<Roles | null>(null);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const roles: Roles[] = [
        { name: 'Admin' },
        { name: 'Coord' },
        { name: 'Collector' },        
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            alert('Passwords must match!')
        }
        else {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        role: role,
                        password: password,
                    }),
                });
                if (res) {
                    router.replace('/OTPEntry');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <InputText className='flex mb-2' id='name' placeholder='First Name' value={name} onChange={(e) => setName(e.target.value)} />
            <InputText className='flex mb-2' type='email' id='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Dropdown value={role} onChange={(e: DropdownChangeEvent) => setRole(e.value)} options={roles} optionLabel="name" placeholder="Select Role" />
            <InputText className='flex mb-2'
                id='password' type='password' placeholder='Create Password' value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputText className='flex mb-2'
                id='password' type='password' placeholder='Re-Enter Password' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className='mt-2' type="submit" label="Submit" />
        </form>
    )
}

export default CredForm