import UserProfile from "./UserProfile";
import Home from "./Home";

export default function Topbar({username}: {username: string}) {
  return (
      <div className="mb-4 flex justify-between">
        <Home></Home>
      <UserProfile username={username}></UserProfile>
      </div>
  );
}
