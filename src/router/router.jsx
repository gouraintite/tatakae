import React from 'react';
import { Routes, Route } from "react-router-dom";


// Common path
import Home from '../modules/home/home';
import Login from '../modules/auth/login/login'
import Register from '../modules/auth/Register/reg';
// import NotFound from './pages/notFound/NotFound';

const Router = () => {

	return(
		<>
			
					<Routes>
						
						<Route path="/" >

								<Route index element={<Home />} />

								<Route  path="login" element={<Login />} />
								<Route  path="register" element={<Register />} />

							{/* <Route  path="*" element={ <NotFound /> } /> */}

						</Route>
					</Routes>

		</>
	)
}

export default Router;