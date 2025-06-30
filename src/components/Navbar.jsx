// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isUserPage =
//     location.pathname.startsWith("/fill") || location.pathname === "/thank-you";

//   const isAdmin = localStorage.getItem("isAdmin") === "true";
//   const adminUsername = localStorage.getItem("adminUsername");

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to logout?");
//     if (confirmed) {
//       localStorage.removeItem("isAdmin");
//       localStorage.removeItem("adminToken");
//       localStorage.removeItem("adminEmail");
//       localStorage.removeItem("adminUsername");
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
//       {/* Left - Logo */}
//       <div>
//         {isUserPage ? (
//           <span className="logo">Forms by J.A.Y</span>
//         ) : (
//           <Link to="/" className="logo">
//             Forms by J.A.Y
//           </Link>
//         )}
//       </div>

//       {/* Center - Username */}
//       <div style={{ flex: 1, textAlign: "center" }}>
//         {isAdmin && adminUsername && (
//           <span
//             style={{
//               fontWeight: "bold",
//               fontSize: "18px",
//               color: "#2c3e50",
//             }}
//           >
//             {adminUsername}
//           </span>
//         )}
//       </div>

//       {/* Right - Navigation Links */}
//       <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//         {!isUserPage && isAdmin ? (
//           <>
//             <Link to="/create">Create</Link>
//             <Link to="/forms">Forms</Link>
//             <button
//               onClick={handleLogout}
//               style={{
//                 background: "transparent",
//                 border: "1px solid black",
//                 color: "black",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 borderRadius: "5px",
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           !isUserPage && <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isUserPage =
    location.pathname.startsWith("/fill") || location.pathname === "/thank-you";

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const username = isAdmin ? localStorage.getItem("adminUsername") : null;

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminUsername");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      {isUserPage ? (
        <span className="logo">Forms by J.A.Y</span>
      ) : (
        <Link to="/" className="logo">
          Forms by J.A.Y
        </Link>
      )}

      {/* ✅ Username in center (only for admin, not user side) */}
      {isAdmin && !isUserPage && username && (
        <span className="nav-username" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontWeight: "bold", fontSize: "16px" }}>
          Welcome, {username}
        </span>
      )}

      {!isUserPage && (
        <div className="nav-links">
          {isAdmin ? (
            <>
              <Link to="/create">Create</Link>
              <Link to="/forms">Forms</Link>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "10px",
                  background: "transparent",
                  border: "1px solid black",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  borderRadius: "5px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
