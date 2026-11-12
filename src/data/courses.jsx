import avatar1 from '../assets/avatars/avatar-1.png'
import avatar2 from '../assets/avatars/avatar-2.png'
import avatar3 from '../assets/avatars/avatar-3.png'
import avatar4 from '../assets/avatars/avatar-4.png'
import avatar5 from '../assets/avatars/avatar-5.png'
import avatar6 from '../assets/avatars/avatar-6.png'
import avatar7 from '../assets/avatars/avatar-7.png'
import avatar8 from '../assets/avatars/avatar-8.png'
import avatar9 from '../assets/avatars/avatar-9.png'
import course1 from '../assets/images/course-1.jpg'
import course2 from '../assets/images/course-2.jpg'
import course3 from '../assets/images/course-3.jpg'
import course4 from '../assets/images/course-4.jpg'
import course5 from '../assets/images/course-5.jpg'
import course6 from '../assets/images/course-6.jpg'
import course7 from '../assets/images/course-7.jpg'
import course8 from '../assets/images/course-8.jpg'
import course9 from '../assets/images/course-9.jpg'

export const categories = ['Semua Kelas', 'Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis']

const courseCategories = ['Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis']
const images = [course1, course2, course3, course4, course5, course6, course7, course8, course9]
const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9]

export const courses = images.map((image, index) => ({
  id: index + 1,
  title: 'Big 4 Auditor Financial Analyst',
  description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik',
  image,
  category: courseCategories[index % courseCategories.length],
  instructor: {
    name: 'Jenna Ortega',
    role: 'Senior Accountant',
    company: 'Gojek',
    avatar: avatars[index],
  },
  rating: 3.5,
  reviews: 86,
  price: 300000,
}))
