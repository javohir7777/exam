import Message from "../types/messages";
import { useEffect, useState } from "react";
import request from "../server";
import Loading from "./Loading";
import useAuth from "../store/auth";
import { Carousel } from "react-bootstrap";
import img from "../assets/img/landscape-2.png";

const Messages = () => {
  const user = useAuth((state) => state.user);
  const [messages, setMessages] = useState([] as Message[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMessages = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await request.get(`/messages`, {
        params: {
          whom: user?._id,
        },
      });
      setMessages(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    await request.delete(`/messages/${id}`);
    getMessages();
  };

  return (
    <div>
      <div className="container my-3">
        {loading ? (
          <Loading />
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <Carousel className="w-50" data-bs-theme="white">
              {messages.map((message) => (
                <Carousel.Item key={message._id}>
                  <img className="d-block w-100" src={img} alt="First slide" />
                  <Carousel.Caption>
                    <h4 className="card-title">{message.title}</h4>
                    <h3 className="card-text">{message.message}</h3>
                    <p className="card-text">{message.user}</p>
                    <div className="d-flex justify-content-center">
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
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
