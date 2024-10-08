import React,{useState, useContext, useEffect} from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoutPage from './Logout';
import { IMAGES, SVGICON } from "../../constant/theme";
import { ThemeContext } from "../../../context/ThemeContext";

const NotificationBlog =({classChange}) =>{
	return(
		<>
			<li>
				<div className="timeline-panel">
					<div className="media me-2">
						<img alt="images" width={50} src={IMAGES.Avatar} />
					</div>
					<div className="media-body">
						<h6 className="mb-1">Dr sultads Send you Photo</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}>KG</div>
					<div className="media-body">
						<h6 className="mb-1">Resport created successfully</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
					<div className="media-body">
						<h6 className="mb-1">Reminder : Treatment Time!</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
		</>
	)
}

const Header = ({ onNote }) => {
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 
	
	const {background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if(background.value === 'dark'){
			changeBackground({ value: "light", label: "Light" });
		}else{
			changeBackground({ value: "dark", label: "Dark" });
		}
	}
  
  return ( 
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          	<div className="collapse navbar-collapse justify-content-between">
				<div className="header-left">					
				</div>
				<div className="header-right d-flex align-items-center">
					
					<ul className="navbar-nav ">	
						<li className="nav-item dropdown notification_dropdown">
							<Link to={'#'} className="nav-link bell dz-theme-mode"
 								onClick={()=>handleThemeMode()}
							>
								{background.value === "dark" ?
									<svg  xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
										<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
											<rect x="0" y="0" width="24" height="24"/>
											<path d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z" fill="#000000" fillRule="nonzero"/>
											<path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/>
										</g>
									</svg>
									:
									<svg  xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
										<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
											<rect x="0" y="0" width="24" height="24"/>
											<path d="M12.0700837,4.0003006 C11.3895108,5.17692613 11,6.54297551 11,8 C11,12.3948932 14.5439081,15.9620623 18.9299163,15.9996994 C17.5467214,18.3910707 14.9612535,20 12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C12.0233848,4 12.0467462,4.00010034 12.0700837,4.0003006 Z" fill="#000000"/>
										</g>
									</svg>	
								}
							</Link>
						</li>	
						
						
						
						<li className="nav-item ps-3">
							<Dropdown className="header-profile2">
								<Dropdown.Toggle className="nav-link i-false" as="div">
									<div className="header-info2 d-flex align-items-center">
										<div className="header-media">
											<img src={IMAGES.User} alt="" />
										</div>										
										
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end">
									<div className="card border-0 mb-0">
										<div className="card-header py-2">
											<div className="products">
												<img src={IMAGES.User} className="avatar avatar-md" alt="" />
												<div>
													<h6>Thomas Fleming</h6>
													<span>Web Designer</span>	
												</div>	
											</div>
										</div>
										<div className="card-body px-0 py-2">
											<Link to={"/app-profile"} className="dropdown-item ai-icon ">
												{SVGICON.UserSvg}{" "}
												<span className="ms-2">Profile </span>
											</Link>
											
											
											
										</div>
										<div className="card-footer px-0 py-2">
											<Link to={"#"} className="dropdown-item ai-icon ">
												{SVGICON.Headersetting} {" "}
												<span className="ms-2">Settings </span>
											</Link>										
											<LogoutPage />
										</div>
									</div>
									
								</Dropdown.Menu>
							</Dropdown>
						</li>						
					</ul>
				</div>
			
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
