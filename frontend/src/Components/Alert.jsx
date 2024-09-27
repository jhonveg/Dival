import { toast } from 'react-toastify'

// export default function Alert({ icon, title, timer = 2000, background = "#02141a" }) {

//     Swal.fire({

//         icon: icon,
//         title: title,
//         background: background,
//         showConfirmButton: false,
//         allowOutsideClick: true,
//         allowEscapeKey: true,
//         timer: timer,
//         didDestroy: true,
//         heightAuto: true


//     })

// }



export const AlertError = ({ title, timer = '3000', position = 'top-center' }) => {
    toast.dismiss();
    toast.error(`${title}`, {
        position: position,
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertSuccess = ({ title, timer = '3000', position = 'top-center' }) => {
    toast.dismiss();
    toast.success(`${title}`, {
    position: position,
        autoClose: timer,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertInfo = ({ title, timer = '2000' }) => {
    toast.dismiss();
    toast.info(`${title}`, {
        position: "top-center",
        autoClose: timer,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const AlertWarning = ({ title, timer = '2000' }) => {
    toast.dismiss();
    toast.warning(`${title}`, {
        position: "top-center",
        autoClose: timer,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

