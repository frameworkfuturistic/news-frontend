export default function ApiJsonHeader() {
   let token = window.localStorage.getItem("token");
   const header = {
     timeout: 60000,
     headers: {
       Authorization: `Bearer ${token}`,
       Accept: "application/json",
       'Content-Type': "application/json",
       "API-KEY" : "eff41ef6-d430-4887-aa55-9fcf46c72c99"
     },
   };
   return header;
 }