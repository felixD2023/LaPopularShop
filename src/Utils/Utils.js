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

export const onlyNumbers=(string)=>{
  for(let i=0;i<string.length;i++){
    if(!string.charAt(i)==='0' && !Number(string.charAt(i))) { return false; }
  }
  return true
}

export const isLastCharANumber=(string)=>{
  return (string.charAt(string.length-1)==='0' || !!Number(string.charAt(string.length-1)))
}

export const isLastCharASpace=(string)=>{
  return (string.charAt(string.length-1)===' ')
}


export const numberList = [1,2,3,4,5,6,7,8,9,10]