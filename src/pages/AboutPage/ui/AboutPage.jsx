import { Container, Typography, Box, Card, CardContent, Divider } from "@mui/material";

const AboutPage = () => {
    return (
        <Box
            sx={{
                backgroundColor: "var(--color-black)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <Container maxWidth="md">
                {/* 🔹 Заголовок */}
                <Typography variant="h4" color="var(--color-green-neon)" align="center" gutterBottom>
                    О нашей студенческой организации
                </Typography>

                {/* 🔹 Блок с фото */}
                <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                    <img
                        src="/path-to-your-image.jpg" // 🔹 Заменишь на свою картинку
                        alt="Студенческая организация"
                        style={{ width: "100%", maxWidth: "500px", borderRadius: "var(--border-radius-md)" }}
                    />
                </Box>

                {/* 🔹 Описание организации */}
                <Card sx={{ backgroundColor: "var(--color-dark-gray)", color: "var(--color-text-light)", borderRadius: "var(--border-radius-md)", marginBottom: "20px" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Кто мы?
                        </Typography>
                        <Typography variant="body1">
                            Мы — студенческая организация, объединяющая талантливых и амбициозных людей,
                            стремящихся развивать свои навыки в IT, дизайне, менеджменте и других сферах.
                            У нас ты найдешь дружескую атмосферу, профессиональный рост и поддержку единомышленников.
                        </Typography>
                    </CardContent>
                </Card>

                {/* 🔹 Иерархия */}
                <Card sx={{ backgroundColor: "var(--color-dark-gray)", color: "var(--color-text-light)", borderRadius: "var(--border-radius-md)", marginBottom: "20px" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Как устроена наша организация?
                        </Typography>
                        <Typography variant="body1">
                            В нашей организации несколько уровней:
                        </Typography>
                        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                            <li><strong>Глава организации</strong> – отвечает за стратегию и общее руководство</li>
                            <li><strong>Лидеры направлений</strong> – курируют отдельные сферы (Frontend, Backend, Gamedev, Дизайн и т.д.)</li>
                            <li><strong>Активные участники</strong> – работают над проектами, обучаются и участвуют в хакатонах</li>
                            <li><strong>Новички</strong> – проходят обучение и готовятся к участию в проектах</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* 🔹 Отбор в организацию */}
                <Card sx={{ backgroundColor: "var(--color-dark-gray)", color: "var(--color-text-light)", borderRadius: "var(--border-radius-md)" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Когда проходит отбор?
                        </Typography>
                        <Typography variant="body1">
                            Мы проводим набор новых участников <strong>каждый семестр</strong>.
                            Официальный отбор проходит в начале <strong>сентября</strong> и <strong>февраля</strong>.
                            Следи за нашими объявлениями, чтобы не пропустить!
                        </Typography>
                    </CardContent>
                </Card>

                <Divider sx={{ marginY: "20px", backgroundColor: "var(--color-gray)" }} />

                {/* 🔹 Заключение */}
                <Typography variant="body2" align="center" sx={{ color: "var(--color-text-light)" }}>
                    Если у тебя есть вопросы, обращайся к нашим лидерам или пиши в официальные чаты.
                </Typography>
            </Container>
        </Box>
    );
};

export default AboutPage;
