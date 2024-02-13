import { redirect } from "react-router-dom"

export const redirectToPublic=() => {
    const user =  localStorage.getItem('userLaPopular')
    if(!user){
      console.log(user)
      return redirect('/login')
    }
    return null;
  }