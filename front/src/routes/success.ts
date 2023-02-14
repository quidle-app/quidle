import {AxiosResponse} from "axios";
import {toast} from "react-toastify";

export function success(res: AxiosResponse) {
    if (res.data.result != "success") {
        toast.error(res.data.message);
        return false;
    }
    return true;
}