import { Link, Navigate } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
      const [helpVisible, setHelpVisible] = useState(false);
      const navigate = useNavigate();
      const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
      }

    return (
         <header className="mb-6 flex justify-between items-center relative">
      <Link to="/dashboard">
        <h1 className="text-3xl font-bold letter-colors pt-2 cursor-pointer">Admin Dashboard</h1>
      </Link>

      <div className="flex items-center space-x-8 ">
        {/* Logout Button */}
        <button
          onClick={() => {
            handleLogout();
          }}
          className="letter-colors px-4 py-2 rounded"
        >
          Logout
        </button>

        {/* Help Button */}
        <div className="relative ml-7">
          <button
            onClick={() => setHelpVisible(!helpVisible)}
            className="letter-colors px-4 py-2 rounded border border-gray-400 hover:bg-gray-200"
            aria-expanded={helpVisible}
            aria-controls="help-popup"
          >
            Help
          </button>

          {/* Popup box */}
          {helpVisible && (
            <div
              id="help-popup"
              className="absolute right-0 mt-2 w-64 p-4 bg-white rounded shadow-lg text-gray-800 z-50"
            >
              <h3 className="font-semibold mb-2">Admin Page Help</h3>
              <p className="text-sm">
                This is your go to help navigation.
              </p>
              <p className="text-sm">Click on <strong>Admin Dashboard</strong> to return to the home page for admin dashboard.</p>
              <p className="text-sm">Click on <strong>Logout</strong> to safely logout of the admin account.</p>
              <p className="text-sm">Click on <strong>Go to Products</strong> to see & add new art pieces to your website.</p>
              <p className="text-sm">Click on an individual art piece <strong>to see and edit specific details of that art piece </strong>.</p>
              <p className="text-sm">Click on <strong>edit</strong> to edit an individual art pieces information and then <strong>save</strong></p>
              <p className="text-sm">Cick on <strong>delete</strong> to delete a art piece, there will be a question to double check.</p>
              <p className="text-sm">Click <strong>Close</strong> to close this panel.</p>

              <button
                onClick={() => setHelpVisible(false)}
                className="mt-3 letter-colors !text-xl hover:underline"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
    )
}

export default AdminNavbar