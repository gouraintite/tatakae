import { Link } from 'react-router-dom'
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
//import LangSwitcher from "@/components/lang-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/in.svg";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Lucide,
  Alert,
} from "@/base-components";
import { LoadingIcon } from "@/base-components";
//Localization Test start...
import '../../translation/i18n'
import { login_service, profile_service } from '../../services/auth.service';
import axiosInstance from '../../../../config/axios';
import { useRecoilState } from 'recoil';
import { PPUrl, Stats } from '../../../../stores/report';
//Localization Test end...

function Main() {

  const navigate = useNavigate();

  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef();

  const [user, setUSer] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [hide, setHide] = useState("password");
  const [profile, setProfile] = useRecoilState(PPUrl)

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg(null)
  }, []);

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  // const handleProfile = () => {
  //   profile_service()
  //     .then(res => {
  //       console.log(res?.data, 'my data');
  //       setPpurl(res?.data)
  //       localStorage.setItem('isAble', res?.data?.is_able)

  //     }).catch(err => {
  //       console.log(err, 'my data error');
  //     })
  // }
  const [stats, setStats] = useRecoilState(Stats)
  const [count, setCount] = useState(0);

  const getData = () => {
    axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/profile/stats/`)
      .then(response => {
        setStats(response?.data)
        localStorage.setItem('stats', JSON.stringify(response?.data))
        console.log(stats, ' stats ----------------- dashboard data');
      })
      .catch(error => {
        //console.log(error?.data, 'thios are errors');
      })
  }

  if (count < 1) {
    setTimeout(() => {
      setCount(count + 1); 
    }, 200);
  }

  const handleProfile = async (data) => {
    profile_service()
      .then(response => {
        console.log(response?.data, 'my data');
        localStorage.setItem('client', JSON.stringify(data))
        localStorage.setItem('userId', response?.data?.id)
        console.log('UserId', response?.data?.id);
        localStorage.setItem('isAble', response?.data?.is_able)
        localStorage.setItem('role', response?.data?.role)        
        grade(response?.data?.role)

        console.log(localStorage.getItem('isAble'), "localStorage.getItem('isAble') in login");
        setProfile(response?.data)
        getData();
        setTimeout(() => {
          localStorage.getItem('isStaff') === 'true' 
          ? localStorage.getItem('isAble') === 'true' 
            ?  navigate('/back-office/report') 
              : navigate('/back-office/update-profile')
          : localStorage.getItem('isAble') === 'true' 
            ?  navigate('/dashboard') 
               : window.location.replace('/manage-subscription')
        }, 2000);
      }).catch(err => {
        console.log(err, 'my data error');
      }).finally(
        console.log(' finally my data'))
  }

  const grade = (role) => {
    switch (role) {
      case "simple":
        localStorage.setItem('grade', 0);
        break;
      case "client_support":
        localStorage.setItem('grade', 1);
        break;
      case "staff_financier":
        localStorage.setItem('grade', 2);
        break;
      case "staff_technique":
        localStorage.setItem('grade', 3);
        break;
      case "admin":
        localStorage.setItem('grade', 4);
        break;

      default:

        localStorage.setItem('grade', 99);
        break;
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(<LoadingIcon icon="ball-triangle" color='white' className="w-6 h-6 ml-4" />)
    console.log('is loading before req', isLoading)
    console.log(user, pwd)

    login_service({
      identifier: user,
      password: pwd
    })
      .then(response => {
        let acessToken = response?.data?.key;
        localStorage.setItem('userToken', acessToken)
        localStorage.setItem('isStaff', response?.data?.user?.is_staff)
        grade(response?.data?.role);
        window.localStorage.setItem('client', JSON.stringify(response?.data))
        
          handleProfile(response?.data)
      })
      .catch(err => {
        setErrMsg(err?.response?.data?.errors?.non_field_errors[0])
        setIsLoading(null)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000);
      })
  }

  return (
    <>
      <div>
        <div className="mr-4 text-slate-600 dark:text-slate-200"><DarkModeSwitcher position="top-6 right-40" /></div>
        {/* <div className="mr-4 text-slate-600 dark:text-slate-200"><LangSwitcher /> </div> */}
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
                <span className="text-white text-lg ml-3"> {/*Tinker*/}</span>
              </div>
              <div className="my-auto">
                <img
                  alt="Wenlo login page"
                  className="-intro-x w-9/12 -mt-8"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-0">
                  {/* <a href="https://storyset.com/user" className='text-sm'>User illustrations by Storyset</a> <br /> */}
                  A few more clicks to <br />
                  log in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage your ad accounts in one place
                </div>
              </div>
            </div>
            {/* END: Register Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx  -auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                {errMsg ? <Error content={errMsg} /> : null}
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Log in
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to log into your account.
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="intro-x mt-8 fixed">
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Email"
                      ref={userRef}
                      autoComplete='off'
                      onChange={(e) => setUSer(e.target.value)}
                      value={user}
                      required
                    />
                    <input
                      type={hide}
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder='Password'
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                    />
                  </div>
                  <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      <label
                        htmlFor="acceptTerms"
                        className="form-check-label text-primary"
                        onClick={() => {
                          hide == "password"
                            ? setHide("text")
                            : setHide("password")
                        }}
                      >
                        {hide == "password"
                          ? "Show"
                          : "Hide"} password
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-primary">Forgot password</Link>
                  </div>
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button type='submit' className="btn btn-primary py-3 px-4 w-full xl:w-40 xl:mr-3 align-top">
                      Submit {isLoading}
                    </button>
                  </div>
                </form>
                <div className="intro-x mt-10 xl:mt-4 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                  <p>Don't have an account ? <Link to="/register" className="text-primary" >&nbsp;&nbsp;Register</Link></p>
                </div>
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

export function Error({ content }) {

  return (
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






