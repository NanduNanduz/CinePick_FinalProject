import { axiosInstance } from ".";

//make payment
export const MakePayment = (token, amount) => {
  try {
    const response = axiosInstance.post("/api/bookings/payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
