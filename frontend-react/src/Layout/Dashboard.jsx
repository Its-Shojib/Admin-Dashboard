import { NavLink, Outlet } from 'react-router-dom';
import { FaGifts, FaHome, FaUsers } from 'react-icons/fa';
import { VscThreeBars } from "react-icons/vsc";
import useAdmin from '../Hooks/useAdmin';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {

    const [isAdmin] = useAdmin()
    console.log(isAdmin);

    let systemAdmin = <>
        <li >
            <NavLink className='flex items-center font-bold gap-2'
                to='admin-home' >
                <FaHome></FaHome>Admin Home</NavLink>
        </li>
        <li >
            <NavLink className='flex items-center font-bold gap-2'
                to='add-product' >
                <FaGifts></FaGifts>Add Product</NavLink>
        </li>

        <li >
            <NavLink className='flex items-center font-bold gap-2'
                to='manage-users' >
                <FaUsers></FaUsers>Manage User</NavLink>
        </li>

    </>

    return (
        <div className='max-w-screen-2xl mx-auto min-h-screen sm:px-4 md:px-0 bg-base-300'>
            <Navbar />
            <div className="max-w-full mx-auto flex">

                {/* This is for Small device */}
                <div className="drawer md:hidden fixed z-[999]">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label
                            htmlFor="my-drawer"
                            className="btn bg-gray-400 text-black rounded-full drawer-button">
                            <VscThreeBars className='text-xl' /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content flex flex-col mt-5 px-6 space-y-3">
                            {
                                isAdmin && <>
                                    {systemAdmin}
                                </>

                            }
                        </ul>
                    </div>
                </div>

                {/* This is for Medium and Large device */}
                <div className="hidden md:inline-block w-64 min-h-screen bg-[#14354d] text-white sticky top-0">
                    <div className='text-center my-5'>
                        <h1 className='text-3xl font-bold'>MiniBazaar</h1>
                        <p className='text-xl'>E-Commerce</p>
                    </div>
                    {
                        isAdmin && <>
                            <ul className='menu flex flex-col mt-5 px-6 space-y-3'>
                                {systemAdmin}
                            </ul>
                        </>
                    }

                </div>
                <div className="flex-1 bg-base-300">
                    <Outlet></Outlet>
                </div>

            </div>
            <Footer />
        </div>
    )
}
export default Dashboard;