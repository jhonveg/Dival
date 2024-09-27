import { useAuth } from "../../Context/authContext";
import CardUsers from "./TableUsers";

const UsersPage = ({ page, pagination, setPagination }) => {
  const { getUsers, allUsers } = useAuth();

  return (
    <div className="mt-20">
      <CardUsers users={allUsers} />
    </div>
  );
};

export default UsersPage;
