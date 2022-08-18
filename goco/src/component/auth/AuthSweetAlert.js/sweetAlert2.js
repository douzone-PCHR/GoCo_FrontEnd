import Swal from 'sweetalert2';

export const sweetAlert2 = (text, icon) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
  });
};
export const sweetAlertSuccess = (text, icon, url) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = url;
    }
  });
};
