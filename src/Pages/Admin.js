import AdminSidebar from "../Components/AdminSidebar";
import ManageCompanies from "./ManageCompanies";

function Admin() {
    return (
      <div className="d-flex">
      <AdminSidebar />
      <div className="content p-4 flex-grow-1">
        <ManageCompanies/>
      </div>
    </div>
      );
}

export default Admin;