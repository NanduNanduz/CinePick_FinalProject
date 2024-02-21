import React, { useEffect } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../apicalls/movies";

function Home() {
  const [Movies, setMovies] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return(
   <div>
    <input type="text"
    className="search-input"
    placeholder="Search for movies"
    />
   </div>
  )
}

export default Home;
