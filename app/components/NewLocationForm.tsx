"use client"
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react'

const NewLocationForm = () => {

    const [address, setAddress] = useState<string>();
    const [lat, setLat] = useState<number | null>();
    const [lon, setLon] = useState<number | null>();
    const [notes, setNotes] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <InputText placeholder='Service Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            <InputNumber placeholder='Latitude (Optional)' value={lat} onValueChange={(e: InputNumberValueChangeEvent) => setLat(e.value)} />
            <InputNumber placeholder='Longitude (Optional)' value={lon} onValueChange={(e) => setLon(e.value)} />
            <InputTextarea placeholder='Notes (Optional)' value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button className='mt-2' type='submit' label="Add Location" />
        </form>
    )
}

export default NewLocationForm