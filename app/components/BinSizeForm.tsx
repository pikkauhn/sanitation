"use client"
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Nullable } from 'primereact/ts-helpers';
import React, { useState } from 'react'

const BinSizeForm = () => {
    const router = useRouter();
    const [size, setSize] = useState<string>('');
    const [charge, setCharge] = useState<Nullable <number | null>>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/newSize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                        
                },
                body: JSON.stringify({
                    size,
                    charge
                }),
            })
            if (res.ok) {
                
            } else {
                console.log('Error Creating New Bin Size')
            }                
        } catch (error) {
            console.log('Error Connecting to Database')
        }
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <InputText className='flex mb-2' id='size' placeholder='Bin Size' value={size} onChange={(e) => setSize(e.target.value)} />
            <InputNumber inputId="currency-us" placeholder='Daily Charge' value={charge} onValueChange={(e: InputNumberValueChangeEvent) => setCharge(e.value)} mode="currency" currency="USD" locale="en-US" />
            <Button className='mt-2' type="submit" label="Add Size" />
        </form>
    )
}

export default BinSizeForm