import React from "react";
import { Users } from "lucide-react";
import SearchUsersSection from "../components/SearchUsersSection";
import Footer from "../components/layout/Footer";

const SearchPage = () => {
  return (
    <div>
      <div className="content-center">
        <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
          <SearchUsersSection />
        </div>
      </div>
      <div className="p-18"></div>
      <Footer />
    </div>
  );
};

export default SearchPage;
