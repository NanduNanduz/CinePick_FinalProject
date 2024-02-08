const { axiosInstance } = require(".");

//Register a new user

//  when a user logs in, the front-end can send a request to the server through the API 
// to authenticate the user's credentials. If the credentials are valid, 
// the server can respond with an access token or session ID 
// that can be stored on the client-side and used to authenticate 
// subsequent requests without requiring the user to re-enter their credentials each time.


export const RegisterUser = async (payload) => {
    try {
      //API call
      //payload variable is passed as the data to be sent in the body of the request. 
      //This payload typically contains information needed for registering a user, such as username, password, email, etc.
      const response = await axiosInstance.post("/api/users/register", payload);
      return response.data;
    } catch (error) {
        return error.response;
    }
};

//login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Get current user
export const  GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
        
    }
}


