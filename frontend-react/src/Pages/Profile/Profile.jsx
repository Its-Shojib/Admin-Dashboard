import { useLoaderData } from "react-router-dom";
import cover from '../../assets/coverPage.png'
import dp from '../../assets/cover.jpg'
const Profile = () => {
  let data = useLoaderData();
  const userRoles = {
    1: "Admin",
    0: "User",
  };

  return (
    <div className="profile-page w-full md:w-8/12 mx-auto my-10">
      {/* Cover Section */}
      <div className="relative bg-gray-200 h-48 md:h-60">
        <img
          src={cover} // Static cover image URL
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={dp} // Static profile image URL
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="mt-20 bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{data.user.name}</h2>
        <p className="text-gray-600">{data.user.email}</p>
        <p className="mt-2 text-teal-600 font-medium">
          Role: {userRoles[data.user.user_role] || "Unknown"}
        </p>
      </div>

      {/* Extra Section: Edit Profile */}
      <div className="mt-5 text-center">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
