'use client'
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab, AccordionTabChangeEvent } from 'primereact/accordion';
import moment from 'moment';

import { binHistory } from '@prisma/client';
import OrderHistory from '@/app/components/OrderHistory';

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
    location: Location[],
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
    const [binHistory, setBinHistory] = useState<binHistory[]>();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
                    setBin(binResponse);
                    const orderedHistory = OrderHistory(binResponse.history);
                    setBinHistory(orderedHistory);
                }
            });
        }
        getBin();
    }, []);

    const onTabChange = (e: AccordionTabChangeEvent) => {
        const selectedIndex: number | null = e.index as number | null;
        setActiveIndex(selectedIndex)
      }


    return (
        <div className='flex justify-content-center mt-2'>
            {bin ?
            <Card className='mt-3 w-30rem text-center mr-5' title={bin?.status}>
                <Accordion activeIndex={activeIndex} onTabChange={(e: AccordionTabChangeEvent) => {onTabChange(e)}}>
                
                {binHistory?.map((data: any, idx: number) => (
                    <AccordionTab className="w-full" key={idx} header={data.location.address}>
                        Start Date: {moment(data.startDate).format('MMMM Do, YYYY')}
                        <br/>
                        End Date: {data.endDate ? moment(data.endDate).format('MMMM Do, YYYY') : 'Current Location'}
                        <br/>
                        Billed by: {data.location.billable ? 'Sanitation' : 'Searcy Water'}
                        <br/>
                        Daily Amount: {data.location.billable ? data.location.billable : 'Searcy Water'}
                        <br/>
                        Number of Days: {data.location.days}
                    </AccordionTab>
                ))}
                </Accordion>
            </Card>
            :  <Card className='mt-3 w-30rem text-center mr-5' title='No Bin Selected' />}
        </div>
    )
}