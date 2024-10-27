import AdminSidebar from "../Components/AdminSidebar";
import CompaniesAndStudents from "./CompaniesAndStudents";

function AdminStudentReg() {
    return (

        <div className="d-flex">
        <AdminSidebar />
        <div className="content p-4 flex-grow-1">
          <CompaniesAndStudents/>
        </div>
      </div>

      );
}

export default AdminStudentReg;