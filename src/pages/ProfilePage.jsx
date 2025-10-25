import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";
import IdVerificationSection from "../components/idVerificationSection";
import AgeSection from "../non-updatable-components/AgeSection";
import StartUpName from "../components/StartUpName";
import Description from "../non-updatable-components/Description";
import WebsiteLink from "../components/WebsiteLinkSection";
import FoundedYearSection from "../components/FoundedYearSection";
import NumberOfEmployees from "../components/NumberOfEmployees";
import CategorySection from "../non-updatable-components/CategorySection";
import UpdatableCategorySection from "../components/UpdatableCategorySection";
import WorkSection from "../components/WorkSection";
import PortfolioLinkSection from "../components/PortfolioLinkSection";
import CurrentStageSection from "../components/CurrentStageSection";
import DevelopmentStageSection from "../components/DevelopmentStageSection";
import FundingSection from "../components/FundingSection";
import InvestmentRangeSection from "../components/InvestmentRangeSection";
import RoadMapSection from "../components/RoadMapSection";
import PhoneNo from "../components/PhoneNo";

import { LogOut, Palette, Settings, UserX } from "lucide-react";
import Footer from "../components/layout/Footer";
import CreditSection from "../components/CreditSection";
import FundingStageSection from "../components/FundingStageSection";
import MultipleCategorySection from "../components/MultipleCategorySection";
import AddressSection from "../components/AddressSection";
import CompanyEmail from "../components/CompanyEmail";
import UserEmail from "../components/UserEmail";
import TypesSection from "../components/TypesSection";
import OfficialEmail from "../components/OfficialEmail";
import TotalInvested from "../components/TotalInvested";
import TotalCompaniesInvested from "../components/TotalCompaniesInvested";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const { mutate: deleteAccount } = useMutation({
    mutationFn: () => axiosInstance.delete("/users/delete"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["userProfile", username]);
    },
  });

  if (isLoading || isUserProfileLoading) return null;

  const isOwnProfile = authUser.username === userProfile.data.username;
  const userData = isOwnProfile ? authUser : userProfile.data;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />

      {/* Render editable sections if it's own profile */}
      {isOwnProfile && (
        <>
          {userData.headline === "Idea" && (
            <>
              <PhoneNo userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AddressSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <UserEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AgeSection userData={userData} isOwnProfile={isOwnProfile} />
              <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <IdVerificationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <Description userData={userData} isOwnProfile={isOwnProfile} />
              <CategorySection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <TypesSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <DevelopmentStageSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <RoadMapSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            </>
          )}

          {userData.headline === "Start-Up" && (
            <>
              <PhoneNo userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AddressSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <UserEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <CompanyEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />             
              <AgeSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <IdVerificationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <StartUpName userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <Description userData={userData} isOwnProfile={isOwnProfile} />
              <WebsiteLink userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <WorkSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <CategorySection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <TypesSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <FundingStageSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <FundingSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <RoadMapSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            </>
          )}

          {userData.headline === "Investor" && (
            <>
              <PhoneNo userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AddressSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <UserEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />           
              <AgeSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <IdVerificationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <MultipleCategorySection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <InvestmentRangeSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            </>
          )}

          {userData.headline === "Venture Capital Firm" && (
            <>
              <PhoneNo userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <AddressSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />           
              <AgeSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
               <UserEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <IdVerificationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <StartUpName userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <OfficialEmail userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave}/>
              <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <TypesSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <MultipleCategorySection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <FundingStageSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <InvestmentRangeSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <TotalInvested userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
              <TotalCompaniesInvested userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            </>
          )}
        </>
      )}
      {!isOwnProfile && (
        <div>
          {/* INSERT THE ENTIRE JSX BLOCK YOU PROVIDED HERE, with all `authUser` replaced with `userData` */}
          {!isOwnProfile && (
  <div>
    {/* ---------------------------------------------------------- */}
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-6 '>

      <div className="card bg-base-100  shadow-xl lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">About</h2>
          <p>{userData?.about || 'N/A'}</p>
        </div>
      </div> 

      {userData?.headline === "Start-Up" && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Start-Up Name</h2>
            <p>{userData?.startUpName || 'N/A'}</p>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Description</h2>
          <p>{userData?.startUpDescription || 'N/A'}</p>
        </div>
      </div>   

      {userData?.headline === "Start-Up" && (
        <>
          <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Our Website Link</h2>
              <p>{userData?.website || 'N/A'}</p>
            </div>
          </div> 
          <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Year Of Foundation</h2>
              <p>{userData?.foundedYear || 'N/A'}</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Number Of Employees Working</h2>
              <p>{userData?.numberOfEmployees || 'N/A'}</p>
            </div>
          </div>
        </>
      )}

      <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Category of our {userData?.headline || 'N/A'}</h2>
          <p>{userData?.category || 'N/A'}</p>
        </div>
      </div>

      {userData?.headline === "Investor" && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">My Portfolio</h2>
            <p>{userData?.portfolio || 'N/A'}</p>
          </div>
        </div>
      )}

      {(userData?.headline === "Investor" || userData?.headline === "Start-Up") && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Current Stage Of Our {userData?.headline || 'N/A'}</h2>
            <p>{userData?.currentStage || 'N/A'}</p>
          </div>
        </div>
      )}

      {userData?.headline === "Idea" && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Current Stage Of Our {userData?.headline || 'N/A'}</h2>
            <p>{userData?.currentStage || 'N/A'}</p>
          </div>
        </div>
      )}

      {userData?.headline === "Start-Up" && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Total Funding Of Our {userData?.headline || 'N/A'}</h2>
            <p>{userData?.totalFunding || 'N/A'}</p>
          </div>
        </div>
      )}

      {userData?.headline === "Investor" && (
        <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Investment Range {userData?.headline || 'N/A'}</h2>
            <p>{userData?.investmentRange || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>

    <hr className='mt-6 p-2'/>


{(userData?.headline === "Idea" || userData?.headline === "Start-Up") && (
  <>
    <div className='items-center justify-center flex pt-10 pb-10'>
      <h1 className='font-bold text-4xl'>Road-Map</h1>
    </div>



    <div className='flex justify-center items-center w-full min-h-screen'>
      {userData?.Roadmap && userData.Roadmap.length > 0 ? (
        /* Roadmap rendering block (make sure to replace `authUser` with `userData` here too) */
        // You can paste your roadmap JSX here with the same change (replace all `authUser` -> `userData`)
        <div className='text-center font-bold text-2xl'>
          {authUser?.Roadmap && authUser.Roadmap.length > 0 ? (
  <div className='bg-[#FBF5E2] card-body shadow-2xl rounded-lg border-2'>
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
  <h1 className="text-2xl font-semibold text-red-600">No data found</h1>
)}


        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-red-600">No datas are found</h1>
      )}
    </div>

    </>
      )}

    <hr className='mt-6 p-2'/>

    <div className='content-center text-center p-4'>
      <h1 className='text-2xl font-bold'>Events</h1>
    </div>

    <Footer />
  </div>
)}

          {/* It's omitted for brevity, but you can safely paste the structure you shared in the earlier message */}
        </div>
      )}

      {/* Settings & Actions (only for own profile) */}
      {isOwnProfile && (
        <>
          <div className="flex justify-center m-4">
            <Link to="/settings" className="btn gap-2 transition-colors">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </Link>
          </div>

          <div className="flex justify-center m-4">
            <button
              className="btn text-red-500 hover:text-red-900 m-2"
              onClick={() => document.getElementById('my_modal_5').showModal()}
            >
              <UserX size={20} className="cursor-pointer" />
              Account Deletion
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Account Deletion!</h3>
                <p className="py-4">Are you sure want to delete your account?</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className='btn text-red-500 hover:text-red-900 m-2'
                      onClick={() => deleteAccount()}
                    >
                      <span className='hidden md:inline cursor-pointer'>Confirm</span>
                    </button>
                    <button className="btn m-2">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <div className="lg:ml-[800px] m-4">
            <button
              className='flex items-center space-x-1 text-sm text-red-500 hover:text-red-900'
              onClick={() => logout()}
            >
              <LogOut size={20} className="cursor-pointer" />
              <span className='hidden md:inline cursor-pointer'>Logout</span>
            </button>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
