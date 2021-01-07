import React,{useState} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber } from 'react-phone-number-input'
import {ArrowRightOutlined} from '@ant-design/icons';

const Phone = ()=>{
    const [value, setValue] = useState()
    const [contact, setNuber] = useState()

    const onSetPhone = async()=>{
        if (value.length > 1) {
            const setNum= await fetch('https://still-cover-backend.uc.r.appspot.com/Patch/phone',{
                method:'PATCH',
                headers:{'Content-Type':'application/json',token:localStorage.token},
                body:JSON.stringify({
                    phone:value
                })
            })
            const response = await setNum.json()
            if(response.update){
                setNuber(response.update+" "+'sucess.')
            }           
        }
    }
    return (
        <>
            <div class="webflow-style-input flex">
                <PhoneInput
                    international
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                    {
                    isValidPhoneNumber(value) ?
                        <button onClick={onSetPhone}><ArrowRightOutlined /></button>
                        :null
                    }
                <span className="db f6 gray"> {contact}</span>
            </div>
        </>
    )
}
export default Phone