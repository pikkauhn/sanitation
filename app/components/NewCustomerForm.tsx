"use client"
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const NewCustomerForm = () => {

    const [name, setName] = useState<string>();
    const [status, setStatus] = useState<boolean>(false);
    const [billable, setBillable] = useState<boolean>(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <InputText placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Checkbox inputId="active" checked={status} onChange={(e) => setStatus(!status)}/>
            <label htmlFor='active'>Active</label>
            <Checkbox inputId="billable" checked={billable} onChange={(e) => setBillable(!billable)}/>
            <label htmlFor='billable'>Billable</label>
            <Button className='mt-2' type='submit' label="Add Customer" />
        </form>
    )
}

export default NewCustomerForm