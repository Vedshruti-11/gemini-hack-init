import axios from "axios"
import Cookies from "universal-cookie";

const URL = process.env.REACT_APP_BACKEND_URL;
//const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY;
//axios.defaults.withCredentials = true;

const token = new Cookies().get('token');
const InfoById = async (userId) => {
    if(userId){
        let _userinfo = null;
        await axios.get(`${URL}/user`,{
            headers: {
            Authorization:`Bearer ${token}`}})
        axios.get()
        .then(user => _userinfo = user.data)
        return _userinfo
    }else return undefined
}

export default InfoById