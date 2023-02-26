import React, { useState, useEffect } from "react";
import { Requests } from "../../utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
export default function Dashboard() {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleRefresh = async (e) => {
    const userInfo = await localStorage.getItem("userinfo");
    console.log(userInfo);
    const id = await localStorage.getItem("userId");
    console.log(id);
    setLoading(true);
    const obj = { id };
    Requests.getAllForms(obj, userInfo)
      .then((res) => {
        if (res.data.length > 0) {
          toast.success("Forms fetched successfully");
        }
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        setLoading(false);
      });
    e.preventDefault();
  };
  const formId = localStorage.getItem('formId')
  const handleGetClaimAmount = async (e) => {
    Requests.estimateClaim(formId).then((res) => {
      toast.success("Value Estimated");
      console.log(res.data);
      setLoading(false);
    })
    .catch((err) => {
      toast.error(err);
      setLoading(false);
      console.log(err);
    });;
  };
  useEffect(() => {
    setLoading(true);
    handleRefresh();
    setLoading(false);
  
  }, []);
  
  if(loading){
    return <Spinner/>
  }
  return (
    <>
      
      <ToastContainer />
      <header className="text-3xl flex items-center justify-center leading-tight p-2 md:p-4">
      <h1 className="text-3xl pt-10  ">
        <p
          className="text-3xl underline hover:underline text-black"
          href="#"
        >
          Insurance Claim form filled
        </p>
      </h1>
      </header>
      <div className="container my-20 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {formData.length > 0 ? (
            <>
              {formData.map((data) => {
                return (
                  <>
                    {/* Column */}
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                      {/* Article */}
                      <article className="overflow-hidden rounded-lg shadow-2xl">
                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                          <h1 className="text-lg pt-10">
                            <p
                              className="text-xl underline hover:underline text-black"
                              href="#"
                            >
                              INSURANCE CLAIM FORM FILLED ON {data.createdAt}
                              {console.log(formData)}

                            </p>
                          </h1>
                        </header>
                        <div className="flex items-baseline justify-center py-3">
                          <Link
                            className="text-xl p-3 px-10 text-black font-semibold border border-transparent rounded-xl bg-blue400 transition-all duration-300 hover:text-black hover:border-blue400 hover:bg-blue400/10"
                            type="button"
                            to="/viewform" state={{ formid: data._id }}
                          >
                            View Form Details and Claim amount
                          </Link>
                        </div>

                
                      </article>
                      {/* END Article */}
                    </div>
                    {/* END Column */}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <h1 className="text-lg pt-10">
                <p className="text-3xl  text-black">
                  You haven't Filled any form yet Go here To get your insurance
                  claim amount
                  <Link to="/form" className="hover:underline text-light_blue">   Click here </Link>
                </p>
              </h1>
            </>
          )}
        </div>
      </div>

     
    </>
  );
}