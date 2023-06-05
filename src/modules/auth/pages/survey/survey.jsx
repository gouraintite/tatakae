import { Formik, Field, Form, ErrorMessage } from 'formik';
import {validationSchema} from '../../components/validation';
import {Link} from 'react-router-dom'
import {
  Lucide,
  Alert,
  LoadingIcon,
} from "@/base-components";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/survey.svg";
import { useState, useEffect } from "react";
import { register_service } from '../../services/auth.service';
//Localization Test start...
import { useTranslation } from "react-i18next";
import '../../translation/i18n'
import { useNavigate } from 'react-router-dom';
function Main() {

    let navigate = useNavigate();
    let {t} = useTranslation();

    useEffect(() => {
        dom("body").removeClass("main").removeClass("error-page").addClass("login");
    }, []);


    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [hide, setHide] = useState ("password");
  

    useEffect(() => {
      setErrMsg(null) 
      setIsLoading('')
    }, []);  

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: true,
    };


      const handleSubmit = async (values) => {
        console.log(values, 'values here')
        setIsLoading(<LoadingIcon icon="tail-spin" className="w-6 h-6 ml-4" />)
        console.log('is loading before req', isLoading )
        console.log(values, 'values here')
        
        register_service({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password, 
        }) .then(response=>{
                navigate('/login')
                console.log(JSON.stringify(response?.data), "respo");
                console.log(response, 'response')
            })
            .catch(err=>{
                //console.log(err?.response?.data?.errors, "error content")
                setErrMsg('Oops, This email already exist! choose another one or log in')
            }).finally(
                setIsLoading('')
            )

            }
    return (
        <>
            <div>
                <DarkModeSwitcher />
                <div className="container sm:px-10">
                    <div className="block xl:grid grid-cols-2 gap-4">
                        {/* BEGIN: Register Info */}
                        <div className="hidden xl:flex flex-col min-h-screen">
                            <a href="/" className="-intro-x flex items-center pt-5">
                                <img
                                    alt="Wenlo"
                                    className="w-28 pt-6"
                                    src={logoUrl}
                                />
                                <span className="text-white text-lg ml-3"> {/*Tinker*/} </span>
                            </a>
                            <div className="my-auto">
                                <img
                                    alt="Wenlo"
                                    className="-intro-x w-9/12 -mt-16"
                                    src={illustrationUrl}
                                />
                                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                Answer to help us irmproving your experience when using Wenlo
                                </div>
                            </div>
                        </div>
                        {/* END: Register Info */}
                        {/* BEGIN: Register Form */}
                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-3/4 ">
                                {errMsg ? <Error content={errMsg} /> : null }
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Just a small last step
                                </h2>
                                <div className="intro-x mt-2 text-slate-400 dark:text-slate-500 xl:hidden text-center ">
                                     Answer to help us irmproving your experience when using Wenlo
                                </div>

                                {/* Start form */}
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) =>handleSubmit(values)}
                                >

                                {({  }) => (
                                    <Form >
                                        <div className="">
                                            <Field
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                className="intro-x login__input form-control py-3 px-4 block mt-4"
                                            />
                                            <ErrorMessage
                                                name="firstName"
                                                component="small"
                                                className="text-red-500"
                                            />
                                        </div>
                                        <div className="">
                                            <Field
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder = "Last Name"
                                                className="intro-x login__input form-control py-3 px-4 block mt-4"
                                            />
                                            <ErrorMessage
                                                name="lastName"
                                                component="small"
                                                className="text-red-500"
                                            />
                                        </div>
                                        <div className="">
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder = "Email"
                                                className="intro-x login__input form-control py-3 px-4 block mt-4"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="small"
                                                className="text-red-500"
                                            />
                                        </div>
                                        <div className="">
                                            <Field
                                                type={hide}
                                                id="password"
                                                name="password"
                                                placeholder = "Password"
                                                className="intro-x login__input form-control py-3 px-4 block mt-4"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="small"
                                                className="text-red-500"
                                            />
                                        </div>
                                        <div className="">
                                            <Field
                                                type={hide}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder = "Password Confirmation"
                                                className="intro-x login__input form-control py-3 px-4 block my-4 "
                                            />
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="small"
                                                className="text-red-500"
                                            />
                                        </div>
                                            <div className='flex text-primary cursor-pointer font-bold'
                                                onClick={()=> {hide == "password"
                                                ? setHide("text")
                                                : setHide("password")}}
                                            >  {hide == "password" 
                                            ? <Lucide icon="EyeOff" className="w-4 h-4 mt-1 mr-3 font-bold"/>
                                            : <Lucide icon="Eye" className="w-4 h-4 mt-1 mr-3 font-bold"/> }  
                                                <p>{hide == "password" 
                                                ? "Show"
                                                : "Hide" } Passwords</p>
                                            </div>
                                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                            <button type='submit' className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                                                Submit {isLoading}
                                            </button>
                                            <Link to='/update-profile' className="btn py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                                                Skip know
                                            </Link>
                                        </div>
                                        <p className='mt-2'>Already have an account yet? Then <Link to="/login" className='text-primary'>Login</Link></p>

                                    </Form>
                                )}
                                </Formik>
                            </div>
                        </div>
                        {/* END: Register Form */}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Main;


export function Error({content}){
  
return(
  <Alert className="alert-danger flex items-center mb-2 px-4">
  {({ dismiss }) => (
    <>
      <Lucide
        icon="AlertOctagon"
        className="w-6 h-6 mr-2"
      /><p className="px-6" >{content}</p>
      <button
        type="button"
        className="btn-close text-white"
        aria-label="Close"
        onClick={dismiss}
      >
        <Lucide icon="X" className="w-4 h-4" />
      </button>
    </>
  )}
</Alert>)
}
