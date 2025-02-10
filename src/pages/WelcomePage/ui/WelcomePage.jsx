import { Container, Card, CardActionArea, CardContent, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 🎬 Анимация
import PsychologyIcon from "@mui/icons-material/Psychology";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const sections = [
    { title: "Профориентационное тестирование", path: "/quiz", icon: <PsychologyIcon fontSize="large" /> },
    { title: "О нас", path: "/about", icon: <GroupsIcon fontSize="large" /> },
    { title: "Расписание", path: "/schedule", icon: <EventIcon fontSize="large" /> },
    { title: "Мероприятия", path: "/events", icon: <WorkIcon fontSize="large" /> },
    { title: "Основные каналы", path: "/channels", icon: <ArticleIcon fontSize="large" /> },
    { title: "Задания", path: "/tasks", icon: <SchoolIcon fontSize="large" /> },
];

const WelcomePage = () => {
    const navigate = useNavigate();
    const title = "Добро пожаловать в";

    return (
        <Box sx={{ backgroundColor: "var(--color-black)", borderRadius: "10px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="sm">
                {/* 🔹 Анимированный заголовок (ПО БУКВАМ) */}
                <Typography
                    variant="h4"
                    fontSize="26px"
                    mb={2}
                    align="center"
                    gutterBottom
                    sx={{ letterSpacing: "2px" }} // ✅ Добавлен отступ между буквами
                >
                    {title.split(" ").map((word, wordIndex) => (
                        <span key={wordIndex}>
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={`${wordIndex}-${charIndex}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (wordIndex * 0.2) + (charIndex * 0.05) }}
                                    style={{ display: "inline-block" }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp; {/* ✅ Добавляет пробел между словами */}
                        </span>
                    ))}
                </Typography>

                {/* 🔹 NIC на новой строке + анимация */}
                <Typography variant="h4" align="center">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: title.length * 0.05 + 0.2 }}
                        style={{ color: "var(--color-green-neon)", display: "block", fontSize: "32px" }}
                    >
                        NIC
                    </motion.span>
                </Typography>

                {/* 🔹 Карточки (ПОЯВЛЯЮТСЯ ПО ОЧЕРЕДИ) */}
                <Stack spacing={2} mt={2}>
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                        >
                            <Card
                                sx={{
                                    backgroundColor: "var(--color-dark-gray)",
                                    color: "var(--color-text-light)",
                                    borderRadius: "var(--border-radius-md)",
                                    width: "100%",
                                }}
                            >
                                <CardActionArea onClick={() => navigate(section.path)}>
                                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, padding: "16px 24px" }}>
                                        {section.icon}
                                        <Typography variant="h6" sx={{ flex: 1, textAlign: "center", fontSize: "16px" }}>
                                            {section.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </motion.div>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default WelcomePage;
