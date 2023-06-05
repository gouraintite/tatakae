import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);

  if(location.pathname.slice(0, 5)==='/back' && localStorage.getItem('isStaff')==='false'){
    navigate('/not-granted')
  }
  else if(location.pathname.slice(0, 5)!=='/back' && localStorage.getItem('isStaff')==='true'){
    navigate('/not-granted')
  }
  if (!localStorage.getItem("userToken")) {
    navigate('/login');
  }

  useEffect(()=>{
    garde() 
  }, [])

  const garde = () =>{
    if (localStorage.getItem("userToken") && window.location.pathname === '/') {
      localStorage.getItem('isStaff') === 'false' ? navigate('/dashboard') : navigate('/back-office/report')
    }
  }
  
  if (count < 2) {
    setTimeout(() => {
      setCount(count + 1)
    }, 10000);
  }
  return children;
};

export default ProtectedRoute;
