import React, { useEffect } from "react";
import {message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import {  GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function TheatresForMovie() {
  const [Movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
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
  return (
    Movies && (
      <div>
        {/* movieInformation */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl">
              {Movies.title}({Movies.language})
            </h1>
            <h1 className="text-md">Duration : {Movies.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(Movies.releaseDate).format("MMM Do YYYY")}
            </h1>
            <h1 className="text-md">Genre : {Movies.genre}</h1>
          </div>
        </div>

        {/* movie theatres list */}
        <div></div>
      </div>
    )
  );
}

export default TheatresForMovie;
