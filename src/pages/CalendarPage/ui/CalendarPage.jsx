import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <Box sx={{ backgroundColor: "var(--color-black)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="sm">
                {/* 🔹 Заголовок */}
                <Typography variant="h4" align="center" sx={{ color: "var(--color-green-neon)", mb: 2 }}>
                    Календарь мероприятий
                </Typography>

                {/* 🔹 Календарь */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            backgroundColor: "var(--color-dark-gray)",
                            padding: 3,
                            borderRadius: "var(--border-radius-md)",
                            boxShadow: "var(--shadow-soft)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <DateCalendar
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{
                                color: "var(--color-text-light)",
                                "& .MuiPickersDay-root": {
                                    color: "var(--color-text-light)",
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "var(--color-green-neon) !important",
                                    color: "var(--color-black) !important",
                                },
                            }}
                        />

                        {/* 🔹 Отображение выбранной даты */}
                        <Typography variant="h6" sx={{ color: "var(--color-text-light)", mt: 2 }}>
                            Выбрана дата: {selectedDate.format("DD MMMM YYYY")}
                        </Typography>
                    </Box>
                </LocalizationProvider>
            </Container>
        </Box>
    );
};

export default CalendarPage;
