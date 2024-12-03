import DashboardPage from '@/pages/Admin';
import AddNewMovie from '@/pages/Admin/AddMovie';
import UserPage from '@/pages/Admin/UserManagement';
import CartPage from '@/pages/Cart';
import CheckoutPage from '@/pages/Checkout';
import ForgetPassword from '@/pages/ForgetPassword';
import HistoryPage from '@/pages/History';
import HomePage from '@/pages/HomePage';
import ListMovie from '@/pages/ListMovie';
import LoginPage from '@/pages/Login';
import MovieBooking from '@/pages/MovieBooking';
import MovieDetail from '@/pages/MovieDetail';
import ResetPassword from '@/pages/ResetPassword';
import SignUpPage from '@/pages/SignUp';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/list-movies', component: ListMovie },
  { path: '/movie/:id', component: MovieDetail },
  { path: '/movie-booking/:id', component: MovieBooking },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/history', component: HistoryPage },
  { path: '/login', component: LoginPage },
  { path: '/sign-up', component: SignUpPage },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/reset-password/:id', component: ResetPassword },

  ////admin
  { path: '/admin/dashboard', component: DashboardPage },
  { path: '/admin/list-movies', component: ListMovie },
  { path: '/admin/add-movie', component: AddNewMovie },
  { path: '/admin/edit-movie/:id', component: AddNewMovie },
  { path: '/admin/user-management', component: UserPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
