"use client"
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'

interface sizeDropDown {
    size: String | null,
    id: number
}

const NewBinForm = () => {

    const [size, setSize] = useState<string | null>(null);
    const [sizes, setSizes] = useState<sizeDropDown[]>();

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
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/newSize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                        
                },
                body: JSON.stringify({
                    size
                }),
            })
            if (res.ok) {
                
            } else {
                console.log('Error Creating New Bin')
            }                
        } catch (error) {
            console.log('Error Connecting to Database')
        }
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <Dropdown className='flex mb-2' value={size} onChange={(e: DropdownChangeEvent) => setSize(e.value)}
                options={sizes} optionLabel="size" placeholder="Size" />
            <Button className='mt-2' type='submit' label="Add Bin" />
        </form>
    )
}

export default NewBinForm