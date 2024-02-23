import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";

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

}

export default TheatresForMovie;
