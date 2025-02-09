import { Container, Card, CardActionArea, CardContent, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

    return (
        <Box sx={{ backgroundColor: "var(--color-black)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container maxWidth="sm">
                <Typography variant="h4" color="var(--color-green-neon)" align="center" gutterBottom>
                    Добро пожаловать в NIC
                </Typography>
                <Typography variant="subtitle1" color="var(--color-text-light)" align="center" mb={4}>
                    Выберите раздел, чтобы продолжить
                </Typography>

                <Stack spacing={2}> {/* ✅ Кнопки теперь идут вертикально */}
                    {sections.map((section) => (
                        <Card
                            key={section.title}
                            sx={{
                                backgroundColor: "var(--color-dark-gray)",
                                color: "var(--color-text-light)",
                                borderRadius: "var(--border-radius-md)",
                                width: "100%" // ✅ Кнопки теперь широкие
                            }}
                        >
                            <CardActionArea onClick={() => navigate(section.path)}>
                                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, padding: "16px 24px" }}>
                                    {section.icon}
                                    <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>{section.title}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default WelcomePage;
