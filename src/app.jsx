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
import Learning from './pages/learning.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Products />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/checkout/:courseId" element={<Checkout />} />
      <Route path="/checkout/:courseId/pay" element={<Checkout />} />
      <Route path="/checkout/:courseId/change-method" element={<Checkout />} />
      <Route path="/checkout/:courseId/success" element={<PaymentResult />} />
      <Route path="/checkout/:courseId/pending" element={<PaymentResult pending />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/learn/:courseId" element={<Learning />} />
      <Route path="/learn/:courseId/pretest/rules" element={<Learning />} />
      <Route path="/learn/:courseId/pretest" element={<Learning />} />
      <Route path="/learn/:courseId/pretest/result" element={<Learning />} />
      <Route path="/learn/:courseId/summary" element={<Learning />} />
      <Route path="/learn/:courseId/done" element={<Learning />} />
      <Route path="/learn/:courseId/quiz/rules" element={<Learning />} />
      <Route path="/learn/:courseId/exam/rules" element={<Learning />} />
      <Route path="/learn/:courseId/exam" element={<Learning />} />
      <Route path="/learn/:courseId/exam/result" element={<Learning />} />
      <Route path="/learn/:courseId/quiz" element={<Learning />} />
      <Route path="/learn/:courseId/quiz/result" element={<Learning />} />
      <Route path="/learn/:courseId/review" element={<Learning />} />
      <Route path="/learn/:courseId/certificate" element={<Learning />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
