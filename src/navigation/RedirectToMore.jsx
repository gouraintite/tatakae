import { Navigate } from "react-router-dom";

const RedirectToMore = ({ redirectPath = "/last-step", children }) => {
  
  if (!localStorage.getItem("reviewed")) {
    localStorage.setItem('reviewed', '1');
  }

    while (Number(localStorage.getItem('reviewed') <= 5)) {
      localStorage.setItem('reviewed', Number(localStorage.getItem('reviewed') + 1));
      return children
    }
    return <Navigate to={redirectPath} replace />;
};

export default RedirectToMore;
