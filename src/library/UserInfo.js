import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;


const UserInfo = async (token) => {
    if (token){
        let _userinfo = false;
        await axios.get(`${URL}/user`,{
            headers: {
            Authorization:`Bearer ${token}`}})
        .then(users => {
            // console.log(users.data);
            _userinfo = users.data;
        }).catch(e => {
                console.log(e);
            })
        return _userinfo

    }else return undefined
}

export default UserInfo;