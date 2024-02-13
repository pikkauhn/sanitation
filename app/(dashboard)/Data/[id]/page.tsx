'use client'
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';

interface Params {
    id: number;
}

interface Bin {
    history: History[],
    id: string,
    last_emptied_at: Date,
    location: Location,
    size: Size,
    status: string,
}

interface History {
    id: string,
    startDate: Date,
    endDate: Date,
}


interface Location {
    id: string,
    address: string,
    latitude: number,
    longitude: number,
    notes: string,
    billable: number,
    days: number,
}

interface Size {
    id: string,
    size: string,
    charge: number,
}


export default function page({ params }: {
    params: Params,
}) {
    const binId = params.id;
    const [bin, setBin] = useState<Bin>();

    useEffect(() => {
        const getBin = async () => {
            const binResult = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/getBin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: binId
                })
            }).then(async (response) => {
                if (!response.ok) {
                    console.error(`Failed to fetch data. Status: ${response.status}`);
                }
                else {
                    const binResponse = await response.json();
                    console.log(binResponse);
                    setBin(binResponse);
                }
            });
        }
        getBin();
    }, []);



    return (
        <div>
            <div className='card w-5'>
                <Card title={bin?.status}></Card>
            </div>
        </div>
    )
}