"use client"
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Nullable } from 'primereact/ts-helpers';
import React, { useState } from 'react'

const BinSizeForm = () => {

    const [size, setSize] = useState<string>('');
    const [charge, setCharge] = useState<Nullable <number | null>>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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