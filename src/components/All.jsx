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
    path:'/book',
    element: <BookingPage />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:'/book/Home',
        element:<Home />
      },
      {
      path:'/book/Halls',
      element:<HallBooking />,
    },
    {
      path:'/book/Decorators',
      element:<DecoratorBooking />,
    },
    {
      path:'/book/Caterers',
      element:<CatererBooking />,
    },
    {
      path:'/book/Event-Planner',
      element:<EventPlanner />,
    },
    {
      path:'/book/Budget-Planner',
      element:<BudgetPlanner />,
    },
    {
      path:'/book/Photographers',
      element:<PhotographerBooking />,
    },
    {
      path:'/book/Event-Preference-Form',
      element:<EventPreferenceForm />,
    },
  ]
  }
])
const All = () => {
  return <RouterProvider router={router} />
}

export default All