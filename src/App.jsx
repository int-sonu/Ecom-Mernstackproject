import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";

import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import ProductDetails from "./components/ProductDetails";
import CategoryProducts from "./components/CategoryProducts";
import CartPage from "./components/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import SignUp from "./pages/signup";

import AdminLogin from "./Admin/adminlogin";
import AdminDashboard from "./Admin/admindashboard";
import DisplayUsers from "./Admin/displayusers";
import ProductDisplay from "./Admin/productdisplay";
import CategoryDisplay from "./Admin/categorydisplay";
import AddProduct from "./Admin/addproduct";
import AddCategory from "./Admin/addcategory";
import EditCategory from "./Admin/editcategories";
import EditProduct from "./Admin/editproduct";

import "./App.css";
import PlaceOrderPage from "./components/PlaceOrderPage";
import AdminOrders from "./Admin/AdminOrders";
import MyOrders from "./components/MyOrders";
import AboutPage from "./components/AboutPage";
import SearchResults from "./components/SearchResults";
import AdminCards from "./Admin/admincards";
import NotFound from "./pages/NotFound";
import ProfilePage from "./components/ProfilePage";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/place-order" element={<PlaceOrderPage />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />

        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          
        />


        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/displayusers" element={<DisplayUsers />} />
        <Route path="/admin/categorydisplay" element={<CategoryDisplay />} />
        <Route path="/admin/productdisplay" element={<ProductDisplay />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/addcategory" element={<AddCategory />} />
        <Route path="/admin/editcategories/:id" element={<EditCategory />} />
        <Route path="/admin/editproduct/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/dashboard" element={<AdminCards />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AdminProvider>
  );
}

export default App;
