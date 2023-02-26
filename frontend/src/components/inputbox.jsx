
function InputBox({ label, name, type, value, placeholder, inputRef, onChange, classNames, required, error,disabled }) {
    return (
        <div className='input-box w-full mb-3 relative'>
            <label htmlFor={label.toLowerCase().replace(/ /g, "_")} className='input-label font-medium mb-3 text-black text-lg'>{label}<span className="req-text"> *</span></label>
            <input
                value={value}
                type={type}
                label={label.toLowerCase().replace(/ /g, "_")}
                name={name}
                placeholder={placeholder}
                ref={inputRef}
                onChange={onChange}
                className={`input w-full h-14 bg-gray100 font-gilroy text-gold text-lg px-3 outline-0 border-1 border-transparent rounded-xl hover:border-light_blue focus:border-transparent focus:ring-1 focus:ring-light_blue focus:bg-faint_blue/20 ${classNames}`}
                autoComplete='off'
                required={required}
                disabled={disabled}
            />
            {error && <span className='text-red-500 bg-black px-2 py-1 rounded-lg absolute right-3 mt-10'>{error}</span>}
        </div>
    );
}

export default InputBox;