import { Button, Modal, Pagination } from "react-bootstrap";
import useAuth from "../store/auth";
import useSkill from "../store/skill";
import { useEffect, useState } from "react";
import request from "../server";
import Loading from "./Loading";

import "./Skills.scss";

const CRUDPage = () => {
  const user = useAuth((state) => state.user);
  const skills = useSkill((state) => state.skills);
  const loading = useSkill((state) => state.loading);
  const total = useSkill((state) => state.total);
  const page = useSkill((state) => state.page);
  const setPage = useSkill((state) => state.setPage);
  const getSkills = useSkill((state) => state.getSkills);
  const showModal = useSkill((state) => state.showModal);
  const isModalOpen = useSkill((state) => state.isModalOpen);
  const controlModal = useSkill((state) => state.controlModal);
  const setSelected = useSkill((state) => state.setSelected);
  const selected = useSkill((state) => state.selected);

  const [values, setValues] = useState({
    name: "",
    percent: "",
  });
  useEffect(() => {
    getSkills();
  }, [getSkills]);
  // const [show, setShow] = useState(false);
  // const [skills, setSkills] = useState([] as Skill[]);
  // const [selected, setSelected] = useState(null);

  // useEffect(() => {
  //   getSkills();
  // }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        await request.post("/skills", values);
      } else {
        await request.put(`/skills/${selected}`, values);
      }

      getSkills();
    } finally {
      controlModal(false);
      // setValues(values);
    }
  };

  const editData = async (id: string) => {
    controlModal(true);
    const { data } = await request.get(`skills/${id}`);
    console.log(data);
    setValues(data);
    setSelected(id);
  };

  const deleteData = async (id: string) => {
    await request.delete(`/skills/${id}`);
    getSkills();
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="container my-3 skills">
      <div className="d-flex align-items-center justify-content-between text-h1">
        <h1>Skills:</h1>
        <Button variant="primary" onClick={showModal}>
          Add skill
        </Button>
        <Modal show={isModalOpen} onHide={() => controlModal(false)}>
          <Modal.Header closeButton></Modal.Header>
          <form className="container">
            <div className="mb-3 my-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Percent</label>
              <input
                type="text"
                className="form-control"
                name="percent"
                value={values.percent}
                onChange={handleChange}
              />
            </div>
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => controlModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={SaveSkill}>
              Save skill
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="my-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Percent</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill._id}>
                  <td scope="row">{skill.name}</td>
                  <td>{skill.percent}</td>
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
          <Pagination className="d-flex align-items-center justify-content-center">
            <Pagination.First
              disabled={page === 1}
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next
              disabled={page === Math.ceil(total / 10)}
              onClick={() => handlePageChange(page + 1)}
            />
            <Pagination.Last
              disabled={page === Math.ceil(total / 10)}
              onClick={() => handlePageChange(Math.ceil(total / 10))}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CRUDPage;
