import React, { useContext  } from "react";
import { useDispatch, useSelector } from "react-redux";
/// React router dom
import {  Routes, Route, Outlet  } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";


/// Dashboard
import Home from "./components/Dashboard/Home";
import Dashboard2 from "./components/Dashboard/Dashboard2";
import Dashboard3 from "./components/Dashboard/Dashboard3";
import Dashboard4 from "./components/Dashboard/Dashboard4";
import Crm from "./components/Dashboard/Crm";
import Analytics from "./components/Dashboard/Analytics";
import Products from "./components/Dashboard/Products"; 
import Sales from "./components/Dashboard/Sales"; 
import Projects from "./components/Dashboard/Projects";


//Apps
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import AppProfile2 from "./components/AppsMenu/AppProfile/AppProfile2";


import Calendar from "./components/BookingCalnder/Calendar";



/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAccordion from "./components/bootstrap/Accordion";
import UiAlert from "./components/bootstrap/Alert";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Pages
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

import { ThemeContext } from "../context/ThemeContext";
import { navtoggle } from "../store/actions/AuthActions";
import Resort from "./components/TheResort/Resort";
import Chalets from "./components/Chalets/Chalets";
import Booking from "./components/Booking/Booking";
import Settings from "./components/Settings/Settings";
import OtherServices from "./components/OtherServices/OtherServices";
import Meals from "./components/Meals/Meals";
import Guests from "./components/Guests/Guests";
import SettingRseort from "./components/SettingRseort/SettingRseort";
import MoniterTraffic from "./components/MoniterTraffic/MoniterTraffic";
import Invoices from "./components/Invoices/Invoices";
import Users from "./components/Users/Users";

const allroutes = [
  // Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "index-3", component: <Dashboard2 /> },
    { url: "index-4", component: <Dashboard3 /> },
    { url: "index-5", component: <Dashboard4 /> },
    { url: "crm", component: <Crm /> },
    { url: "analytics", component: <Analytics /> },
    { url: "products", component: <Products /> },
    { url: "sales", component: <Sales /> },
    { url: "project", component: <Projects /> },  
    
  //Apps
   
       
    { url: "app-profile", component: <AppProfile /> },
    { url: "app-profile-2", component: <AppProfile2 /> },
          
  // Apps  
    
    { url: "app-calender", component: <Calendar /> },

  
  // Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },    
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },
  // Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards />},
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },  
  // Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },   
    { url: "uc-lightgallery", component: <Lightgallery /> },
  
  
  // table
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
  { url: "table-bootstrap-basic", component: <BootstrapTable /> },
    
  //The Turista

  { url: "Resort", component: <Resort /> },
  { url: "Chalets", component: <Chalets /> },
  { url: "Booking", component: <Booking /> },
  { url: "Settings", component: <Settings /> },
  { url: "OtherServices", component: <OtherServices /> },
  { url: "Meals", component: <Meals /> },
  { url: "Guests", component: <Guests /> },
  { url: "SettingRseort", component: <SettingRseort /> },
  { url: "MoniterTraffic", component: <MoniterTraffic /> },
  { url: "Invoices", component: <Invoices /> },

  { url: "Users", component: <Users /> },
  { url: "Invoices", component: <Invoices /> },





    
];

 
  function NotFound(){    
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]    
      
    if(url.indexOf(path) <= 0){     
      return <Error404 />
    }
  }



const Markup = () => {   
  
   
    return (
      <>
          <Routes>              
              <Route path='/page-lock-screen' element= {<LockScreen />} />
              <Route path='/page-error-400' element={<Error400/>} />            
              <Route path='/page-error-403' element={<Error403/>} />
              <Route path='/page-error-404' element={<Error404/>} />
              <Route path='/page-error-500' element={<Error500/>} />
              <Route path='/page-error-503' element={<Error503/>} />     
              <Route  element={<MainLayout />} > 
                  {allroutes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`${data.url}`}
                      element={data.component}
                    />
                    ))}
              </Route>                
              <Route path='*' element={<NotFound/>} />     
          </Routes>     
          <ScrollToTop />
          
      </>
    );       
};


  function MainLayout(){
    const { menuToggle , sidebariconHover} = useContext(ThemeContext);

    const dispatch = useDispatch();
    const sideMenu = useSelector(state => state.sideMenu);
    // const handleToogle = () => {
    //   dispatch(navtoggle());
    // };
    return (
      <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle" : ""}`}>  
          <Nav />
          <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>          
            <Outlet />   
          </div>
        <Footer />
      </div>
    )
  };



export default Markup;
