import { useTelegram } from "@/shared/hooks/useTelegram";
// import { Button } from "@/shared/ui/Button/Button";
import "./styles.css";

const Header = () => {
  const { user } = useTelegram();

  return (
    <div className="header">
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
