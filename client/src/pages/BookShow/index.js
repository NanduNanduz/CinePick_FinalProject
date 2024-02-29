import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetShowById } from "../../apicalls/theatres";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import { MakePayment } from "../../apicalls/bookings";

function BookShow() {
  const [show, setShow] = React.useState(null);
  const [seletedSeats, setSeletedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);
    //iterate through the total seats(once 12 seats are filled go to the next row (eg: 0 - 199 for 120))
    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;
                let seatClass = "seat";

                if (seletedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat";
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat";
                }

                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (seletedSeats.includes(seatNumber)) {
                          setSeletedSeats(
                            seletedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSeletedSeats([...seletedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment({
        token,
        amount: seletedSeats.length * show.ticketPrice * 100,
      });
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    show && ( // Check if show is not null
      <div>
        {/* Show Information */}
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-xl">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>

          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>

          <div>
            <h1 className="text-xl">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/* Seats */}

        <div className="flex justify-center mt-2">{getSeats()}</div>
        {/* once after selecting the seats Book Now button will show */}

        {seletedSeats.length > 0 && (
          <div className="mt-2 flex justify-center">
            <StripeCheckout
              currency="INR"
              token={onToken}
              //tot qty of the seats * price of the show.
              amount={seletedSeats.length * show.ticketPrice * 100}
              stripeKey="pk_test_51OoSvVSDEzzlJpB9sjxGI0I9p1PaC3S4KqbcubK20IqklWtbrh4p7ZQv9834v3bUD1syEMcadvzs57kzLnoYOCWN00eYBU2U3K"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;
