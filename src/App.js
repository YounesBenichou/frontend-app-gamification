
// components
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


import ThemeProvider from "./theme";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import StyledChart from "./components/chart";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// Pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <Switch>
          <Route path="/dashboard"><DashboardLayout /></Route>
        </Switch>  
      </ThemeProvider>
    </BrowserRouter>      
  );
}

export default App;

