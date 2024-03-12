import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import BinSizeForm from '@/app/components/BinSizeForm';
import NewBinForm from '@/app/components/NewBinForm';
import NewCustomerForm from '@/app/components/NewCustomerForm';
import NewLocationForm from '@/app/components/NewLocationForm';
import { Card } from 'primereact/card';

const page = () => {
  return (
    <div className="card">
      <Card className='mt-2 w-4'>
      <Accordion activeIndex={null}>
        <AccordionTab header="New Bin Size">
          <BinSizeForm />
        </AccordionTab>
        <AccordionTab header="New Bin">
          <NewBinForm />
        </AccordionTab>
        <AccordionTab header="New Customer">
          <NewCustomerForm />
        </AccordionTab>
        <AccordionTab header="New Location">
          <NewLocationForm />
        </AccordionTab>
      </Accordion>
      </Card>
    </div>
  )
}

export default page