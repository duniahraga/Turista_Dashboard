import React from 'react';
import ProjectOverviewChart from './ProjectOverviewChart';

const ProjectOverviewTab = (props) => {
    return (
        <>
            <div className="card overflow-hidden">                
                <ProjectOverviewChart  height={props.height}/>
            </div>   
        </>
    );
};

export default ProjectOverviewTab;