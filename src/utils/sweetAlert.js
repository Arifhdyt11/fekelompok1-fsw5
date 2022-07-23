import Swal from "sweetalert2";

export const handleHeaderSwal = (
  title,
  text,
  icon,
  cancelButton,
  confirmText
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: cancelButton,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
  });
};

export const handleSwal = (message, icon) => {
  return Swal.fire({
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
