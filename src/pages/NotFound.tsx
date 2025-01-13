import { Box } from "@mui/joy";
import { Link } from "react-router-dom";

const basePath = import.meta.env.BASE_URL;

const NotFound = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
          filter: "blur(10px)",
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: -100,
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${basePath}/gandalf-happy.gif)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${basePath}/gandalf-happy.gif)`,
          },
        })}
      />
      <Box
        sx={() => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: -50,
          opacity: 0.7,
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        })}
      />
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          
          width: "100%",
          zIndex: 100,
          backgroundColor: "background.level1",
          padding: 2,
        })}
      >
        <h1>Хоббитов здесь не было</h1>
        <Link to="/">Вернуться на главную</Link>
      </Box>
    </>
  );
};

export default NotFound;
