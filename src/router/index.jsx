import { useRoutes } from "react-router-dom";
import Dispatcher from "../navigation/dispatcher";
//import QuestionsReviews from '../modules/backOffice/reviews/page/reviews'

function Router() {
  const routes = [

    // BACK ROUTES..............
    
    {
      path: "/",
      element: <Dispatcher />
    },

    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    
  ];

  return useRoutes(routes);
}

export default Router;
