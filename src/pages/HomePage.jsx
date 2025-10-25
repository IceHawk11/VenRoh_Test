import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });

  if (isLoading) return <div>Loading...</div>;

  // console.log("authUser:", authUser); // Debug log :(
  
  console.log(authUser?.credit);

  return (
    <div>



{/* ---------------------------------------------------------- */}
 
 <div className='grid grid-cols-1 lg:grid-cols-6 gap-6 '>

      {/* <div className='col-span-1 lg:col-span-2 h-[200px]'> */}
      <div className="card bg-base-100  shadow-xl lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">About</h2>
          <p>{authUser?.about || 'N/A'}</p>
        </div>
      </div> 
      {/* </div>    */}

      {authUser?.headline === "Start-Up" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Start-Up Name</h2>
          <p>{authUser?.startUpName || 'N/A'}</p>
        </div>
      </div> 
      )}

      {/* {authUser?.headline === "Investor" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Organization Name</h2>
          <p>{authUser?.startUpName || 'N/A'}</p>
        </div>
      </div> 
      )}  */}

      {/* {authUser?.headline === "Investor" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Idea Title</h2>
          <p>{authUser?.startUpName || 'N/A'}</p>
        </div>
      </div> 
      )}  */}

      {/* for all */}
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Description</h2>
          <p>{authUser?.startUpDescription || 'N/A'}</p>
        </div>
      </div>   

      {authUser?.headline === "Start-Up" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Our Website Link</h2>
          <p>{authUser?.website || 'N/A'}</p>
        </div>
      </div> 
      )}    

      {authUser?.headline === "Start-Up" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Year Of Foundation</h2>
          <p>{authUser?.foundedYear || 'N/A'}</p>
        </div>
      </div>   
      )}  

      {authUser?.headline === "Start-Up" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Number Of Employees Working</h2>
          <p>{authUser?.numberOfEmployees || 'N/A'}</p>
        </div>
      </div> 
      )}

      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Category of our {authUser?.headline || 'N/A'}</h2>
          <p>{authUser?.category || 'N/A'}</p>
        </div>
      </div>    

      {(authUser?.headline === "Investor" || authUser?.headline === "Start-Up") &&(
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Current Stage Of Our {authUser?.headline || 'N/A'}</h2>
          <p>{authUser?.currentStage || 'N/A'}</p>
        </div>
      </div>  
      )}

      {authUser?.headline === "Idea" &&(
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Current Stage Of Our {authUser?.headline || 'N/A'}</h2>
          <p>{authUser?.currentStage || 'N/A'}</p>
        </div>
      </div>  
      )}

      {authUser?.headline === "Start-Up" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Total Funding Of Our {authUser?.headline || 'N/A'}</h2>
          <p>{authUser?.totalFunding || 'N/A'}</p>
        </div>
      </div> 
      )}

      {authUser?.headline === "Investor" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Investment Range Of Our {authUser?.headline || 'N/A'}</h2>
          <p>{authUser?.investmentRange || 'N/A'}</p>
        </div>
      </div> 
      )}     
      {authUser?.headline === "Venture Capital Firm" && (
      <div className="card bg-base-100  shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Total Investment</h2>
          <p>{authUser?.totalInvestment || 'N/A'}</p>
        </div>
      </div> 
      )}     
{authUser?.headline === "Venture Capital Firm" && (
  <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
    <div className="card-body">
      <h2 className="card-title">Total Companies Invested</h2>
      {authUser?.companiesInvested && authUser.companiesInvested.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {authUser.companiesInvested.map((company, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {company}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No companies specified</p>
      )}
    </div>
  </div>
)}   
    </div>


<hr className='mt-6 p-2'/>


{(authUser?.headline === "Idea" || authUser?.headline === "Start-Up") && (
  <>
  <div className='items-center justify-center flex pt-10 pb-10'>
    <h1 className='font-bold text-4xl'>Road-Map</h1>
  </div>
<div className='flex justify-center items-center w-full min-h-screen'>


  {authUser?.Roadmap && authUser.Roadmap.length > 0 ? (
    <div className='bg-[#FBF5E2] card-body shadow-2xl rounded-lg  border-2 '>
      <ul className="timeline items-center justify-center min-h-screen">
        {/* Year 1 */}
        <li>
          <div tabIndex={0} className="timeline-start collapse w-[150px]">
            <button className="btn border-gray-500 rounded-md border-2" onClick={() => document.getElementById('my_modal_1').showModal()}>Year-1</button>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Year-1</h3>
                <p className="py-4">{authUser.Roadmap[0]?.year1 || 'N/A'}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <hr />
        </li>

        {/* Year 2 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div tabIndex={0} className="timeline-end collapse w-[150px]">
            <button className="btn border-gray-500 rounded-md border-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Year-2</button>
            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Year-2</h3>
                <p className="py-4">{authUser.Roadmap[0]?.year2 || 'N/A'}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <hr />
        </li>

        {/* Year 3 */}
        <li>
          <hr />
          <div tabIndex={0} className="timeline-start collapse w-[150px]">
            <button className="btn border-gray-500 border-2 rounded-md" onClick={() => document.getElementById('my_modal_3').showModal()}>Year-3</button>
            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Year-3</h3>
                <p className="py-4">{authUser.Roadmap[0]?.year3 || 'N/A'}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <hr />
        </li>

        {/* Year 4 */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div tabIndex={0} className="timeline-end collapse w-[150px]">
            <button className="btn border-gray-500 border-2 rounded-md" onClick={() => document.getElementById('my_modal_4').showModal()}>Year-4</button>
            <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Year-4</h3>
                <p className="py-4">{authUser.Roadmap[0]?.year4 || 'N/A'}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <hr />
        </li>

        {/* Year 5 */}
        <li>
          <hr />
          <div tabIndex={0} className="timeline-start collapse w-[150px]">
            <button className="btn border-gray-500 border-2 rounded-md" onClick={() => document.getElementById('my_modal_5').showModal()}>Year-5</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Year-5</h3>
                <p className="py-4">{authUser.Roadmap[0]?.year5 || 'N/A'}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <div className="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  ) : (
    <h1 className="text-2xl font-semibold text-red-600">No datas are found</h1>
  )}
</div>
</>
)}

{authUser?.headline === "Investor" && (
  <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
    <div className="card-body">
      <h2 className="card-title justify-center content-center">My Portfolio</h2>
      <p><span className='font-bold'>Link:</span>
        <a
          href={authUser.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {authUser?.portfolio || 'N/A'}
        </a>
      </p>
    </div>
  </div>
)}
{authUser?.headline === "Venture Capital Firm" && (
  <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
    <div className="card-body">
      <h2 className="card-title justify-center content-center">My Portfolio</h2>
      <p><span className='font-bold'>Link:</span>
        <a
          href={authUser.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {authUser?.portfolio || 'N/A'}
        </a>
      </p>
    </div>
  </div>
)}


<hr className='mt-6 p-2'/>

    <div className='content-center text-center p-4'>
      <h1 className='text-2xl font-bold'>
        Events
      </h1>
    </div>

    <Footer/>
    </div>
  );
};

export default HomePage;
