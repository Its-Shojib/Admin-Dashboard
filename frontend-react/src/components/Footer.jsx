import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import img from '../../public/logo.png'

const Footer = () => {

    return (
        <div className=''>
            <footer className="footer px-10 py-2 bg-[#14354d] text-white">
                <aside className="items-center grid-flow-col">
                    <img className='w-16 h-16' src={img} alt="" />
                    <p>MiniBazaar Ltd. <br />Providing reliable Service since {new Date().getFullYear()}</p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebook className='text-2xl cursor-pointer' />
                        <FaGithub className='text-2xl cursor-pointer' />
                        <FaLinkedin className='text-2xl cursor-pointer' />
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;