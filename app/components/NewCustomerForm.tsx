"use client"
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Nullable } from 'primereact/ts-helpers';
import React, { useEffect, useState } from 'react'

interface binSize {
    id: String,
    size: String,
    charge: Number,
}

interface sizeDropDown {
    size: String | null,
    id: number
}

interface statusDropDown {
    status: String
}


const NewCustomerForm = () => {

    const [size, setSize] = useState<string | null>(null);
    const [sizes, setSizes] = useState<sizeDropDown[]>();
    const [status, setStatus] = useState<statusDropDown>();

    const statuses: statusDropDown[] = [
        { status: 'active' },
        { status: 'inactive' }
    ]

    useEffect(() => {
        const getSizes = async () => {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/getSizes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`)
                }
                else {
                    const binResponse = await res.json();
                    let binSizes: sizeDropDown[] = [];
                    binResponse.map((data: any, idx: number) => {
                        binSizes.push({ size: data.size, id: idx });
                    })
                    setSizes(binSizes);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSizes();
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(status);
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <Dropdown className='flex mb-2' value={size} onChange={(e: DropdownChangeEvent) => setSize(e.value)}
                options={sizes} optionLabel="size" placeholder="Size" />
            <Button className='mt-2' type='submit' label="Add Bin" />
        </form>
    )
}

export default NewCustomerForm