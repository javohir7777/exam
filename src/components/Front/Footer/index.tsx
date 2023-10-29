import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./Footer.css";
const FrontFooter = () => {
  return (
    <div className="footer">
      <div className="socialMedia">
        <Link to="https://www.instagram.com/javohir_zafar0vich">
          <InstagramIcon />
        </Link>
        <Link to="https://t.me/javohir_zafar0vich">
          <TelegramIcon />
        </Link>
        <Link to="https://www.facebook.com/javohir.jumayev.7503/">
          <FacebookIcon />
        </Link>
        <Link to="https://www.linkedin.com/in/javoxir-jumayev-01a91b235/">
          <LinkedInIcon />
        </Link>
      </div>
    </div>
  );
};

export default FrontFooter;
