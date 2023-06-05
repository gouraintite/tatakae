import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/reseting.svg";
import { resend_service } from '../../services/auth.service';
import { Link } from 'react-router-dom'
import {LoadingIcon,
        Lucide,
        Alert} from "@/base-components";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../config/axios';

function Main() {

  let { email } = useParams();

  const codeRef = useRef();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  let navigate = useNavigate();

  useEffect(() => {
    codeRef.current.focus();
    setIsLoading(null)
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(<LoadingIcon icon="ball-triangle" color='white'  className="w-6 h-6 ml-4" />)
    console.log('is loading before req', isLoading)
    console.log(code)

    let data = {
      "email": email,
      "code": code
    }

    axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/auth/activate/`, data)
      .then(response => {
        navigate(`/login`);
        console.log(response, 'response')
      })
      .catch(err => {
        setIsLoading(null)
        const error = err?.response?.data?.errors?.code[0];
        setErrorMessage(error )
        console.log(error, "error ye")
      })
  }

  const handleResend = () => {
    resend_service({
      type: 'signin',
      email: email
    })
      .then(response => {
        console.log(response?.data)
      })
      .catch(err => {
        console.log(err?.data)
      })
      .finally(
        console.log('handleResend called')
      )
  }


  return (
    <>
      <div>
        <div className="mr-4 text-slate-600 dark:text-slate-200"><DarkModeSwitcher position="top-4 right-40" /></div>
        {/* <div className="mr-4 text-slate-600 dark:text-slate-200"><LangSwitcher /> </div> */}
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Register Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <div className="-intro-x flex items-center pt-5">
                <img
                  alt="Wenlo agency"
                  className="w-20"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> {/*Enigma*/}</span>
              </div>
              <div className="my-auto">
                <img
                  alt="Wenlo agency"
                  className="-intro-x w-2/3 -mt-6"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-3xl leading-tight lg:-pr-20 pt-0 w-9/12">
                  We just sent you a mail to complete your registration
                </div>{/*
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>*/}
              </div>
            </div>
            {/* END: Register Info */}
            {/* BEGIN: Register Form */}
            <div className="h-screen xl:h-auto flex pb-1 xl:py-0 mt-5 xl:my-0 px-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-5 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-3/4">
                {errorMessage ? <Error content={errorMessage} /> : null }
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Activate your account
                </h2>
                <div className="intro-x text-slate-500 dark:text-slate-400 mt-6">
                  Enter the activation code present in your mail
                </div>
                <div className=''>
                  <form onSubmit={handleSubmit}>
                    <div className="intro-x mt-8 fixed">
                      <input
                        type="text"
                        className="intro-x login__input form-control py-3 px-4 block"
                        placeholder="Activation code"
                        ref={codeRef}
                        autoComplete='off'
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        required
                      />
                    </div>
                    <div className="intro-y mt-1 mb-2 xl:mt-8 text-center xl:text-left">
                      <button className="btn btn-primary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                        Submit {isLoading}
                      </button>
                    </div>
                  </form>
                </div>
                <div className='mt-12'>
                  <p>Didn't recieve a mail,
                    <span
                      onClick={handleResend}
                      className='text-underline italic text-primary mx-2 cursor-pointer'>clik here</span>
                     and check your mailbox again</p>
                </div>
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