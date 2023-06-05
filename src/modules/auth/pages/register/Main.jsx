import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../../components/validation';
import { Link } from 'react-router-dom'
import {
    Lucide,
    Alert,
    LoadingIcon,
} from "@/base-components";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/up.svg";
import { useState, useEffect } from "react";
import { register_service } from '../../services/auth.service';
//Localization Test start...
import { useTranslation } from "react-i18next";
import '../../translation/i18n'
import { useNavigate } from 'react-router-dom';
function Main() {

    let navigate = useNavigate();
    let { t } = useTranslation();

    useEffect(() => {
        dom("body").removeClass("main").removeClass("error-page").addClass("login");
    }, []);


    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [hide, setHide] = useState("password");


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


    const handleSubmit = (values) => {
        console.log(values, 'values here')
        setIsLoading(<LoadingIcon icon="ball-triangle" color='white' className="w-6 h-6 ml-4" />)
        console.log('is loading before req', isLoading)
        console.log(values, 'values here')

        register_service({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
        }).then(response => {
            navigate('/consult-your-mail/' + values.email)
            console.log(JSON.stringify(response?.data), "respo");
            console.log(response, 'response')
        })
            .catch(err => {
                setIsLoading(null)
                console.log(err?.response?.data?.errors?.email[0], "error content")
                setErrMsg(err?.response?.data?.errors?.email[0])
            })

    }
    return (
        <>
            <div>
                <DarkModeSwitcher />
                <div className="container sm:px-10">
                    <div className="block xl:grid grid-cols-2 gap-4">
                        {/* BEGIN: Register Info */}
                        <div className="hidden xl:flex flex-col min-h-screen">
                            <div className="-intro-x flex items-center pt-5">
                                <img
                                    alt="Wenlo agency"
                                    className="w-28 pt-6"
                                    src={logoUrl}
                                />
                                <span className="text-white text-lg ml-3"> {/*Tinker*/} </span>
                            </div>
                            <div className="my-auto">
                                <img
                                    alt="Wenlo agency"
                                    className="-intro-x w-9/12 -mt-16"
                                    src={illustrationUrl}
                                />
                                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                    A few more clicks to <br />
                                    sign up to your account.
                                </div>
                                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                                    Manage your ad accounts in one place
                                </div>
                            </div>
                        </div>
                        {/* END: Register Info */}
                        {/* BEGIN: Register Form */}
                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-3/4 ">
                                {errMsg ? <Error content={errMsg} /> : null}
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Sign Up
                                </h2>
                                <div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
                                    A few more clicks to sign up to your account. Manage all your
                                    ad accounts in one place
                                </div>

                                {/* Start form */}
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => handleSubmit(values)}
                                >

                                    {({ errors }) => (
                                        <Form >
                                            <div className="">
                                                <Field
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                                                    autoFocus={true}
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
                                                    placeholder="Last Name"
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
                                                    placeholder="Email"
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
                                                    placeholder="Password"
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
                                                    placeholder="Password Confirmation"
                                                    className="intro-x login__input form-control py-3 px-4 block my-4 "
                                                />
                                                <ErrorMessage
                                                    name="confirmPassword"
                                                    component="small"
                                                    className="text-red-500"
                                                />
                                            </div>
                                            <div className='flex text-primary cursor-pointer font-bold'
                                                onClick={() => {
                                                    hide == "password"
                                                    ? setHide("text")
                                                    : setHide("password")
                                                }}
                                            >  {hide == "password"
                                                ? <Lucide icon="EyeOff" className="w-4 h-4 mt-1 mr-3 font-bold" />
                                                : <Lucide icon="Eye" className="w-4 h-4 mt-1 mr-3 font-bold" />}
                                                <p>{hide == "password"
                                                    ? "Show"
                                                    : "Hide"} passwords</p>
                                            </div>
                                            <div className='mt-4'>
                                                <div className='flex' >
                                                    <Field
                                                        name="acceptTerms"
                                                        type="checkbox"
                                                        className="form-check-input ring mt-1"

                                                        onClick={(e) => {
                                                            e.checked ? e.checked = 'false' : e.checked = 'true'
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="acceptTerms"
                                                        className="form-check-label text-lg text-justify"
                                                    >   By clicking on "Register", you are comfirming that you have read and agree to Wenlo &nbsp;
                                                        <a href="#" className=' text-primary' >Terms of use</a>  &nbsp; and &nbsp; <a href="#" className=' text-primary' >Privacy police</a>.
                                                    </label>

                                                </div>
                                                <ErrorMessage
                                                    name="acceptTerms"
                                                    component="small"
                                                    className="text-red-500"
                                                />
                                            </div>
                                            <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                                <button 
                                                    type='submit' 
                                                    disabled={Object.keys(errors).length > 0}
                                                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                                                    Register {isLoading}
                                                </button>
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


export function Error({ content }) {

    return (
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


