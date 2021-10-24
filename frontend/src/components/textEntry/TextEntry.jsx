import React from 'react'

const TextEntry = (label, tipo) => {
    return (
        <div className="d-flex justify-content-around">
            <div>
                <p className="p-0">{label}</p>
            </div>
            <div classname="p-0">
                <input className="entryText" type={tipo} placeholder={label} />
            </div>
        </div>
    )
}

export default TextEntry
