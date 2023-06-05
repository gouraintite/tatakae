import { Link } from 'react-router-dom'
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
//import LangSwitcher from "@/components/lang-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import resetUrl from "@/assets/images/change_pwd.svg";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Lucide, 
  Alert,
  LoadingIcon
} from "@/base-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from './validation';
//Localization Test start...
import '../../translation/i18n'
import axios from 'axios';
//Localization Test end...

function Main() {

  let {email} = useParams;
  let navigate = useNavigate();
  const [hide, setHide] = useState("password");
  const [isLoading, setIsLoading] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    setIsLoading(null)
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const initialValues = {
    password: '',
    confirmPassword: '',
  }
  const handleSubmit = (values) => {
    console.log(values, 'values here')
    //values.preventDefault();
    setIsLoading(<LoadingIcon icon="tail-spin" className="w-6 h-6 ml-4" />)
    console.log('is loading before req', isLoading)
    
    const dataToGo = {
      identifier: email || localStorage.getItem('reseting_email'),
      password: values.password,
      code: localStorage.getItem('reseting_code')
    }
    console.log(dataToGo)

    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/reset/`, dataToGo)
      .then(response => {
        navigate('/login')
        let acessToken = response?.data?.key;
        localStorage.setItem('userToken', acessToken)
        localStorage.setItem('userId', response.data.id)
        console.log(response, 'response RESET_PASSWORD')
        console.log(localStorage.getItem('userToken'), 'user Token here')
      })
      .catch(err => {
        navigate('/login')
        console.log(localStorage.getItem('userToken'), 'user Token here error RESET_PASSWORD')
        console.log(err?.response?.data?.message, "error content")
        setErrMsg('Unable to reset, the code has already been used')
      })
      .finally(
        setIsLoading('')
      )
  }

  return (
    <>
      <div>
        <div className="mr-4 text-slate-600 dark:text-slate-200"><DarkModeSwitcher position="top-6 right-40" /></div>
        {/* <div className="mr-4 text-slate-600 dark:text-slate-200"><LangSwitcher /> </div> */}
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <Link to="/" className="-intro-x flex pt-5">
                <img
                  alt="Wenlo agency"
                  className="w-20"
                  src={logoUrl}
                />
              </Link>
              <div className="my-auto">
                <img
                  alt="Wenlo agency"
                  className="-intro-x w-10/12 -mt-20"
                  src={resetUrl}
                />
                <div className="-intro-x text-white font-medium text-3xl leading-tight mt-0 w-4/5">
                  Want to change your password?
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Reset it!
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                {errMsg ? <Error content={errMsg} /> : null }
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Reset your password here
                </h2>
                <div className="intro-x text-slate-400 mt-6">
                  Enter your new password, confirm it then validate changes
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(values)}
            >
              {({errors}) => (
                <Form className=' h-auto'>
                  <div>
                    <div className="intro-x mt-4">
                      <div>
                        <label
                          className=" select-none text-md"
                        >
                          New password <span className="text-red-500 text-lg">*</span>
                        </label>
                        <div>
                          <Field
                            autoFocus={true}
                            type={hide}
                            id="password"
                            name="password"
                            className="intro-x login__input form-control py-4 px-4 block pl-2 my-2"
                          />
                          <ErrorMessage
                            name="password"
                            component="small"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className=" select-none text-md"
                        >
                          Confirm password <span className="text-red-500 text-lg">*</span>
                        </label>
                        <div>
                          <Field
                            type={hide}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="intro-x login__input form-control py-4 px-4 block pl-2 my-2"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="small"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                          <div className="flex items-center mr-auto">
                                <label
                                    htmlFor="acceptTerms"
                                    className="form-check-label text-primary"
                                    onClick={()=> {hide == "password"
                                    ? setHide("text")
                                    : setHide("password")}}
                                >
                                    {hide == "password" 
                                    ? "Show"
                                    : "Hide" } password
                                </label>
                                {/* <div className='ml-60'>
                                  <a href="/reseting">reset again</a>
                                </div> */}
                          </div>
                        </div>
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button type='submit'
                            disabled={Object.keys(errors).length > 0} 
                            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                      Submit {isLoading}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;


export function Error({content}){
  
  return(
    <Alert className="alert-danger flex items-center mb-2">
    {({ dismiss }) => (
      <>
        <Lucide
          icon="AlertOctagon"
          className="w-6 h-6 mr-2"
        /> <p className="px-6" >{content}</p>
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
