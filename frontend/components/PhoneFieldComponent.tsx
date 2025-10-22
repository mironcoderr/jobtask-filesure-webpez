"use client"

import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function PhoneFieldComponent({value}: {value?: string}) {
    const [phone, setPhone] = useState('');

    return (
        <div>
            <PhoneInput
                defaultCountry="bd"
                value={value || phone}
                onChange={(phone) => setPhone(phone)}
                className='field-tel'
            />
        </div>
    );
};