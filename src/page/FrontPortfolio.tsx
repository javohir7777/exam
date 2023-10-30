import { useEffect, useState } from "react";
// import img1 from "../assets/img/landscape-1.png";
// import img2 from "../assets/img/landscape-2.png";
// import img3 from "../assets/img/landscape-3.png";

import useAuth from "../store/auth";
import "./styles.css";
import Portfolios from "../types/portfolio";
import request from "../server";
import Loading from "./Loading";
const FrontPortfolio = () => {
  const user = useAuth((state) => state.user);
  const [portfolios, setPortfolios] = useState([] as Portfolios[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPortfolios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPortfolios = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`/portfolios?user=${user?._id}`);
      setPortfolios(data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container my-3 mb-3" style={{ padding: "50px 0 50px 0" }}>
      <h1 className="text-center">{user?.firstName}</h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="row g-2" style={{ padding: "40px 0 0 0" }}>
          {portfolios.map((experience) => (
            <div
              key={experience._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card container">
                <img
                  className="card-img-top object-fit-cover my-2"
                  src={`https://ap-portfolio-backend.up.railway.app/upload/${
                    experience?.photo?._id
                  }.${experience?.photo?.name.split(".")[1]}`}
                  alt="..."
                  style={{ height: "200px" }}
                />
                <div className="card-body"></div>
                <div className="d-flex align-items-center gap-2">
                  <h5 className="card-title">Name: </h5>
                  <span className="card-text mb-2">{experience?.name}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <h5 className="card-title">Url: </h5>
                  <a className="card-text mb-2" href={experience?.url}>
                    {experience?.url}
                  </a>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h5 className="card-title">Description: </h5>
                  <span className="card-text mb-2">
                    {experience?.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrontPortfolio;
