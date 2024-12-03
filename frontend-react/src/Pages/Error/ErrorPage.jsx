
import Lottie from 'lottie-react';
import animation from '../../assets/404.json'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className="max-h-screen">
            <div>
                <Lottie className="h-[450px] w-full" animationData={animation} loop={true} />

            </div>
            <div className='flex justify-center items-center mt-5'>
                <Link to={'/'} className="text-black text-2xl font-bold hover:text-green-800 text-center">Go Back Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;