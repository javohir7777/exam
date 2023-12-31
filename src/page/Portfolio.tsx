import { useEffect, useState } from "react";
import useAuth from "../store/auth";
import request from "../server";
import { Button, Modal } from "react-bootstrap";
import Loading from "./Loading";
import Portfolios from "../types/portfolio";

const Portfolio = () => {
  const user = useAuth((state) => state.user);
  const [show, setShow] = useState(false);
  const [portfolios, setPortfolios] = useState([] as Portfolios[]);
  const [values, setValues] = useState({
    name: "",
    url: "",
    description: "",
    photo: "",
  });
  const [selected, setSelected] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => setShow(false);
  const openModal = () => {
    setShow(true);
    setValues({
      name: "",
      url: "",
      description: "",
      photo: "",
    });
  };
  console.log(portfolios);

  const getExperiences = async () => {
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

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    if (e.target.files) {
      form.append("file", e.target.files[0]);
    }
    const { data } = await request.post("/upload", form);
    setUrl(data);
    console.log("hi", url);
  };

  const SaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const valuesPhoto = { ...values, photo: url };
    try {
      if (selected === null) {
        await request.post(`/portfolios`, valuesPhoto);
      } else {
        await request.put(`/portfolios/${selected}`, valuesPhoto);
      }
      getExperiences();
    } finally {
      setShow(false);
    }
  };

  const editData = async (id: string) => {
    setSelected(id);
    setShow(true);
    const { data } = await request.get(`/portfolios/${id}`);
    console.log(data);
    setValues({
      name: data.name,
      url: data.url,
      description: data.description,
      photo: data.photo,
    });
  };

  const deleteData = async (id: string) => {
    await request.delete(`/portfolios/${id}`);
    getExperiences();
  };

  return (
    <div className="container my-3">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Portfolio: </h1>
        <Button variant="primary" onClick={openModal}>
          Add skill
        </Button>
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton></Modal.Header>
          <form className="container">
            <div className="mb-3 my-3">
              <label className="form-label">Work Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={values.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Url</label>
              <input
                type="text"
                className="form-control"
                name="url"
                value={values.url}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Photo</label>
              <input
                onChange={uploadPhoto}
                type="file"
                className="form-control"
                // value={values.photo}
              />
            </div>
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={SaveSkill}>
              Save Experiences
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="row g-2">
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
                <div className="d-flex align-items-center gap-2">
                  <h5 className="card-title">Description: </h5>
                  <span className="card-text mb-2">
                    {experience?.description}
                  </span>
                </div>
                <div className="d-flex justify-content-center mt-3 my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-pencil text-primary"
                    viewBox="0 0 16 16"
                    onClick={() => editData(experience._id)}
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-trash-fill text-danger mx-4"
                    viewBox="0 0 16 16"
                    onClick={() => deleteData(experience._id)}
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <Not /> */}
    </div>
  );
};

export default Portfolio;
