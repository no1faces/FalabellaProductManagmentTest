import React from 'react'

interface InputTextProps {
    label: string;
    value: string;
    setValue: (e: string) => string | void
}

const InputText: React.FC<InputTextProps> = ({ label, value, setValue }) => {
  return (
    <div className="form-control w-full ">
        <label className="label">
            <span className="label-text font-bold">{label}</span>
        </label>
        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
        />
    </div>
  )
}

export default InputText