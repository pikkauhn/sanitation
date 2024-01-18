'use client'
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import OTPInput from 'react-otp-input';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function OtpEntry() {
    const [otp, setOtp] = useState('');

    return (
        <div className='relative flex w-full justify-content-center'>
            <Card className='flex mt-8 justify-content-center text-center' title="Input OTP">
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={{ width: '2rem' }}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <InputText {...props} />}
                />
                <Button className='mt-4' type="submit" label="Submit" />
            </Card>
        </div>
    )
}