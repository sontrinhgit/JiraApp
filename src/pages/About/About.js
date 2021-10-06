import React, { useState } from 'react'

export default function About() {
    const [input,setInput] = useState('');

    const [form,setForm] = useState({
        name: '',
        age: 0,
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        console.log(id,value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
    
    }

    return (
        <div>
            <form action = '' onSubmit = {handleSubmit} onChange={handleChange}>
                <input type="text" id="name" />
                <input type="text" id="age"/>
                 <input type="text" id="email"/>
                  <input type="text" id="password"/>
               
                <button type="submit"> </button>
            </form>
        </div>
    )
}
 