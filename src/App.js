import React, { Component } from "react";
import Signup from "./Pages/auth/SignUp";
import Signin from "./Pages/auth/SignIn";
import Reset from "./Pages/auth/Reset";
import ResetPaasword from "./Pages/auth/ResetPaasword";
import Dashboard from "./Pages/Dashboard";
import Confirmation from "./Pages/auth/Confirmation";
import Startup from "./Pages/setup/Startup";
import AppConfiguation from "./Pages/appConfiguration";
import AccountOwner from "./Pages/appConfiguration/AccountOwner";
import PrimarySetUp from "./Pages/appConfiguration/PrimarySetUp";
import LanguageCurrency from "./Pages/appConfiguration/LanguageCurrency";
import MemberInvitation from "./Pages/member/MemberInvitation";
import Member from "./Pages/member";
import TeamMember from "./Pages/member/TeamMember";
import Location from "./Pages/location/Location";
import Category from "./Pages/category/Category";
import Positions from "./Pages/positions/Positions";
import HireType from "./Pages/hireType/HireType";
import JobAdd from "./Pages/job/JobAdd";
import Department from "./Pages/department/Department";
import TaxLabel from "./Pages/taxLabels/TaxLabel";
import JobList from "./Pages/job/JobList";
import JobView from "./Pages/job/JobView";
import JobEdit from "./Pages/job/JobEdit";
import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  
  render() {
    
    return (
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset/:slug" element={<ResetPaasword />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/start-up" element={<Startup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/app-configuration" element={<AppConfiguation />} />
          <Route path="/account-owner" element={<AccountOwner />} />
          <Route path="/primary-setup" element={<PrimarySetUp />} />
          <Route path="/language-currency" element={<LanguageCurrency />} />
          <Route path="/member" element={<Member />} />
          <Route path="/team-member/:id" element={<TeamMember />} />
          <Route path="/member/:token" element={<MemberInvitation />} />
          <Route path="/location" element={<Location />} />
          <Route path="/category" element={<Category />} />
          <Route path="/position" element={<Positions />} />
          <Route path="/hiretype" element={<HireType />} />
          <Route path="/add-job" element={<JobAdd />} />
          <Route path="/list-job" element={<JobList />} />
          <Route path="/edit-job/:id" element={<JobEdit />} />
            <Route path="/view-job/:id" element={<JobView />} />
          <Route path="/department" element={<Department />} />
          <Route path="/tax-label" element={<TaxLabel />} />
         
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </div>
    );
  }
}
