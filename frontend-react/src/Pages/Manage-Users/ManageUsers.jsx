import SectionTitle from "../../components/SectionTitle";
import UseLoadUsers from "../../Hooks/useLoadUsers";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const ManageUsers = () => {
    const [users, userPending] = UseLoadUsers();

    {
        users?.map((user, index) => {
            return {
                index: index + 1,
                id: user?.id,
                name: user?.name,
                email: user?.email,
                user_role: user?.user_role,
                created_at: user?.created_at,
            }
        })
    }

    const columns = [
        {
            field: 'index',
            headerName: 'Index',
            width: 70
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'name',
            headerName: 'User Name',
            width: 220,
            editable: false,
            sortable: true,
        },
        {
            field: 'email',
            headerName: 'User Email',
            width: 220,
            editable: false,
            sortable: true,
        },
        {
            field: 'created_at',
            headerName: 'Created_at',
            width: 250,
            editable: false,
            sortable: true,
        },

        {
            field: 'user_role',
            headerName: 'User Role',
            width: 90,
            editable: false,
            sortable: true,
        },
    ];

    const rows = users?.map((user, index) => ({
        ...user, index: index + 1
    }));


    return (
        <div className='w-full md:w-11/12 mx-auto'>

            <SectionTitle title={"All Users Info"} subtitle={"need details?"} />
            {
                userPending ? <>
                    <div className="text-center h-screen">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </> : <>
                    <div className='my-10 w-full mx-auto px-2 md:px-10 max-w-[425px] md:max-w-full overflow-auto max-h-screen'>

                        <div className="w-full mx-auto max-w-[422px] md:max-w-full overflow-x-auto">
                            <Box
                                sx={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 15, 20]}
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </div>
                    </div>


                </>
            }
        </div>
    );
};

export default ManageUsers;