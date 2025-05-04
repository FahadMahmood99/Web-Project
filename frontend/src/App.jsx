import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPassword from "./pages/ResetPasswordPage";
import OtpCode from "./pages/OtpCodePage";
import OtpCodeVerification from "./pages/OtpCodeVerificationPage";
import { Route, Routes } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import SelectGenres from "./components/SelectGenres";
import UpdatePwd from "./pages/UpdatePasswordPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import GuestRoute from "./components/GuestRoute";
import { Navigate } from "react-router-dom";
import SelectCategories from "./components/SelectCategories";
import A from "./components/A";
import Insights from "./components/Insights";
import DailyGoals from "./components/DailyGoals";
import Analyze from "./components/Analyze";
import Logout from "./network/logout";
import Country from "./components/Country";
import BookSummaryPage from "./pages/BookSummaryPage";
import CountryPage from "./pages/CountryPage";
import BookDetails from "./pages/BookDetails";
import BookAudioPage from "./pages/BookAudioPage";
import FavouritesPage from "./pages/FavouritesPage";
import HistoryPage from "./pages/HistoryPage";
import AIsearchPage from "./pages/AIsearchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
  // return (
  //   <div className="App">
  //     <Routes>
  //       <Route
  //         path="/login"
  //         element={
  //           <GuestRoute>
  //             <LoginPage />
  //           </GuestRoute>
  //         }
  //       />
  //       <Route
  //         path="/signup"
  //         element={
  //           // <GuestRoute>
  //           //   <SignupPage />
  //           // </GuestRoute>
  //           <SignupPage />
  //         }
  //       />
  //       <Route path="/logout" element={<Logout />} />
  //       {/* So that "/" could navigate to /home and if user is not logged in it will be redirected to login also */}
  //       <Route path="/" element={<Navigate to="/home" replace />} />
  //       <Route
  //         path="/home"
  //         element={
  //           // <ProtectedRoute>
  //           //   <HomePage />
  //           // </ProtectedRoute>
  //           <HomePage />
  //         }
  //       />
  //       <Route path="/forgotpassword" element={<ResetPassword />} />
  //       <Route path="/emailverification" element={<OtpCode />} />
  //       <Route path="/otp" element={<OtpCodeVerification />} />
  //       <Route path="/onboarding" element={<Onboarding />} />
  //       <Route path="/selectgenres" element={<SelectGenres />} />
  //       <Route path="/selectcategories" element={<SelectCategories />} />
  //       <Route path="/update" element={<UpdatePwd />} />
  //       <Route path="/a" element={<A />} />
  //       <Route path="/insights" element={<Insights />} />
  //       <Route path="/goals" element={<DailyGoals />} />
  //       <Route path="/analyze" element={<Analyze />} />
  //       <Route path="/country" element={<CountryPage />} />
  //       <Route path="/booksummary" element={<BookSummaryPage />} />
  //       <Route path="/bookdetails" element={<BookDetails />} />
  //       <Route path="/bookaudio" element={<BookAudioPage />} />
  //       <Route path="/favourites" element={<FavouritesPage />} />
  //       <Route path="/history" element={<HistoryPage />} />
  //       <Route path="/aisearch" element={<AIsearchPage />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //   </div>
  // );
}

export default App;
