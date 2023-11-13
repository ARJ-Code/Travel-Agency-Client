import { Navigate, Route, Routes } from "react-router-dom";
import OffersAgency from "../pages/agency/OffersAgency";
import PackagesAgency from "../pages/agency/PackagesAgency";
import TicketAgency from "../pages/agency/TicketAgency";
import UsersAgency from "../pages/agency/UsersAgency";

const AgencyRoute = () => (
  <Routes>
    <Route path="/offer" element={<OffersAgency />}></Route>
    <Route path="/package" element={<PackagesAgency />}></Route>
    <Route path="/ticket" element={<TicketAgency />}></Route>
    <Route path="/users" element={<UsersAgency />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default AgencyRoute;