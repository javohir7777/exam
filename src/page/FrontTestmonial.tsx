import Message from "../types/messages";
import { useEffect, useState } from "react";
import request from "../server";
import Loading from "./Loading";
import { Carousel } from "react-bootstrap";
import img from "../assets/img/landscape-2.png";
const FrontTestmonial = () => {
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
      } = await request.get(`/messages`);
      setMessages(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container my-3 mt-5">
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

export default FrontTestmonial;
