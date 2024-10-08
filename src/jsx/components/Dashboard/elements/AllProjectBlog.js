import React from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const DounutProject = loadable(() =>
	pMinDelay(import("./DounutProject"), 1000)
);

const AllProjectBlog = () => {
    return(
        <div className="card same-card chart-chart">
            <div className="card-body d-flex align-items-center  py-2">										
                <DounutProject />
                <ul className="project-list">
                    <li><h6>All Projects</h6></li>
                    <li>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="10" rx="3" fill="#3AC977"/>
                        </svg>{" "}
                        Compete
                    </li>
                    <li>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="10" rx="3" fill="var(--primary)"/>
                        </svg>{" "}
                        Pending
                    </li>
                    <li>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="10" rx="3" fill="var(--secondary)"/>
                        </svg>{" "}
                        Not Start
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AllProjectBlog;
