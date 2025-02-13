import axios from "axios";
import { showAlert } from "./alerts";
export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data: {
        name,
        email,
      },
    });
    //Show the alert and reload the page
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
