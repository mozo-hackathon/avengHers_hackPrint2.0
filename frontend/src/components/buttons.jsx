
function Buttons({ value, onClick, classNames, disabled }) {
    onClick = onClick || function () { console.error('Error: No onClick event listener function passed to <Buttons /> , Expected <Buttons onClick={someFunction} />') };

    return (
        <button
            className={`p-4 bg-gray700 text-black font-semibold border border-transparent rounded-xl  transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-bluiy/10 ${classNames}`}
            onClick={(e) => onClick(e)}
            value={value}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default Buttons;