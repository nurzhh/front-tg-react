import { useTelegram } from "@/shared/hooks/useTelegram";
import { Button } from "@/shared/ui/Button/Button";
import React from "react";

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span className="username">{user?.username}</span>
    </div>
  );
};

export default Header;
