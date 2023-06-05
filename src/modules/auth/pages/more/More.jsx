import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/questions.svg";
import done from "@/assets/images/done.svg";
import {useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultiStepForm from './multi-step-form';
function Main() {

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  let navigate = useNavigate();
  const [stepForm, setStep] = useState(['', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
  const [choices, setChoices] = useState([])


  const stepManager = (position) => {
    let newArray = [...stepForm];
    for (let i = 0; i < stepForm.length; i++) {
      if (i !== position) {
        newArray[i] = 'hidden'
      }
      else {
        newArray[i] = ''
      }
    }
    setStep(newArray);
    console.log(stepForm, 'tep here now')
  }

  const handleChoice = (step, value) => {
    setChoices(() => {
      let momentChoices = [...choices];
      momentChoices[step] = value ;
      return momentChoices;
    })
    console.log(choices, 'firss');
  }

  const data = [
    {
      id: 0,
      title: 'How did you hear about Wenlo?',
      content: [
        {
          id: 1,
          value: 'Forum comments',
          choosed: false,
          action: () => { handleChoice(0, 1) }
        },
        {
          id: 2,
          value: 'Internet Article',
          choosed: false,
          action: () => { handleChoice(0, 2) }
        },
        {
          id: 3,
          value: 'Google',
          choosed: false,
          action: () => { handleChoice(0, 3) }
        },
        {
          id: 4,
          value: 'Suggested by friend',
          choosed: false,
          action: () => { handleChoice(0, 4) }
        },
        {
          id: 5,
          value: 'Youtube Video',
          choosed: false,
          action: () => { handleChoice(0, 5) }
        },
        {
          id: 6,
          value: 'Facebook',
          choosed: false,
          action: () => { handleChoice(0, 6) }
        },
        {
          id: 7,
          value: 'Twitter',
          choosed: false,
          action: () => { handleChoice(0, 7) }
        },
        {
          id: 8,
          value: 'Other',
          choosed: false,
          action: () => { handleChoice(0, 8) }
        },
      ],
      actions: [
        {
          action: () => { handleSubmit(0)},
          value: 'Next'
        },
      ],
      status: stepForm[0]
    },
    {
      id: 1,
      title: 'What is the size of your business?',
      content: [
        {
          id: 1,
          value: 'Micro-sized business: less than 10Small-sized business: 10-49 employees',
          choosed: false,
          action: () => { handleChoice(1, 1) }
        },
        {
          id: 2,
          value: 'Small-sized business: 10-49 employees',
          choosed: false,
          action: () => { handleChoice(1, 2) }
        },
        {
          id: 3,
          value: 'Medium business: 50-249 employees',
          choosed: false,
          action: () => { handleChoice(1, 3) }
        },
        {
          id: 4,
          value: 'Large-sized business: more than 250 employees',
          choosed: false,
          action: () => { handleChoice(1, 4) }
        },
      ],
      actions: [
        // {
        //   action: () => { stepManager(0) },
        //   value: 'Previous'
        // },
        {
          action: () => { handleSubmit(1) },
          value: 'Next'
        },
      ],
      status: stepForm[1]
    },
    {
      id: 2,
      title: 'What type of business are you doing?',
      content: [
        {
          id: 1,
          value: 'Freelancing',
          choosed: false,
          action: () => { handleChoice(2, 1) }
        },
        {
          id: 2,
          value: 'Dropshipping',
          choosed: false,
          action: () => { handleChoice(2, 2) }
        },
        {
          id: 3,
          value: 'Print on demand',
          choosed: false,
          action: () => { handleChoice(2, 3) }
        },
        {
          id: 4,
          value: 'Affiliate marketing',
          choosed: false,
          action: () => { handleChoice(2, 4) }
        },
        {
          id: 5,
          value: 'Arbitrage',
          choosed: false,
          action: () => { handleChoice(2, 5) }
        },
        {
          id: 6,
          value: 'Web development',
          choosed: false,
          action: () => { handleChoice(2, 6) }
        },
        {
          id: 7,
          value: 'Digital marketing / Media Buying',
          choosed: false,
          action: () => { handleChoice(2, 7) }
        },
        {
          id: 8,
          value: 'Amazon and eBay',
          choosed: false,
          action: () => { handleChoice(2, 8) }
        },
        {
          id: 9,
          value: 'Lead generation',
          choosed: false,
          action: () => { handleChoice(2, 9) }
        },
        {
          id: 10,
          value: 'Webinars',
          choosed: false,
          action: () => { handleChoice(2, 10) }
        },
        {
          id: 11,
          value: 'Funnel agency',
          choosed: false,
          action: () => { handleChoice(2, 11) }
        },
        {
          id: 12,
          value: 'eBooks',
          choosed: false,
          action: () => { handleChoice(2, 12) }
        },
        {
          id: 13,
          value: 'Course creation',
          choosed: false,
          action: () => { handleChoice(2, 13) }
        },
        {
          id: 14,
          value: 'Audiobook',
          choosed: false,
          action: () => { handleChoice(2, 14) }
        },
        {
          id: 15,
          value: 'YouTube',
          choosed: false,
          action: () => { handleChoice(2, 15) }
        },
        {
          id: 16,
          value: 'Consulting',
          choosed: false,
          action: () => { handleChoice(2, 16) }
        },
        {
          id: 17,
          value: 'Apps',
          choosed: false,
          action: () => { handleChoice(2, 17) }
        },
        {
          id: 18,
          value: 'Blogging',
          choosed: false,
          action: () => { handleChoice(2, 18) }
        },
        {
          id: 19,
          value: 'Gaming',
          choosed: false,
          action: () => { handleChoice(2, 19) }
        },
        {
          id: 20,
          value: 'eCommerce brand',
          choosed: false,
          action: () => { handleChoice(2, 20) }
        },
        {
          id: 21,
          value: 'Gambling',
          choosed: false,
          action: () => { handleChoice(2, 21) }
        },
        {
          id: 22,
          value: 'Other',
          choosed: false,
          action: () => { handleChoice(2, 22) }
        },
      ],
      actions: [
        // {
        //   action: () => { stepManager(1) },
        //   value: 'Previous'
        // },
        {
          action: () => { handleSubmit(2) },
          value: 'Next'
        },
      ],
      status: stepForm[2]
    },
    {
      id: 3,
      title: 'What is your average monthly advertising budget for social media? (Facebook Ads, Google Adwords, TikTok Ads ....)',
      content: [
        {
          id: 1,
          value: '0 – 1k$ per month',
          choosed: false,
          action: () => { handleChoice(3, 1) }
        },
        {
          id: 2,
          value: '1k$ - 10k$ per month',
          choosed: false,
          action: () => { handleChoice(3, 2) }
        },
        {
          id: 3,
          value: '10k$ - 50k$ per month',
          choosed: false,
          action: () => { handleChoice(3, 3) }
        },
        {
          id: 4,
          value: '50$ - 200k$ per month',
          choosed: false,
          action: () => { handleChoice(3, 4) }
        },
        {
          id: 5,
          value: '+ 200K$ per month',
          choosed: false,
          action: () => { handleChoice(3, 5) }
        },
      ],
      actions: [
        // {
        //   action: () => { stepManager(2) },
        //   value: 'Previous'
        // },
        {
          action: () => { handleSubmit(3) },
          value: 'Next'
        },
      ],
      status: stepForm[3]
    },
    {
      id: 4,
      title: 'Do you have experience with agency ads accounts?',
      content: [
        {
          id: 1,
          value: 'Yes',
          choosed: false,
          action: () => { handleChoice(4, 1) }
        },
        {
          id: 2,
          value: 'No',
          choosed: false,
          action: () => { handleChoice(4, 2) }
        },
      ],
      actions: [
        // {
        //   action: () => { stepManager(3) },
        //   value: 'Previous'
        // },
        {
          action: () => { handleSubmit(4) },
          value: 'Next'
        },
      ],
      status: stepForm[4]
    },
    {
      id: 5,
      title: 'What kind of issues do you have with online adverstising? (can choose many issues)',
      content: [
        {
          id: 1,
          value: 'Spending Issues',
          choosed: false,
          action: () => { handleChoice(5, 1) }
        },
        {
          id: 2,
          value: 'Payment method issues',
          choosed: false,
          action: () => { handleChoice(5, 2) }
        },
        {
          id: 3,
          value: 'Daily spend limit',
          choosed: false,
          action: () => { handleChoice(5, 3) }
        },
        {
          id: 4,
          value: 'Page restriction',
          choosed: false,
          action: () => { handleChoice(5, 4) }
        },
        {
          id: 5,
          value: 'Ad Account Restriction',
          choosed: false,
          action: () => { handleChoice(5,5) }
        },
        {
          id: 6,
          value: 'Restriction of the business account (Business Manager, Business Center...)',
          choosed: false,
          action: () => { handleChoice(5, 6) }
        },
        {
          id: 7,
          value: 'Facebook Profile Restriction',
          choosed: false,
          action: () => { handleChoice(5, 7) }
        },
        {
          id: 8,
          value: 'Other',
          choosed: false,
          action: () => { handleChoice(5, 8) }
        },
      ],
      actions: [
        // {
        //   action: () => { stepManager(4) },
        //   value: 'Previous'
        // },
        {
          action: () => { handleSubmit(5) },
          value: 'Next'
        },
      ],
      status: stepForm[5]
    },
    {
      id: 6,
      title: 'All is done!',
      content: [
        {
          id: 1,
          value: ' Acces to your private space now.',
          choosed: false,
        },
      ],
      actions: [
        {
          action: () => { stepManager(5) },
          value: 'Previous'
        }
      ],
      status: stepForm[6]
    },
  ]

  const handleSubmit = (question) => {
    console.log('submitting');
    let data = {
      one: choices[0],
      two: choices[1],
      three: choices[2],
      four: choices[3],
      five: choices[4],
      six: choices[5],
      seven: choices[6],
    }

    let dataTogo = {
      "number": choices[question],
      "question": question + 1,
      "client": Number(localStorage.getItem('userId'))
    }
    console.log(dataTogo);
    axios.post(`${import.meta.env.VITE_BASE_URL}/clients/reviews/`, dataTogo)
      .then(response => {
        console.log(response?.data);
        console.log(response?.data, 'data herer');
        stepManager(question + 1)
      })
      .catch(error => {
        console.log(error);
        console.log('error while posting reviews');
      })
    console.log(data, 'here are data')
  }
  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                 alt="Wenlo agency"
                 className="w-28 pt-6"
                 src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> {/*Tinker*/}</span>
              </a>
              <div className="my-auto">
                <img
                  alt="Wenlo"
                  className="-intro-x w-9/12 -mt-20"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight -mt-9">
                  Let's take a short survey
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Wenlo wants to know little more about you <br /> to offer you a tailor-made experience...
                  <p>Not intrested, you can <span onClick={()=>{
                            localStorage.setItem('skipped', false)
                            navigate('/update-profile')
                          }}
                          className="italic font-bold cursor-pointer underline">Skip -> </span>
                  </p>
                  </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="intro-x mt-2 text-xl text-white xl:hidden text-center">
            Let's take a short survey
            <p className="text-lg  text-slate-400">
                Wenlo wants to know little more about you <br /> to offer you a tailor-made experience...
            </p> <p>Not intrested, you can <span onClick={()=>{
                    localStorage.setItem('skipped', false)
                    navigate('/update-profile')
                    }}
                    className="italic font-bold cursor-pointer underline">Skip -> </span>
                  </p>
                </div>
              <MultiStepForm />

            {/* <div className="h-screen xl:h-auto xl:bg-none py-5 xl:py-0 my-10 xl:my-0 flex items-center bg-white dark:bg-transparent rounded-lg">
              {data.map(step => (
                <div key={step.id} className={`${stepForm[step.id]} mx-auto`}>
                  {console.log(step.title, 'conten')}
                  <div className='my-12 h-screen'>
                    <h3 className='xl:text-4xl text-xl text-center pt-2 font-bold text-primary'>{step.id + 1}/7. {step.title}</h3>
                    <div className={`${stepForm.indexOf('')<= 5? 'grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-12 ring' : 'w-[30rem] mx-auto'} m-12 overflow-auto rounded-lg max-h-[35rem] p-2`}>
                      {stepForm.indexOf('') <= 5 ? step?.content?.map(item => (
                        <div key={item.id}
                          className={`box intro-x col-span-1 text-white font-bold text-auto rounded-xl shadow hover:bg-primary/75 dark:hover:bg-primary/75 cursor-pointer bg-slate-400 dark:border-2 dark:border-slate-500 duration-300 ease-in-out p-3 min-h-20 max-h-32`}
                          onClick={(e) => {
                            e.target.className += ' bg-[#3E4C93] dark:bg-[#3E4C93]'
                            item.action()
                          }} >
                          {item.value}
                        </div>
                      )) : <div className="h-auto w-full rounded">
                              <div className="my-auto dark:text-slate-400 text-center">
                                <img
                                  alt="Wenlo"
                                  className="-intro-x w-full -mt-20" 
                                  src={done}
                                />
                                <div className="-intro-x font-medium text-4xl leading-tight mt-4">
                                  Thank you for providing this information
                                </div>
                                <div className="-intro-x mt-5 text-lg text-opacity-70">
                                  without further delay access your personal space
                                </div>
                            </div>
                      </div> }
                    </div>
                    <div className='grid grid-cols-2 gap-6 w-60 container'>
                      {step?.actions?.map(action => (
                        <div key={action.id} onClick={() => {
                          if (choices[step.id] && action.value === 'Next') {
                            action.action()
                          }
                          else if (action.value === 'Previous') {
                            action.action()
                          }
                        }} className={`col-span-1 px-4 py-6 rounded-xl shadow text-center font-bold ${(action?.action === null || (!choices[step.id] && action.value === 'Next')) ? 'cursor-not-allowed bg-slate-100 text-slate-500' : ' bg-primary text-white cursor-pointer'}`}>
                          {console.log(choices[step.id], 'choices[step.id] v hgkj')}
                          {action?.value}
                        </div>
                      ))}
                      {stepForm.indexOf('')>= 5 && <div 
                        onClick={()=>{
                          localStorage.setItem('skipped', false)
                          navigate('/update-profile')
                        }}
                        className="col-span-1 px-4 py-6 rounded-xl shadow text-center font-bold bg-primary text-white cursor-pointer">
                        Complete
                      </div>}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
