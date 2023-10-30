import { useEffect, useState } from "react";
import request from "../server";
import { Button } from "react-bootstrap";
import useAuth from "../store/auth";
// import Accounts from "../types/account";
import { toast } from "react-toastify";

const Account = () => {
  const user = useAuth((state) => state.user);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    fields: "",
    info: "",
    phoneNumber: "",
    birthday: "",
    address: "",
    email: "",
    github: "",
    linkedin: "",
    telegram: "",
    instagram: "",
    youtube: "",
    facebook: "",
    photo: "",
  });
  // const [portfolios, setPortfolios] = useState([] as Accounts[]);

  useEffect(() => {
    getAccount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    await request.post("/auth/upload", form);
    getAccount();
  };

  const getAccount = async () => {
    await request.get(`/portfolios?user=${user?._id}`);
    // setPortfolios(data);
  };

  const SaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await request.put(`/auth/updatedetails`, values);
      toast.success("Successfully");
    } finally {
      getAccount();
    }
  };

  return (
    <form className="container w-50">
      <div className="mb-3 my-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          onChange={uploadPhoto}
          type="file"
          className="form-control"
          value={values.photo}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Birthday</label>
        <input
          type="date"
          className="form-control"
          name="birthday"
          value={values.birthday}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Facebook</label>
        <input
          type="text"
          className="form-control"
          name="facebook"
          value={values.facebook}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">github</label>
        <input
          type="text"
          className="form-control"
          name="github"
          value={values.github}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Info</label>
        <input
          type="text"
          className="form-control"
          name="info"
          value={values.info}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Instagram</label>
        <input
          type="text"
          className="form-control"
          name="instagram"
          value={values.instagram}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">phoneNumber</label>
        <input
          type="number"
          className="form-control"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Telegram</label>
        <input
          type="text"
          className="form-control"
          name="telegram"
          value={values.telegram}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">youtube</label>
        <input
          type="text"
          className="form-control"
          name="youtube"
          value={values.youtube}
          onChange={handleChange}
        />
      </div>
      <Button variant="btn btn-outline-primary" onClick={SaveSkill}>
        Save Experiences
      </Button>
    </form>
  );
};

export default Account;
