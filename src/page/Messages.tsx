import { Button } from "react-bootstrap";
import Message from "../types/messages";
import { useEffect, useState } from "react";
import request from "../server";
import Loading from "./Loading";
// import useAuth from "../store/auth";

const Messages = () => {
  // const user = useAuth((state) => state.user);
  const [messages, setMessages] = useState([] as Message[]);
  // const [selected, setSelected] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    user: "",
    message: "",
  });
  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMessages = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`/messages?whom=653ec7a5431aba00182b8ee2`);
      setMessages(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    await request.delete(`/messages/${id}`);
    getMessages();
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

    await request.post(`/messages`, values);

    getMessages();
  };

  return (
    <div>
      <form className="container w-50">
        <div className="mb-3 my-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input
            type="number"
            className="form-control"
            name="user"
            value={values.user}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            name="message"
            value={values.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button variant="btn btn-outline-primary" onClick={SaveSkill}>
          Save Experiences
        </Button>
      </form>
      <div className="container my-3">
        {loading ? (
          <Loading />
        ) : (
          <div className="row g-3">
            {messages.map((message) => (
              <div
                key={message._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div
                  className="border card-body pt-4 px-5"
                  style={{ height: "200px" }}
                >
                  <h5 className="card-title">{message.title}</h5>
                  <p className="card-text my-2">{message.message}</p>
                  <p className="card-text">{message.user}</p>

                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-pencil text-primary"
                      viewBox="0 0 16 16"
                      // onClick={() => SaveSkill(message._id)}
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-trash-fill text-danger mb-4"
                      viewBox="0 0 16 16"
                      onClick={() => deleteData(message._id)}
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
