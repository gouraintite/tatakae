import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../components/validation';
import TimezoneSelect from 'react-timezone-select'
import {
  Lucide,
  Alert,
  LoadingIcon,
  TomSelect,
  Modal,
  ModalBody,
} from "@/base-components";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BusinessManager from './business_manager_form'
import { post_sharing_service } from '../../../sharing/service/share.service';
import axiosInstance from '../../../../../config/axios';

function Main() {

  let navigate = useNavigate();
  const [select, setSelect] = useState("1");
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([])
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(['', 'hidden', 'hidden', 'hidden', 'hidden']);
  const [timezone, setTimezone] = useState([])
  const [largeModalSizePreview, setLargeModalSizePreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file1: '',
    file2: '',
    imagePreviewUrl1: '',
    imagePreviewUrl2: ''
  });
 
  useEffect(() => {
    getData();
  }, [count, largeModalSizePreview]);

  const getData = () => {
    axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/bussiness-manager/?id=&client__id=${Number(localStorage.getItem('userId'))}&platform=facebook`)
      .then(response => {
        setData(response.data.results)
        console.log(data, 'data here')
        setSelect(response?.data?.count)

      } 
      ).catch(err => {
        console.log(err.data, 'error eget')
        setErrMsg(err.data)
      })
  }

  if (count < 1) {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    console.log(data, 'from count')
  }

  const [managerLink, setManagerLink] = useState('to copy link')
  const [copySuccess, setCopySuccess] = useState('Copy');

  const stepManager = (position) => {
    let newArray = [...step];
    for (let i = 0; i < step.length; i++) {
      if (i !== position) {
        newArray[i] = 'hidden'
      }
      else {
        newArray[i] = ''
      }
    }
    setStep(newArray);
    console.log(step, 'tep here now')
  }

  const copyManager = () => {
    if (copySuccess === 'Copy') {
      setCopySuccess('Copied ✔️');
      setTimeout(() => {
        setCopySuccess('Copy')
      }, 3000)
    }
  }

  const handleImageChange1 = (e) => {
    e.preventDefault();

    let reader1 = new FileReader();
    let file = e.target.files[0];

    reader1.onloadend = () => {
      setSelectedFile({
        file1: file,
        imagePreviewUrl1: reader1.result
      });
    }
    reader1.readAsDataURL(file)
  }

  const handleImageChange2 = (e) => {
    e.preventDefault();

    let reader2 = new FileReader();
    let file = e.target.files[1];

    reader2.onloadend = () => {
      setSelectedFile({
        file2: file,
        imagePreviewUrl2: reader2.result
      });
    }

    reader2.readAsDataURL(file)
  }

  const initialValues = {
    accountName: "",
    domain: "",
    pageId1: "",
    link1: "",
    pageId2: null,
    link2: "",
    pageId3: null,
    link3: ""
  };

  const handleSubmitBody = async (IdRequest, values) => {
    console.log(values, 'values here')
    console.log('is loading before req', isLoading)
    console.log(values, 'values here')

    const dataToGo = {
      "request": IdRequest,
      "name": values.accountName,
      "timezone": timezone.label,
      "domain": values.domain,
      "platform": "facebook",
      "description": values.description,
      "page_id1": values.pageId1,
      "page_link1": values.link1,
      "page_id2": (values.pageId2 || null),
      "page_link2": values.link2,
      "page_id3": (values.pageId3 || null),
      "page_link3": values.link3,
      "image1": selectedFile.file1
    }

    axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/accounts-requests/`, dataToGo, {
      headers: {
        'accept': 'application/json',
        'Content-Type': `multipart/form-data;`,
      }})
      .then(response => {
        handleShare(response?.data?.id)
      })
      .catch(err => {
        let error = err?.response?.data

      })
  }

  const handleSubmit = (values) => {
    console.log(values, 'values here')
    setIsLoading(<LoadingIcon icon="ball-triangle" className="w-6 h-6 ml-4" />)

      const dataToGo = {
        "type": "ad",
        "client": Number(localStorage.getItem('userId'))
      }
    
    console.log(dataToGo, 'dataToGo')

    axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/requests/`, dataToGo  )
      .then(response => {
        handleSubmitBody(response?.data?.id, values)
      })
      .catch(err => {
        let error = err?.response?.data
        setErrMsg(error)
      })
  }

  const handleShare = (account_id) => {

    let data = {
      "request": {
        "type": "shr",
        "client": Number(localStorage.getItem('userId'))   
      },
      business_manager: select,
      account: account_id,
    }

    console.log(data, 'values here')

    post_sharing_service(data)
      .then(response => {
        navigate(-1);
      })
      .catch(err => {
        console.log(err.response, "error content")
        setErrMsg(err.message)
      })
  }
  const items =[
    {id: 0}
  ]
  const [pages, setPages] = useState(items)


  return (
    <>
      <div className="h-auto mx-auto py-5 my-10 xl:my-0 xl:w-9/12">
        <div className="intro-y sm:py-20 mt-4 py-0 w-8/12 sm:w-11/12 mx-auto rounded-lg bg-white dark:bg-transparent dark:border">
          <div className="pb-6 text-2xl font-semibold mx-auto text-center">
            <Lucide
              icon="Facebook"
              className="w-16 h-16 text-primary mx-auto mb-2"
            />
            <p>Facebook Ad account application</p>
          </div>
          <div className="relative before:hidden before:lg:block before:absolute before:w-[60%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-200 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
              <button className="w-10 h-10 rounded-full btn btn-primary">
                1
              </button>
              <div className=" font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
                Ad account details
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button className={` w-10 h-10 rounded-full btn ${step[1] === '' || step[2] === '' || step[3] === '' || step[4] === '' ? ' btn-primary text-white ' : 'text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400'}`}>
                2
              </button>
              <div className=" text-base lg:mt-3 ml-3 lg:mx-auto text-slate-500">
                Page details
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button className={` w-10 h-10 rounded-full btn ${step[2] === '' || step[3] === '' || step[4] === '' ? ' btn-primary text-white ' : 'text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400'}`}>
                3
              </button>
              <div className=" text-base lg:mt-3 ml-3 lg:mx-auto text-slate-500">
                Business Manager
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button className={` w-10 h-10 rounded-full btn ${step[3] === '' || step[4] === '' ? ' btn-primary text-white ' : 'text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400'}`}>
                4
              </button>
              <div className=" text-base lg:mt-3 ml-3 lg:mx-auto text-slate-500">
                Finalise request
              </div>
            </div>
          </div>
          {errMsg ? <Error content={errMsg} /> : null}
          <div className="first sm:px-20 mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <div className="">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >

                {({errors}) => (
                  <Form className='h-auto'>
                    {errMsg ? <Error content={errMsg} /> : null}
                    <div className='my-1 error'>
                      <ErrorMessage
                        name="accountName"
                        component="small"
                        className="text-red-500"
                      /> &nbsp;
                      <ErrorMessage
                        name="timezone"
                        component="small"
                        className="text-red-500"
                      /> &nbsp;
                      <ErrorMessage
                        name="domain"
                        component="small"
                        className="text-red-500"
                      /> &nbsp;
                      <ErrorMessage
                        name="pageId1"
                        component="small"
                        className="text-red-500"
                      /> &nbsp;
                      <ErrorMessage
                        name="link1"
                        component="small"
                        className="text-red-500"
                      />
                    </div>
                    <div className={` ${step[0]}`}>
                      <h2 className="intro-x text-2xl xl:text-2xl text-center xl:text-left w-90">
                        Ad account details
                      </h2>
                      <div className="intro-x mt-2 text-slate-500 text-justify">
                        Enter your advertising account details
                      </div>
                      <div className="intro-x mt-4">
                        <div>
                          <label
                            className=" select-none text-md"
                          >
                            Ad account name <span className="text-red-500 text-lg">*</span>
                          </label>
                          <div>
                            <Field
                              type="text"
                              id="accountName"
                              name="accountName"
                              className="intro-x login__input form-control py-4 px-4 block pl-2 my-2"
                            />
                            <ErrorMessage
                              name="accountName"
                              component="small"
                              className="text-red-500"
                            />
                          </div>
                        </div>
                        <div className="my-6">
                          <label
                            className=" select-none text-md"
                          >
                            Time zone <span className="text-red-500 text-lg">*</span>
                          </label>
                          <div>
                            <TimezoneSelect
                              value={timezone}
                              labelStyle="abbrev"
                              onChange={setTimezone}
                              className="intro-x login__input form-control block my-2 border text-black"
                              styles={{
                                control: (baseStyles) => ({
                                  ...baseStyles,
                                  border: 0,
                                  padding: 7,
                                  backgroundColor: '',
                                }),
                              }}
                              placeholder='select your current time zone'
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            className="select-none text-md"
                          >
                            Domain / Url <span className="text-red-500 text-lg">*</span>
                          </label>
                          <div>
                            <Field
                              type="text"
                              id="domain"
                              name="domain"
                              className="login__input form-control py-4 px-4 pl-2 my-2"
                            />
                            <ErrorMessage
                              name="domain"
                              component="small"
                              className="text-red-500"
                            />
                          </div>
                        </div>
                        <div className={`flex pt-6 text-center xl:text-left`}>
                          <p className="btn cur py-3 px-4 w-auto xl:mr-4 align-top cursor-not-allowed">
                            Previous page
                          </p>
                          <p className="btn btn-primary py-3 px-4 w-auto mx-6 align-top"
                            onClick={() => stepManager(1)}>
                            Next page
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`${step[1]}`}>
                      <h2 className="intro-x text-2xl xl:text-2xl text-center xl:text-left">
                        Facebook page details
                      </h2>
                      <div className="intro-x mt-2 text-slate-500 text-justify leading-normal">
                        <p className="py-1">Pages submitted for review must conform to all our requirements or they will be rejected.</p>
                        <p className="py-1"> <span className="font-bold">Facebook Page's Requirements</span> : Cover photo - Profile photo - Phone number - Email address -
                          Location <br /> - Website - Detailed description of your products and services -
                          Page category relevant to your business <br /> - At least 03 to 05 Posts (Image + Link + Text) on the page
                        </p>
                        <p className="py-1"> <span className="font-bold">Important</span> : Once the
                          ad account has been approved and created, it will no longer be possible <br /> to use
                          additional pages on the ad account.
                        </p>
                      </div>
                      <div className="intro-x mt-4">
                      <p className='italic mb-1 text-orange-400'>Page IDs should be intergers</p>

                        {/* =============================page links here================================== */}
                        {pages.map(item=>(
                        <div key={item.id} className={`intro-x p-5 rounded-lg border-2 mt-3`}>
                    
                        <div>
                          <label
                            className=" select-none text-md"
                          >
                            Page ID {item.id + 1}
                          </label>
                          <div>
                            <Field
                              type="number"
                              id={`pageId${item.id + 1}`}
                              name={`pageId${item.id + 1}`}
                              className="intro-x login__input form-control py-4 px-4 block pl-2 my-2"
                            />
                            <ErrorMessage
                              name={`pageId${item.id + 1}`}
                              component="small"
                              className="text-red-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            className=" select-none text-md"
                          >
                            Facebook Page Link {item.id + 1}
                          </label>
                          <div>
                            <Field
                              type="text"
                              id={`link${item.id + 1}`}
                              name={`link${item.id + 1}`}
                              className="intro-x login__input form-control py-4 px-4 block pl-2 my-2"
                            />
                          </div>
                        </div>
                        {item.id > 0 && <div className="intro-x mt-2 text-center xl:text-left">
                          <button className="btn btn-danger py-2 px-4 w-auto xl:mr-3 align-top"
                            onClick={() => setPages(
                              pages.filter(page=>
                                page.id !== item.id)
                            )}>
                            remove
                          </button>
                        </div>}
                      </div>
                        ))}
                        <div className={`${pages.length === 3 ? 'hidden' : ''} intro-x mt-2 text-center xl:text-left`}>
                          <p className="btn btn-primary py-2 px-3 w-auto xl:mr-3 align-top"
                            onClick={() => {
                              setPages([...pages, {id: pages.length}])
                            }}>
                            Add a new page
                          </p>
                        </div>
                        <div className='mt-3' >
                          <label
                            className=" select-none text-md"
                          >
                            <p className='font-bold'>Assign this Facebook profile below as administrator of each page you submit. After review this profile can be removed.</p>
                            <p>I confirm that I have assigned this Facebook profile <a href="https://web.facebook.com/Dave.millicent.111">Page reviewer</a> as administrator of the above page(s)</p>
                          </label>
                          <div>
                            <div className="intro-x rounded-full bg-blue-100 py-3 px-12 pl-2 my-6 flex justify-between intro-x login__input form-control">
                              <p className='mx-4' >{managerLink}</p>
                              <p className='text-md cursor-pointer'
                                onClick={() => {
                                  navigator.clipboard.writeText(managerLink)
                                  copyManager()
                                }}>
                                {copySuccess}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`flex intro-x mt-6 text-center xl:text-left`}>
                          <p className="btn btn-primary py-3 px-4 w-auto mr-3 align-top"
                            onClick={() => stepManager(0)}>
                            Previous page
                          </p>
                          <p className="btn btn-primary py-3 px-4 w-auto mx-3 align-top"
                            onClick={() => stepManager(2)}>
                            Next page
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`${step[2]}`}>
                      <div className='border rounded-md p-4'>
                        <h2 className="intro-x text-2xl xl:text-2xl text-center xl:text-left">
                          Business manager details
                        </h2>
                        <div className="intro-x mt-2 text-slate-500 text-justify">
                          Choose an business manager the one to who your ad
                          account will be sent.
                        </div>
                        <div className="intro-x mt-4">
                          <div>
                            <label
                              className="select-none text-md"
                            >
                              Choose a business manager <span className="text-red-500 text-lg">*</span>
                            </label>
                            <div className=''>
                              <div className="mt-2">
                                <TomSelect
                                  value={select}
                                  inputClass="p-4"
                                  onChange={setSelect}
                                  maxOptions={null}
                                  options={{
                                    placeholder: "Select your favorite Business account"
                                  }}
                                >
                                  {data.sort((a, b) => a.id < b.id ? 1 : -1).map(item => (
                                    <option key={item.id} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </TomSelect>
                              </div>
                            </div>
                            <p className='my-6 text-lg'>or</p>
                            <p
                              onClick={() => {
                                setLargeModalSizePreview(true);
                              }}
                              className="btn btn-primary w-auto">
                              Add a new business manager
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`flex mt-12 text-center xl:text-left`}>
                        <p className="btn btn-primary py-3 px-4 w-auto mr-3 align-top"
                          onClick={() => stepManager(1)}>
                          Previous page
                        </p>
                        <p className="btn btn-primary py-3 px-4 w-auto mx-3 align-top"
                          onClick={() => stepManager(3)}>
                          Next page
                        </p>
                      </div>
                    </div>
                    <div className={` ${step[3]}`}>
                      <h2 className="intro-x text-2xl xl:text-2xl text-center xl:text-left">
                        Confirmation of domain ownership
                      </h2>
                      <div className="intro-x mt-6 text-slate-600 text-justify">
                        <p className='my-2 text-slate-500'>
                          Import a screenshot that proves that you own the domains or promotion links. Acceptable images are :
                        </p>
                        <p className="ml-6 text-slate-500">
                          <li>Screenshot of your Shopify dashboard at the domain panel</li>
                          <li>Screenshot from your web host's control panel (The domain must be visible)</li>
                          <li>WordPress and any other website builder can be valid if you make your domain name visible on your screenshot.
                          </li>
                        </p>
                        {/* <input type="file" multiple accept="image/*" onChange={onImageChange} /> */}
                        <h3 className='text-slate-500 my-6 font-bold text-md'>Backend Screenshot</h3>
                        <div class="flex space-x-6 mt-5 border rounded-lg justify-around my-3 w-10/12">
                          <div className='items-center p-3 py-9 rounded' >
                            {selectedFile.imagePreviewUrl1 ?
                              <div class="shrink-0 border p-1 bg-blue-50 rounded-lg h-32 w-40">
                                <img class="h-28 w-36 mx-auto mt-1 object-cover rounded" src={selectedFile.imagePreviewUrl1} alt="No image yet selected" />
                              </div> : <Lucide icon="Image" className="w-40 h-32 text-slate-500" />}
                            <label class="block">
                              <span class="sr-only">Choose profile photo</span>
                              <input type="file" multiple
                                onChange={(event) => { handleImageChange1(event) }}
                                className="block w-40 mt-4 text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-1
                              file:rounded file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-100 file:text-blue-600
                              hover:file:bg-blue-200 file:w-60  
                              file:login__input file:form-control   
                        " />
                            </label>
                          </div>
                          {/* <div className='border p-3 rounded ' >
                          {selectedFile.imagePreviewUrl2 ?
                            <div class="shrink-0 border p-1 bg-blue-50 rounded-lg h-32 w-40">
                              <img class="h-28 w-36 mx-auto mt-1 object-cover rounded" src={selectedFile.imagePreviewUrl2} alt="No image yet selected" />
                            </div> : <Lucide icon="Image" className="w-40 h-32 text-slate-300" />}
                          <label class="block">
                            <span class="sr-only">Choose profile photo</span>
                            <input type="file" multiple
                              onChange={(event) => { handleImageChange2(event) }}
                              className="block w-40 mt-4 text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-1
                              file:rounded file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-100 file:text-blue-600
                              hover:file:bg-blue-200 file:w-40
                        "/>
                          </label>
                        </div> */}
                        </div>
                      </div>
                      <div>

                      </div>
                      <div className='flex intro-x mt-6 text-center xl:text-left'>
                        <p className="btn btn-primary py-3 px-4 w-auto mr-3 align-top"
                          onClick={() => stepManager(2)}>
                          Previous page
                        </p>
                        <button 
                          type='submit'
                          disabled={Object.keys(errors).length > 0}
                          className="btn btn-primary py-3 px-4 w-auto xl:mr-3 align-top mx-3">
                          Submit {isLoading}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        {/* END: Wizard Layout */}
        {/* BEGIN: Delete Confirmation Modal -*/}
        <Modal
          show={largeModalSizePreview}
          onHidden={() => {
            setLargeModalSizePreview(false);
          }}
        >
          <ModalBody>
            <BusinessManager afterAction={(status) => {
              status === 201 ? setLargeModalSizePreview(false) : null
            }} bmClass={true} />
          </ModalBody>
        </Modal>
        {/* END: Delete Confirmation Modal -*/}
      </div>
    </>
  );
}

export default Main;


export function Error({ content }) {

  return (
    <Alert className="alert-danger flex items-center mb-2 mx-6 mt-3">
      {({ dismiss }) => (
        <>
          <Lucide
            icon="AlertOctagon"
            className="w-6 h-6 mr-2"
          />{" "}
          {content}
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
