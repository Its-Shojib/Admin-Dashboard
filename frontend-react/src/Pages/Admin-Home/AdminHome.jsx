import SectionTitle from "../../components/SectionTitle";
import useAdminStatus from "../../Hooks/useAdminStatus";
import { PieChart, Pie, Cell, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Rectangle, BarChart } from 'recharts';

const AdminHome = () => {
    let [status, statusPending] = useAdminStatus();
    console.log(status.products)

    let electronics = status?.products?.filter((product) => product.category === "electronics")
    let fashion = status?.products?.filter((product) => product.category === "fashion")
    let home_appliances = status?.products?.filter((product) => product.category === "home_appliances")
    let beauty = status?.products?.filter((product) => product.category === "beauty")
    let sports = status?.products?.filter((product) => product.category === "sports")

    const data = [
        { name: 'Electronics', value: electronics?.length },
        { name: 'Fashion', value: fashion?.length },
        { name: 'Home Appliances', value: home_appliances?.length },
        { name: 'Beauty', value: beauty?.length },
        { name: 'Sports', value: sports?.length },
    ];

    const COLORS = ['#2f1e37', '#7b6645', '#5a2636', '#253951', '#1e3931'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    const data2 = [
        {
            name: 'Revenew',
            Products: status?.products?.length,
            Orders: status?.paymentsCount + 1,
            amt: 2400,
        },
    ];

    return (
        <div>
            {
                statusPending ? (
                    <div> Loading...</div >
                ) : (
                    <>
                        <SectionTitle title={'All Status'} subtitle={'need info?'}></SectionTitle>
                        <div className="flex justify-center">
                            <div className="stats shadow ">
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-title">Total Products</div>
                                    <div className="stat-value text-secondary">{status?.productsCount}</div>
                                    <div className="stat-desc">21% more than last month</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stat-title">Total User</div>
                                    <div className="stat-value">{status.usersCount}</div>
                                    <div className="stat-desc text-secondary">31% increse since last month</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-title">Carts Items</div>
                                    <div className="stat-value">{status?.cartsCount}</div>
                                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-title">Payments Completed</div>
                                    <div className="stat-value">{status?.paymentsCount}</div>
                                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-title">Admin </div>
                                    <div className="stat-value">{status?.adminUsersCount}</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-title">General User</div>
                                    <div className="stat-value">{status.usersCount - status?.adminUsersCount}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex flex-col md:flex-row justify-center items-center mt-24 gap-10"> */}
                        <div>
                            <ResponsiveContainer width={"100%"} height={400}>
                                <PieChart
                                    width={400}
                                    height={400}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend></Legend>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>


                        {/* </div> */}
                        <div>
                            <ResponsiveContainer width={"100%"} height={400}>
                                <BarChart
                                    width={500}
                                    height={400}
                                    data={data2}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Orders" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                    <Bar dataKey="Products" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )
            }
        </div >
    );
};

export default AdminHome;