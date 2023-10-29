import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { School } from "@mui/icons-material";
import useAuth from "../store/auth";
import { useEffect, useState } from "react";
import request from "../server";
import Educationes from "../types/eduction";

const FrontEducation = () => {
  const user = useAuth((state) => state.user);
  const [experiences, setExperiences] = useState([] as Educationes[]);

  useEffect(() => {
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExperiences = async () => {
    const {
      data: { data },
    } = await request.get(`/education?user=${user?._id}`);
    setExperiences(data);
  };
  return (
    <div className="experience" style={{ background: "#ddd" }}>
      <VerticalTimeline lineColor="#3e497a">
        {experiences.map((experience) => (
          <VerticalTimelineElement
            key={experience._id}
            className="vertical-timeline-element--education"
            date={`${experience.startDate.split("T")[0]} - ${
              experience.endDate.split("T")[0]
            }`}
            iconStyle={{ background: "#3e497a", color: "#ddd" }}
            icon={<School />}
          >
            <h3 className="vertical-timeline-element-title">
              {experience.name}
            </h3>
            <p>{experience.level}</p>
            <p>{experience.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default FrontEducation;
