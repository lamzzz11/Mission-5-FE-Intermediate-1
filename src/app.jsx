import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Products from './pages/products.jsx'
import CourseDetail from './pages/courseDetail.jsx'
import Checkout from './pages/checkout.jsx'
import PaymentResult from './pages/paymentResult.jsx'
import Orders from './pages/orders.jsx'
import MyCourses from './pages/myCourses.jsx'
import Profile from './pages/profile.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Products />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/checkout/:courseId" element={<Checkout />} />
      <Route path="/checkout/:courseId/pay" element={<Checkout />} />
      <Route path="/checkout/:courseId/success" element={<PaymentResult />} />
      <Route path="/checkout/:courseId/pending" element={<PaymentResult pending />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
