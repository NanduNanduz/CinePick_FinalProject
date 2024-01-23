import React,{useEffect} from 'react'

import { Form } from 'antd';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { message} from 'react';

import { HideLoading, ShowLoading } from '../../redux/loadersSlice';



function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);    
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  
  useEffect(()=>{
    if (localStorage.getItem("token")){
      navigate("/");
    }
  },[]);


  return (
    // style={ {backgroundImage: "url('https://images.cdn3.stockunlimited.net/preview1300/cinema-background-with-movie-objects_1823381.jpg')"}}
    <div className="flex justify-center h-screen items-center bg-primary"  >
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-2 ">CinePick - REGISTER</h1>
        <hr />
        <Form
         layout='vertical'
         className="mt-2" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>
          

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type='submit' />
            <Link to="/login"
              className="text-primary"
            >Already have an account? Login</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
//'antd' 'form' wrapper 'form.item' for all the elements

export default Register

