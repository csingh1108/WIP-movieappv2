import { errorimage} from "../Assets/index.js";



const Error = () => {
    return (
        <>
            <div className="mt-24 text-center">
                <h1 className="font-montserrat font-bold text-[48px] text-white">Uh oh!</h1>
                <p className="font-montserrat font-bold text-[32px] text-white">Something went wrong!</p>
                <img src={errorimage} alt="cat disappoint" className="w-[400px] mx-auto mt-12 rounded-[10px]"/>
            </div>
        </>
    );
};

export default Error;