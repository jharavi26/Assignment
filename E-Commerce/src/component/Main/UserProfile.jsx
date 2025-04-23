import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate(); // ✅ for redirecting after logout

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          updateProfile(user, { displayName: "Guest User" })
            .then(() => setUser({ ...user, displayName: "Guest User" }))
            .catch((error) => console.error("Error updating profile", error));
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // ✅ redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <p className="text-center text-lg text-gray-700 mt-8">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="w-[100px] mx-auto bg-white p-4 rounded-lg shadow-md mt-8">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
        User Profile
      </h2>
      <p className="text-sm text-gray-800">
        <strong>Name:</strong> {user.displayName}
      </p>
      <p className="text-sm text-gray-800">
        <strong>Email:</strong> {user.email}
      </p>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1 mt-4 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition duration-200"
      >
        <IoMdLogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default UserProfile;
