// import React, { useCallback, useEffect } from "react";
// import { useTelegram } from "@/shared/hooks/useTelegram";
// import "./styles.css";

// const Form = () => {
//   const { tg } = useTelegram();
//   const [formData, setFormData] = React.useState({
//     country: "",
//     city: "",
//     subject: "physical",
//   });

//   const onSendData = useCallback(() => {
//     if (!tg) return;

//     const data = {
//       country: formData.country,
//       city: formData.city,
//       subject: formData.subject,
//     };
//     tg.sendData(JSON.stringify(data));
//   }, [formData]);

//   useEffect(() => {
//     if (tg && tg.WebApp) {
//       tg.WebApp.onEvent("mainButtonClicked", onSendData);
//       return () => {
//         tg.WebApp.offEvent("mainButtonClicked", onSendData);
//       };
//     }
//   }, [onSendData]);

//   useEffect(() => {
//     if (tg) {
//       tg.MainButton.setParams({
//         text: "Отправить данные",
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (tg) {
//       if (!formData.city || !formData.country) {
//         tg.MainButton.hide();
//       } else {
//         tg.MainButton.show();
//       }
//     }
//   }, [formData.country, formData.city]);

//   const handleChange = ({ target: { name, value } }) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const onChangeSubject = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       subject: event.target.value,
//     }));
//   };

//   return (
//     <form className="form">
//       <h3>Введите ваши данные</h3>
//       <input
//         type="text"
//         name="country"
//         value={formData.country}
//         onChange={handleChange}
//         className="input"
//         placeholder="Страна"
//       />
//       <input
//         type="text"
//         name="city"
//         value={formData.city}
//         onChange={handleChange}
//         className="input"
//         placeholder="Город"
//       />
//       <select
//         value={formData.subject}
//         onChange={onChangeSubject}
//         className="select"
//       >
//         <option value="physical">Физ. лицо</option>
//         <option value="legal">Юр. лицо</option>
//       </select>
//     </form>
//   );
// };

// export default Form;

import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { useTelegram } from "@/shared/hooks/useTelegram";

const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();
// 
  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
