import React, { useEffect } from 'react'
import { Form, message } from 'antd';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';



function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values);
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  };


  useEffect(()=>{
    if (localStorage.getItem("token")){
      navigate("/");
    }
  },[]);

 
  return (
    <div className="flex justify-center h-screen items-center" style={ {backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/011/892/107/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-yellow-background-online-streaming-movie-concept-iluustration-free-vector.jpg')" ,}}
    >
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1 ">LOGIN</h1>
        <hr />
        <Form
          layout='vertical' className="mt-1" onFinish={onFinish}>

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
          {/* <Form.Item
            label="Confirm Password"
            name=" confirm password"
            rules={[{ required: true, message: "Passwords are not same" }]}
          >
            <input type="confirm password" />
          </Form.Item> */}

          <div classNflex="flex flex-col mt-1.gap-1">
            <Button fullWidth title="LOGIN" type='submit' />
            <Link to="/register" className="text-primary">
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
//'antd' 'form' wrapper 'form.item' for all the elements

export default Register;

