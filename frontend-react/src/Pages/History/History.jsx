import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { DataGrid } from "@mui/x-data-grid";
import UseLoadMyPaymentHistory from "../../Hooks/useLoadMyPaymentHistory";

const History = () => {
  let [payments, paymentsPending] = UseLoadMyPaymentHistory();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const handleOpenModal = (cartItems) => {
    setSelectedCartItems(JSON.parse(cartItems)); 
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCartItems([]);
  };

  const columns = [
    { field: "index", headerName: "Index", width: 80 },
    { field: "id", headerName: "ID", width: 80 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "price", headerName: "Price", width: 250 },
    { field: "transactionId", headerName: "Transaction Id", width: 150 },
    { field: "created_at", headerName: "Created_at", width: 280 },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenModal(params.row.cartItems)}
        >
          View
        </Button>
      ),
    },
  ];

  const rows = payments?.map((pay, index) => ({
    ...pay,
    index: index + 1,
  }));

  return (
    <div className="w-full md:w-10/12 mx-auto md:pl-10">
      <SectionTitle title={"My Payments Info"} subtitle={"need details?"} />
      {paymentsPending ? (
        <div className="text-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="my-10 w-full mx-auto px-2 md:px-10 max-w-[425px] md:max-w-full overflow-auto max-h-screen ">
          <Box sx={{ height: 650, width: "100%" }}>
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
      )}

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Items
          </Typography>
          {selectedCartItems.map((item, index) => (
            <Typography key={index}>
              Product ID: {item.productId}, Quantity: {item.quantity}
            </Typography>
          ))}
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default History;
