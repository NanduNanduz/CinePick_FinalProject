import { Col, Form, Modal, Row, Table, message } from "antd";
import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { GetAllMovies } from "../../../apicalls/movies";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = React.useState("table");
  //columns in the theatre shows table
  const [shows, setShows] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  //need to have the list of movies here to pick the movie
  const dispatch = useDispatch();

  const getMovies = async () => {
    try {
    
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
     
    } catch (error) {
      message.error(error.message);
   
    }
  };
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    getMovies();
  });

  return (
    <Modal
      title=""
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
      width={1400}
      footer={null}
    >
      <h1 className="text-primary text-md uppercase mb-1">
        Theatre : {theatre.name}
      </h1>
      <hr />

      <div className="flex justify-between mt-1 mb-1 items-center">
        <h1 className="text-md uppercase">
          {view === "table" ? "Shows" : "Add Show"}
        </h1>
        {view === "table" && (
          <Button
          variant="outlined"
          title="Add Show"
          onClick={()=>{
            setView("form");
          }}
          />

        )}

      </div>
      {view === "table" && <Table columns={columns} dataSource={shows} />}

      {view === "form" && (
        <Form layout="vertical">
          <Row  
           gutter={[16, 16]}
          
          >
            <Col span={8}>
              <Form.Item label="Show Name" name="name">
                <input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date" name="date">
                <input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Time" name="time">
                <input type="time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Movie" name="movie">
                <select>
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
}

export default Shows;
