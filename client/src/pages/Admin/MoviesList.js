
import React from 'react'
import Button from '../../components/Button'
import MovieForm from './MovieForm';
import moment from "moment";

function MoviesList() {
    const [Movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType , setFormType]= React.useState("add");

    const columns = [
      {
        title: "Name",
        dataIndex: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Duration",
        dataIndex: "duration",
      },
      {
        title: "Genre",
        dataIndex: "Genre",
      },
      {
        title: "Language",
        dataIndex: "language",
      },
      {
        title: "Release Date",
        dataIndex: "releaseDate",
        render : (text,record) =>{
          return moment(record.releaseDate).format("DD-MM-YYYY")
        }
      },
      {
        title: "Action",
        dataIndex: "action",
      }
    ]


  return (
    <div>
        <div className="flex justify-end">
            <Button title="Add Movie"variant="outlined"
            onClick={()=>{
                setShowMovieFormModal(true);
                setFormType("add");
            }}
            />
        </div>

       <Table columns = {columns} dataSoourcs={movies}/>


        {showMovieFormModal && (
        <MovieForm
        showMovieFormModal = {showMovieFormModal}
        setShowMovieFormModal = {setShowMovieFormModal}
        selectedMovie = {selectedMovie}
        setSelectedMovie = {setSelectedMovie}
        formType ={formType}
        />)}
    </div>
  )
}

export default MoviesList
