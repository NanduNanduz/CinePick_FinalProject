
import Button from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TheatreForm from './TheatreForm';
import { DeleteTheatre, GetAllTheatres, GetAllTheatresByOwner } from '../../apicalls/theatres';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { message, Table } from 'antd';



function TheatresList() {
    const {user} = useSelector(state => state.users)
    const [showTheatreFormModal = false, setShowTheatreFormModal] = useState(false)
    const [selectedTheatre = null, setSelectedTheatre] = useState(null);
    const [formType = "add", setFormType] = useState("add");
    const [theatres = [], setTheatres] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await GetAllTheatresByOwner({
            owner: user._id,
          });
          if (response.success) {
            setTheatres(response.data);
          } else {
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };


      const handleDelete= async(id) =>{
        try {
          dispatch(ShowLoading());
          const response = await DeleteTheatre({ theatreId: id});
          if(response.success){
            message.success(response.message);
            getData();
          }else {
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

      const columns = [
        {
            title : "Name",
              dataIndex: "name",
        },
        {
            title : "Address",
              dataIndex: "address",
        },
        {
            title : "Phone",
             dataIndex: "phone",
        },
        {
            title : "Email",
             dataIndex: "email",
        },
        {
          title : "Status",
             dataIndex: "isActive",
             render: (text,record)=>{
              if(text)
              {
                return "Approved"
              }else{
                return "Pending / Blocked"
              }
             },
        },


        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return <div className='flex gap-1'>
              <i className="action ri-delete-bin-line "
              onClick={()=> {
                handleDelete(record._id);
              }}
              ></i>
              <i className="action ri-pencil-line "
              onClick={() =>{
                setSelectedTheatre(record);//complete row should be record
                setFormType("edit");
                setShowTheatreFormModal(true);//model popup
              }}></i>
            </div>
    
          }
    
        }

      ];



      useEffect(() => {
        getData();
      }, []);

    return (
        <div>
            <div className='flex justify-end mb-1'>
                <Button variant="outlined" title='Add Theatre'
                    onClick={() => {
                        setFormType("add");
                        setShowTheatreFormModal(true);
                    }}
                />
            </div>

            < Table columns={columns} dataSource={theatres}/>
           

            {showTheatreFormModal && (
                <TheatreForm
                    showTheatreFormModal={showTheatreFormModal}
                    setShowTheatreFormModal={setShowTheatreFormModal}
                    formType={formType}
                    setFormType={setFormType}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
            )}
        </div>
    )
}

export default TheatresList;
