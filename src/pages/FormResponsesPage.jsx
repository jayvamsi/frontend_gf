// import React from "react";
// import { useLocation } from "react-router-dom";

// function FormResponsesPage() {
//   const location = useLocation();
//   const { form } = location.state || {};

//   if (!form) return <p>No form selected</p>;

//   return (
//     <div className="page">
//       <h2>Responses for: {form.title}</h2>

//       <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
//         <thead>
//           <tr>
//             {form.fields.map((field, idx) => (
//               <th key={idx}>{field.label}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {form.responses.map((response, idx) => (
//             <tr key={idx}>
//               {response.map((ans, i) => (
//                 <td key={i}>{ans}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FormResponsesPage;

import React from "react";

function FormResponsesPage() {
  return (
    <div className="page">
      <h2>Responses</h2>
      <p>No responses available. This will be populated once backend is connected.</p>
    </div>
  );
}

export default FormResponsesPage;
