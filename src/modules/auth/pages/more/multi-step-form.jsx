import { Lucide, Alert, LoadingIcon, TomSelect } from "@/base-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/config/axios";

export default function MultiStepForm() {
  let navigate = useNavigate();
  const [select1, setSelect1] = useState("1");
  const [select2, setSelect2] = useState("1");
  const [select3, setSelect3] = useState("1");
  const [select4, setSelect4] = useState("1");
  const [select5, setSelect5] = useState("1");
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [step, setStep] = useState(["", "hidden", "hidden"]);


  const stepManager = (position) => {
    let newArray = [...step];
    for (let i = 0; i < step.length; i++) {
      if (i !== position) {
        newArray[i] = "hidden";
      } else {
        newArray[i] = "";
      }
    }
    setStep(newArray);
    console.log(step, "tep here now");
  };


  const handleSubmit = (question, value) => {
    console.log(values, "values here");
    setIsLoading(<LoadingIcon icon="ball-triangle" className="w-6 h-6 ml-4" />);
    const dataToGo = {
      question,
      value
    };

    console.log(dataToGo, "dataToGo");

    axiosInstance
      .post(`${import.meta.env.VITE_BASE_URL}/requests/`, dataToGo)
      .then((response) => {
        console.log("question", question, 'done' );
        console.log(response?.data);
      })
      .catch((err) => {
        let error = err?.response?.data;
        setErrMsg(error);
      });
  };

  const loopSubmit = ()=>{
    navigate('/update-profile')
    let tab = [select1, select2, select3, select4, select5]
    for (let index = 0; index < 6; index++) {
      handleSubmit(index, tab[index + 1])
    }
  }

  return (
    <>
      <div className="h-auto w-full">
        <div className="intro-y sm:py-20 py-0 w-full mx-auto rounded-lg bg-white dark:bg-transparent">
          <div className="pb-6 text-2xl font-semibold mx-auto text-center">
            <Lucide
              icon="GitPullRequest"
              className="w-16 h-16 text-primary mx-auto mb-2"
            />
          </div>
          <div className="relative before:hidden before:lg:block before:absolute before:w-[50%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-200 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
              <button className="w-10 h-10 rounded-full btn btn-primary">
                1
              </button>
              <div className=" font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
                Wenlo
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button
                className={` w-10 h-10 rounded-full btn ${
                  step[1] === "" ||
                  step[2] === "" ||
                  step[3] === "" ||
                  step[4] === ""
                    ? " btn-primary text-white "
                    : "text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
                }`}
              >
                2
              </button>
              <div className=" text-base lg:mt-3 ml-3 lg:mx-auto text-slate-500">
                About your business
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button
                className={` w-10 h-10 rounded-full btn ${
                  step[2] === "" || step[3] === "" || step[4] === ""
                    ? " btn-primary text-white "
                    : "text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
                }`}
              >
                3
              </button>
              <div className=" text-base lg:mt-3 ml-3 lg:mx-auto text-slate-500">
                About adverstising
              </div>
            </div>
          </div>
          {errMsg ? <Error content={errMsg} /> : null}
          <div className="first sm:px-20 mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <div className="">
              <form className="h-auto" onSubmit={loopSubmit}>
                {errMsg ? <Error content={errMsg} /> : null}

                <div className={` ${step[0]}`}>
                  <div className="intro-x">
                    <div>
                      <label className=" select-none text-lg">
                        How did you hear about Wenlo?
                        <span className="text-red-500 text-lg">*</span>
                      </label>
                      <div className="mt-2">
                        <TomSelect
                          value={select1}
                          onChange={setSelect1}
                          options={{
                            placeholder: "Add here if not listed",
                            create: true,
                            plugins: {
                              dropdown_header: {
                                title: "your meeting wiith us",
                              },
                            },
                          }}
                        >
                          <option value={1}>Forum comments</option>
                          <option value={2}>Internet Article</option>
                          <option value={3}>Google</option>
                          <option value={4}>Suggested by friend</option>
                          <option value={5}>Youtube Video</option>
                          <option value={6}>Facebook</option>
                          <option value={7}>Twitter </option>
                          <option value={8}>Others</option>
                        </TomSelect>
                      </div>
                    </div>
                    <div className="mt-9">
                      <label className="select-none text-lg">
                        Do you have experience with agency ads accounts?
                        <span className="text-red-500 text-lg">*</span>
                      </label>

                      <fieldset class="my-3 flex">
                        <div class="flex items-center mb-4">
                          <input
                            id="experience-option-1"
                            type="radio"
                            name="experience"
                            value="no"
                            class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-red-300"
                            checked
                          />
                          <label
                            for="experience-option-1"
                            class="text-sm font-medium ml-2 block"
                          >
                            No
                          </label>
                        </div>

                        <div class="flex items-center mb-4 mx-12">
                          <input
                            id="experience-option-2"
                            type="radio"
                            name="experince"
                            value='yes'
                            class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                          />
                          <label
                            for="experience-option-2"
                            class="text-sm font-medium ml-2 block"
                          >
                            Yes
                          </label>
                        </div>
                      </fieldset>
                    </div>
                    <div className={`flex pt-6 text-center xl:text-left`}>
                      <p className="btn cur py-3 px-4 w-auto xl:mr-4 align-top cursor-not-allowed">
                        Previous page
                      </p>
                      <p
                        className="btn btn-primary py-3 px-4 w-auto mx-6 align-top"
                        onClick={() => stepManager(1)}
                      >
                        Next page
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${step[1]}`}>
                  <div className="intro-x mt-4">
                    <div>
                      <div className="mb-6">
                        <label className=" select-none text-lg">
                          What is the size of your business?
                          <span className="text-red-500 text-lg">*</span>
                        </label>
                        <div className="mt-4">
                          <TomSelect
                            value={select2}
                            onChange={setSelect2}
                            options={{
                              placeholder: "Add here if not listed",
                              plugins: {
                                dropdown_header: {
                                  title: "Business size",
                                },
                              },
                            }}
                          >
                            <option value={1}>
                              Micro-sized business: less than 10 employees
                            </option>
                            <option value={2}>
                              Small-sized business: 10-49 employees
                            </option>
                            <option value={3}>
                              Medium business: 50-249 employees
                            </option>
                            <option value={4}>
                              Large-sized business: more than 250 employees
                            </option>
                          </TomSelect>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className=" select-none text-lg">
                          What type of business are you doing?
                          <span className="text-red-500 text-lg">*</span>
                        </label>
                        <div className="mt-4">
                          <TomSelect
                            value={select3}
                            onChange={setSelect3}
                            options={{
                              placeholder: "Add here if not listed",
                              create: true,
                              plugins: {
                                dropdown_header: {
                                  title: "Business type",
                                },
                              },
                            }}
                          >
                            <option value={1}>Freelancing</option>
                            <option value={2}>Dropshipping</option>
                            <option value={3}>Print on demand</option>
                            <option value={4}>Affiliate marketing</option>
                            <option value={5}>Arbitrage</option>
                            <option value={6}>Web development</option>
                            <option value={7}>
                              Digital marketing / Media Buying
                            </option>
                            <option value={8}>Amazon and eBay</option>
                            <option value={9}>Lead generation</option>
                            <option value={10}>Webinars</option>
                            <option value={11}>Funnel agency</option>
                            <option value={12}>eBooks</option>
                            <option value={13}>Course creation</option>
                            <option value={14}>Audiobook</option>
                            <option value={15}>YouTube</option>
                            <option value={16}>Consulting</option>
                            <option value={17}>Apps</option>
                            <option value={18}>Blogging</option>
                            <option value={19}>Gaming</option>
                            <option value={20}>eCommerce brand</option>
                            <option value={21}>Gambling</option>
                          </TomSelect>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex intro-x mt-6 text-center xl:text-left`}
                    >
                      <p
                        className="btn btn-primary py-3 px-4 w-auto mr-3 align-top"
                        onClick={() => stepManager(0)}
                      >
                        Previous page
                      </p>
                      <p
                        className="btn btn-primary py-3 px-4 w-auto mx-3 align-top"
                        onClick={() => stepManager(2)}
                      >
                        Next page
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${step[2]}`}>
                  <div>
                    <div className="mb-6">
                      <label className=" select-none text-lg">
                        What is your average monthly advertising budget for
                        social media? (Facebook Ads, Google Adwords, TikTok Ads
                        ....)
                        <span className="text-red-500 text-lg">*</span>
                      </label>
                      <div className="mt-4">
                        <TomSelect
                          value={select4}
                          onChange={setSelect4}
                          options={{
                            plugins: {
                              dropdown_header: {
                                title: "Monthly advertising average",
                              },
                            },
                          }}
                        >
                          <option value={1}>0 – 1k$ per month</option>
                          <option value={2}>1k$ - 10k$ per month</option>
                          <option value={3}>10k$ - 50k$ per month</option>
                          <option value={4}>50$ - 200k$ per month</option>
                        </TomSelect>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className=" select-none text-lg">
                        What kind of issues do you have with online
                        adverstising?
                        <span className="text-red-500 text-lg">*</span>
                      </label>
                      <div className="mt-4">
                        <TomSelect
                          value={select5}
                          onChange={setSelect5}
                          options={{
                            placeholder: "Add here if not listed",
                            create: true,
                            plugins: {
                              dropdown_header: {
                                title: "Advertising issues",
                              },
                            },
                          }}
                        >
                          <option value={1}>Spending Issues</option>
                          <option value={2}>Payment method issues</option>
                          <option value={3}>Daily spend limit</option>
                          <option value={4}>Page restriction</option>
                          <option value={5}>Ad Account Restriction</option>
                          <option value={6}>
                            Restriction of the business account (Business
                            Manager, Business Center...)
                          </option>
                          <option value={7}>
                            Facebook Profile Restriction
                          </option>
                        </TomSelect>
                      </div>
                    </div>
                  </div>
                  <div className="flex intro-x mt-6 text-center xl:text-left">
                    <p
                      className="btn btn-primary py-3 px-4 w-auto mr-3 align-top"
                      onClick={() => stepManager(1)}
                    >
                      Previous page
                    </p>
                    <button
                      type="submit"
                      className="btn btn-primary py-3 px-4 w-auto xl:mr-3 align-top mx-3"
                    >
                      Submit {isLoading}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* END: Wizard Layout */}
      </div>
    </>
  );
}

export function Error({ content }) {
  return (
    <Alert className="alert-danger flex items-center mb-2 mx-6 mt-3">
      {({ dismiss }) => (
        <>
          <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> {content}
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
    </Alert>
  );
}
