import { useEffect, useState } from "react";
import useAuth from "../store/auth";
import request from "../server";
import { Button, Modal } from "react-bootstrap";
import Experienc from "../types/experient";
import Loading from "./Loading";

const Experiences = () => {
  const user = useAuth((state) => state.user);

  const [show, setShow] = useState(false);
  const [experiences, setExperiences] = useState([] as Experienc[]);
  const [values, setValues] = useState({
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [selected, setSelected] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => setShow(false);
  const openModal = () => {
    setShow(true);
    setValues({
      workName: "",
      companyName: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const getExperiences = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`/experiences?user=${user?._id}`);
      setExperiences(data);
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

  const SaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selected === null) {
        await request.post(`/experiences`, values);
      } else {
        await request.put(`/experiences/${selected}`, values);
      }

      getExperiences();
    } finally {
      setShow(false);
    }
  };

  const editData = async (id: string) => {
    setSelected(id);
    setShow(true);
    const { data } = await request.get(`/experiences/${id}`);
    console.log(data);
    setValues(data);
  };

  const deleteData = async (id: string) => {
    await request.delete(`/experiences/${id}`);
    getExperiences();
  };

  return (
    <div className="container my-3">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Experiences:</h1>
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
                name="workName"
                value={values.workName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={values.companyName}
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
              <label className="form-label">Start Date</label>
              <input
                type="text"
                className="form-control"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="text"
                className="form-control"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Work name</th>
              <th scope="col">Company name</th>
              <th scope="col">Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((skill, idx) => (
              <tr key={skill._id}>
                <th scope="row">{idx + 1}</th>
                <td>{skill.workName}</td>
                <td>{skill.companyName}</td>
                <td>{skill.description}</td>
                <td>{skill.startDate.split("T")[0]}</td>
                <td>{skill.endDate.split("T")[0]}</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-pencil text-primary"
                    viewBox="0 0 16 16"
                    onClick={() => editData(skill._id)}
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-trash-fill text-danger mx-2"
                    viewBox="0 0 16 16"
                    onClick={() => deleteData(skill._id)}
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Experiences;
