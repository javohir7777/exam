import { Link } from "react-router-dom";
import useAuth from "../store/auth";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import cv from "../assets/Javohir Jumayev.pdf";

import "./Home.css";
import { useEffect, useState } from "react";
import request from "../server";
import Skill from "../types/skill";
const HomePage = () => {
  const user = useAuth((state) => state.user);
  const [skill, setSkill] = useState([] as Skill[]);
  useEffect(() => {
    getSkill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSkill = async () => {
    const {
      data: { data },
    } = await request.get(`skills?user=${user?._id}`);
    setSkill(data);
  };

  return (
    <div className="home1">
      <div className="about1">
        <h2>
          {" "}
          Hi, My name is Javohir <br />
          <span style={{ color: "red" }}>{user?.firstName}</span>
        </h2>
        <div className="prompt1">
          <p>
            I'm a software developer with a passion for learning and creating.
          </p>
          <Link to="https://www.linkedin.com/in/javoxir-jumayev-01a91b235/">
            <LinkedIn />
          </Link>
          <Link to="mailto:javohirjumayev7777@gmail.com">
            <Email />
          </Link>
          <Link to="https://github.com/javohir7777">
            <GitHub />
          </Link>
        </div>
        <a
          href={cv}
          className="btn btn-outline-light fs-5 fw-bold mt-3"
          target="_blank"
        >
          Download CV
        </a>
      </div>
      <div className="skills1">
        <h1> Skills</h1>
        <ol className="list1">
          <li className="item1">
            <h2> Front-End</h2>
            {skill.map((skill) => (
              <span className="mx-2" key={skill._id}>
                {skill.name}-{skill.percent}%
              </span>
            ))}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage;
