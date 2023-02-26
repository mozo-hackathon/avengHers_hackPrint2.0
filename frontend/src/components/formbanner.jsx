function FormsBanner(props) {
    return (
        <div className="flex mx-20 my-10 shadow-md bg-blue-300 rounded-lg">
            <div className="flex">
            <h1 className="justify-content ml-10 text-center my-5 text-2xl md:text-3xl font-poppins">{props.eventName}</h1>
            </div>
        </div>
    );
}

export default FormsBanner;
