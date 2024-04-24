import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import   {deleteTodo} from "../../../redux/todoSlice";
const CustomAlert = ({ id }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
     dispatch(deleteTodo(id))
       .then(() => {
         handleClose();
         navigate("/todos");
       })
       .catch((error) => {
         console.error("Error deleting todo:", error);
         handleClose();
       });
  };

  const handleNo = () => {
    handleClose();
    navigate("/todos");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        Are you sure you want to delete this todo
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomAlert.propTypes = {
  id: PropTypes.string.isRequired
}

export default CustomAlert;