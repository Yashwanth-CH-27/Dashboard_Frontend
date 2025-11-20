import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Redux/userSlice.js";


const Layout = () => {
  const userData = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userValidation = async () => {
    try {
      if(userData) return;
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data))
    } catch (err) {
      if(err.response.status == 401){
        dispatch(removeUser())
        navigate("/login")
      }
      console.log(err);
    }
  };
  useEffect( () => {
    userValidation()
  }, [] )
  return (
    <div>
        <Header/>
        <div>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout