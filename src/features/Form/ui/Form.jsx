import React, { useEffect } from "react";
import { useTelegram } from "@/shared/hooks/useTelegram";
import "./styles.scss";

const Form = () => {
  const { tg } = useTelegram();
  const [formData, setFormData] = React.useState({
    country: "",
    city: "",
    subject: "physical",
  });

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!formData.city || !formData.country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [formData.country, formData.city, tg.MainButton]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeSubject = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      subject: event.target.value,
    }));
  };

  return (
    <form className="form">
      <h3>Введите ваши данные</h3>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="input"
        placeholder="Страна"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="input"
        placeholder="Улица"
      />
      <select
        value={formData.subject}
        onChange={onChangeSubject}
        className="select"
      >
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </form>
  );
};

export default Form;
