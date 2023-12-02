/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Swal from "sweetalert2";

const AlertMessage = ({ title }) => {
  useEffect(() => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  }, [title]);

  return null; 
};

export default AlertMessage;
