import AdminNavbar from "../components/AdminNavbar";


function Dashboard() {
    return (
        <>
        <div className="min-h-screen p-6">
          <AdminNavbar>
            
          </AdminNavbar>

      {/* Main content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: User Management */}
        <section className="bg-violet-300 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Product Management</h2>
          <p>View, add, or edit products.</p>
            <button
            className="mt-3 letter-colors px-3 py-1 rounded hover:bg-indigo-700"
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                window.location.href = '/admin-products'; // navigate manually
              } else {
                alert('You must be logged in to access admin products.');
              }
            }}
          >
            Go to Products
          </button>
        </section>

        {/* Card: Reports */}
        <section className="bg-violet-300 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>View system reports and analytics.</p>
          <p>Not Working Yet</p>
          {/* <button className="mt-3  letter-colors px-3 py-1 rounded hover:bg-indigo-700">
            View Reports
          </button> */}
        </section>

        {/* Card: Settings */}
        <section className="bg-violet-300 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Contact me for any setting changes :) .</p>
        </section>
      </main>
    </div>
        </>
    )
}

export default Dashboard