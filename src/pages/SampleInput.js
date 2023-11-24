import React, { useState } from 'react';

function SampleInput() {
    const [name, setName] = useState('');
     const [value,setValue]=useState('');
    function handleChange(e) {
        e.preventDefault();
        //  setName(e.target.value);
            setName( e.target.value);
    };
    return (
        <div>
            <div>
                <label>{name}</label>
                <input
                   name="name"
                    type='text'
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <div>Name is: {name}</div>
        </div>

    );
}
export default SampleInput;