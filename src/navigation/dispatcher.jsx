import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dispatcher({children}) {
    console.log('in the load balancer');
    let navigate = useNavigate()

    useEffect(() => {

        if (!localStorage.getItem("userToken")) {
            navigate('/login');
        }

        // const redirect = () => {
        //     if (location.pathname.slice(0, 5) === '/back' && localStorage.getItem('isStaff') === 'false') {
        //         navigate('/not-granted')
        //     }
        //     else if (location.pathname.slice(0, 5) !== '/back' && localStorage.getItem('isStaff') === 'true') {
        //         navigate('/not-granted')
        //     }
        // }
        console.log('goin.......');
        if(window.location.pathname === '/kiri'){
            window.location.replace("/paymentsession=cs_test_b1H4dliEc1sVd4yI1nIkupbVUe7krBbNeuiXbj4cWtgYINtP37dLFBtRMP")
        }

        const garde = () => {
            if (localStorage.getItem("userToken") && window.location.pathname === '/') {
                if (localStorage.getItem('isAble') === 'true') {
                    localStorage.getItem('isStaff') === 'false' ? navigate('/dashboard') : navigate('/back-office/report')
                } else {
                    localStorage.getItem('isStaff') === 'false' ? navigate('/update-profile') : navigate('/back-office/update-profile')
                }
            }
        }
        
        garde()
    }, [])

    return (
        <>
            {children}
        </>
    )

}