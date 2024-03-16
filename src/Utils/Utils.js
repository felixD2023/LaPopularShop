import { redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearAlert } from "../Redux/AlertSlice"

export const redirectToPublic = () => {
  const user = localStorage.getItem('userLaPopular')
  if (!user) {
    console.log(user)
    return redirect('/login')
  }
  return null;
}

export const redirectToPrivate = () => {
  const user = JSON.parse(localStorage.getItem('userLaPopular'))
  if (!user) {
    return null;
  } else if (user.role == "admin") {
    return redirect('/admin')
  } else {
    return redirect('/customer')
  }

}

export const getUserLoggedIn = () => {
  return JSON.parse(localStorage.getItem("userLaPopular"))
}


export const numberList = [1,2,3,4,5,6,7,8,9,10]