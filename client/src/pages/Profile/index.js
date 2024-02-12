import React from 'react'
import { Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle'
import TheatresList from './TheatresList'

function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          Bookings
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
    //added component <TheatresList/>
  );
}

export default Profile;

