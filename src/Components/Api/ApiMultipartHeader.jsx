export default function ApiMultipartHeader() {
    let token = window.localStorage.getItem("token");
    const header = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "API-KEY" : "eff41ef6-d430-4887-aa55-9fcf46c72c99"
      },
    };
    return header;
  }