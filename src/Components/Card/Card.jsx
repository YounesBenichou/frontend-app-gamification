import React, { useEffect, useMediaQuery } from "react";

import { Card, Hyperlink } from "@edx/paragon";

const CourseCard = (data) => {
  useEffect(() => {
    console.log(data);
  });
  let date = (str) => {
    let unformatData = new Date(str);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return unformatData.toLocaleDateString("en-US", options);
  };

  return (
    <>
      
      <Hyperlink destination={"/courses/course-v1:"+ data.name +"/about"}>
      <Card isClickable data-testid="course-card">
      <div className="top-btn-container">
            <button type="button" className="cost-tag-btn btn btn-primary free">
              Free
            </button>
          </div>

        <Card.ImageCap
          style={{display: "block"}}
          src={data?.media?.image?.large}
          srcAlt="Card image"
        />
        <div className="card-body">
        <div className="pgn__card-header">
              <span className="pgn__card-header-content">{data.org}</span>
          </div>
        <Card.Header title={data.name}/>
        <br/>
        <div className="pgn__card-footer vertical">
              <button type="button" className="date-btn btn btn-primary">
                Started: {date(data.start)}
              </button>
            </div>
        </div>    
      </Card>
    </Hyperlink>
    </>
  );
};

export default CourseCard;