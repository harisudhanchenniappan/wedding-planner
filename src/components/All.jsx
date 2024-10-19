import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import BookingPage from './BookingPage'
import HotelList from './HotelList'
import HallBooking from './HallBooking'
import CatererBooking from './CatererBooking'
import DecoratorBooking from './DecoratorBooking'
import EventPlanner from './EventPlanner'
import BudgetPlanner from './BudgetPlanner'
import PhotographerBooking from './PhotographerBooking'
import Home from './Home'
import EventPreferenceForm from './EventPreferenceForm'
import Login from './Login'

'Halls', 'Decorators', 'Caterers', 'Photographers','Event-Planner','Budget-Planner'

const router=createBrowserRouter([
{
path:'/',
element:<Login />

},

  {
    path:'/bookingPage',
    element: <BookingPage />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:'/Home',
        element:<Home />
      },
      {
      path:'/Halls',
      element:<HallBooking />,
    },
    {
      path:'/Decorators',
      element:<DecoratorBooking />,
    },
    {
      path:'/Caterers',
      element:<CatererBooking />,
    },
    {
      path:'/Event-Planner',
      element:<EventPlanner />,
    },
    {
      path:'/Budget-Planner',
      element:<BudgetPlanner />,
    },
    {
      path:'/Photographers',
      element:<PhotographerBooking />,
    },
    {
      path:'/Event-Preference-Form',
      element:<EventPreferenceForm />,
    },
  ]
  }
])
const All = () => {
  return <RouterProvider router={router} />
}

export default All