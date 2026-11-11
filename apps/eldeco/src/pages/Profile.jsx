import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#F4B443] hover:bg-yellow-500 text-white px-6 py-2 rounded-md font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold">
                    {currentUser.displayName
                      ? currentUser.displayName.charAt(0).toUpperCase()
                      : currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {currentUser.displayName || "User"}
                  </h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                </div>
              </div>

              {/* Account Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  {/* Display Name */}
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Display Name
                      </p>
                      <p className="text-gray-900">
                        {currentUser.displayName || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-gray-900 text-sm font-mono">
                        {currentUser.uid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition duration-150 ease-in-out"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


