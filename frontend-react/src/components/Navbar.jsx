import { Link, NavLink } from "react-router"
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useLogout from "../Hooks/useLogout";
import useCarts from "../Hooks/useCarts";

const Navbar = () => {
    let { user } = useAuth();
    let [isAdmin] = useAdmin();
    let { logout } = useLogout();
    let [carts] = useCarts();


    let totalPrice = carts.reduce((total, item) => {
        return parseInt(total) + parseInt(item.product.price);
    }, 0);


    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/products'}>Products</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        <li><NavLink to={'/contact'}>Contact</NavLink></li>

    </>
    return (
        <div className="navbar z-10 bg-[#14354d] w-full text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className="w-10 h-10 rounded-full" src="../../public/logo.png" alt="logo" />
                <button className="text-white md:text-2xl"><span className="text-rose-900">Mini</span>Bazaar</button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">{carts?.length}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold text-black">{carts?.length} Items</span>
                                    <span className="text-info">Subtotal: ${totalPrice}</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                {
                                    isAdmin && <li><Link to={'/dashboard/admin-home'}>Dashboard</Link></li>
                                }
                                <li><button onClick={() => logout()}>Logout</button></li>
                            </ul>
                        </div>
                    </div> : <Link to={'/login'} className="bg-teal-950 text-white rounded-lg p-2">Login Now</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;