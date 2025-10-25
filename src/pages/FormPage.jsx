import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import toast from "react-hot-toast";
import IdVerificationSection from "../components/idVerificationSection";
import AgeSection from "../components/AgeSection";
import StartUpName from "../components/StartUpName";
import StartUpDescription from "../components/StartUpDescription";
import WebsiteLink from "../components/WebsiteLinkSection";
import FoundedYearSection from "../components/FoundedYearSection";
import NumberOfEmployees from "../components/NumberOfEmployees";
import UpdatableCategorySection from "../components/UpdatableCategorySection";
import WorkSection from "../components/WorkSection";
import PortfolioLinkSection from "../components/PortfolioLinkSection";
import CurrentStageSection from "../components/CurrentStageSection";
import DevelopmentStageSection from "../components/DevelopmentStageSection";
import FundingSection from "../components/FundingSection";
import InvestmentRangeSection from "../components/InvestmentRangeSection";
import RoadMapSection from "../components/RoadMapSection";

import Footer from "../components/layout/Footer";
import { useMemo } from "react";

const FormPage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
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

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  const isHeadline = authUser?.headline;

  const isSubmitDisabled = useMemo(() => {
    if (!authUser) return true;

    const valid = (val) => val !== "" && val !== null && val !== undefined;

    const commonFields = valid(authUser.age) && valid(authUser.about) && valid(authUser.idVerification);

    if (isHeadline === "Idea") {
      return !(
        commonFields &&
        valid(authUser.startUpName) &&
        valid(authUser.startUpDescription) &&
        valid(authUser.work) &&
        valid(authUser.category) &&
        valid(authUser.currentStage) 
        
      );
    }

    if (isHeadline === "Start-Up") {
      return !(
        commonFields &&
        valid(authUser.startUpName) &&
        valid(authUser.startUpDescription) &&
        valid(authUser.website) &&
        valid(authUser.foundedYear) &&
        valid(authUser.numberOfEmployees) &&
        valid(authUser.work) &&
        valid(authUser.category) &&
        valid(authUser.currentStage) &&
        valid(authUser.totalFunding) 
      );
    }

    if (isHeadline === "Investor") {
      return !(
        commonFields &&
        valid(authUser.startUpName) &&
        valid(authUser.portfolio) &&
        valid(authUser.category) &&
        valid(authUser.currentStage) &&
        valid(authUser.investmentRange)  
      );
    }

    return true;
  }, [authUser, isHeadline]);

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <ProfileHeader userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
      <div className="p-6">
        <h1 className="text-4xl text-center font-bold">Complete Your Profile</h1>
      </div>

      {authUser?.headline === "Idea" && (
        <>
          <AgeSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <AboutSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <IdVerificationSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <StartUpName userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <StartUpDescription userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <WorkSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <CategorySection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <DevelopmentStageSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <FundingSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <RoadMapSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
        </>
      )}

      {authUser?.headline === "Start-Up" && (
        <>
          <AgeSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <AboutSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <IdVerificationSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <StartUpName userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <StartUpDescription userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <WebsiteLink userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <FoundedYearSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <NumberOfEmployees userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <WorkSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <UpdatableCategorySection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <CurrentStageSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <FundingSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <RoadMapSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
        </>
      )}

      {authUser?.headline === "Investor" && (
        <>
          <AgeSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <AboutSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <IdVerificationSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <StartUpName userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <PortfolioLinkSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <InvestmentRangeSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <UpdatableCategorySection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <CurrentStageSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
          <RoadMapSection userData={authUser} isOwnProfile={authUser} onSave={handleSave} />
        </>
      )}

      <div className="text-center my-6">
        {isSubmitDisabled ? (
          <button
            className="btn bg-black text-white opacity-50 cursor-not-allowed"
            disabled
          >
            Submit
          </button>
        ) : (
          <Link to="/">
            <button
              className="btn bg-black text-white hover:bg-white hover:text-black"
              onClick={() => console.log("Form submitted")}
            >
              Submit
            </button>
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FormPage;
