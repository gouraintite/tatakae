import { Link } from 'react-router-dom'
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import LangSwitcher from "@/components/lang-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "@/assets/images/forgot.svg";
import logoUrl from "@/assets/images/logo.png";
import { useEffect, useState, useRef } from "react";
import {LoadingIcon} from "@/base-components";
import { forgot_password_service } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

function Main() {

  const userRef = useRef();
  const [user, setUSer] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
    setIsLoading(null)
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(<LoadingIcon icon="ball-triangle" className="w-6 h-6 ml-4" />)
    console.log('is loading before req', isLoading )
    console.log(user)

    forgot_password_service({identifier: user})
                .then(response=>{      
                  navigate(`/reseting/` + user);
                  console.log(response, 'response')
                  localStorage.setItem('reseting_email', user)
                })
                .catch(err=>{
                  const error = err?.response?.data;
                  console.log(error, "error ye");
                  setIsLoading(null)
                })
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
              <Link to="/" className="-intro-x flex items-center pt-5">
                <img
                  alt="Wenlo"
                  className="w-20"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> {/*Enigma*/}</span>
              </Link>
              <div className="my-auto">
                <img
                  alt="Wenlo"
                  className="-intro-x w-2/3 -mt-6"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-3xl leading-tight lg:-pr-20 pt-0 w-9/12">
                  It seems that you have forgotten your password
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
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Recover your account
                </h2>
                <div className="intro-x text-slate-400 dark:text-slate-400 mt-6">
                  Enter the recuparation email
                </div>
                <div className=''>
                  <form onSubmit={handleSubmit}>
                    <div className="intro-x mt-8 fixed">
                      <input
                        type="email"
                        className="intro-x login__input form-control py-3 px-4 block"
                        placeholder="Email"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUSer(e.target.value)}
                        value={user}
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
