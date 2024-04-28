// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Record() {
//   const [form, setForm] = useState({
//     name: "",
//     position: "",
//     level: "",
//   });
//   const [isNew, setIsNew] = useState(true);
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       const id = params.id?.toString() || undefined;
//       if(!id) return;
//       setIsNew(false);
//       const response = await fetch(
//         `http://localhost:5050/record/${params.id.toString()}`
//       );
//       if (!response.ok) {
//         const message = `An error has occurred: ${response.statusText}`;
//         console.error(message);
//         return;
//       }
//       const record = await response.json();
//       if (!record) {
//         console.warn(`Record with id ${id} not found`);
//         navigate("/");
//         return;
//       }
//       setForm(record);
//     }
//     fetchData();
//     return;
//   }, [params.id, navigate]);

//   // These methods will update the state properties.
//   function updateForm(value) {
//     return setForm((prev) => {
//       return { ...prev, ...value };
//     });
//   }

//   // This function will handle the submission.
//   async function onSubmit(e) {
//     e.preventDefault();
//     const person = { ...form };
//     try {
//       let response;
//       if (isNew) {
//         // if we are adding a new record we will POST to /record.
//         response = await fetch("http://localhost:5050/record", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(person),
//         });
//       } else {
//         // if we are updating a record we will PATCH to /record/:id.
//         response = await fetch(`http://localhost:5050/record/${params.id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(person),
//         });
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('A problem occurred adding or updating a record: ', error);
//     } finally {
//       setForm({ name: "", position: "", level: "" });
//       navigate("/");
//     }
//   }

//   // This following section will display the form that takes the input from the user.
//   return (
//     <>
    
//     </>
//   );
// }
export {}