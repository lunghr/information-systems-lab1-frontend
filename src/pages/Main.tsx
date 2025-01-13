import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Tab, tabClasses, TabList, Tabs } from "@mui/joy";
import BookCreatureTable from "../components/BookCreatureTable";
import MagicCityTable from "../components/MagicCityTable";
import RingTable from "../components/RingTable";
import { useState } from "react";


const MainPage = () => {
  const [tab, setTab] = useState<string>("bookCreature");

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Предметная область
        </Typography>
      </Box>
      <Tabs
        defaultValue={"bookCreature"}
        sx={{ bgcolor: "transparent" }}
        onChange={(_, value: unknown) => {
          setTab(value as string);
        }}
      >
        <TabList
          tabFlex={0}
          size="sm"
          sx={{
            pl: { xs: 0, md: 4 },
            justifyContent: "left",
            [`&& .${tabClasses.root}`]: {
              fontWeight: "600",
              flex: "initial",
              color: "text.tertiary",
              [`&.${tabClasses.selected}`]: {
                bgcolor: "transparent",
                color: "text.primary",
                "&::after": {
                  height: "2px",
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab
            sx={{ borderRadius: "6px 6px 0 0" }}
            indicatorInset
            value={"bookCreature"}
          >
            BookCreature
          </Tab>
          <Tab
            sx={{ borderRadius: "6px 6px 0 0" }}
            indicatorInset
            value={"magicCity"}
          >
            MagicCity
          </Tab>
          <Tab
            sx={{ borderRadius: "6px 6px 0 0" }}
            indicatorInset
            value={"ring"}
          >
            Ring
          </Tab>
        </TabList>
      </Tabs>
      {tab === "bookCreature" && <BookCreatureTable />}
      {tab === "magicCity" && <MagicCityTable />}
      {tab === "ring" && <RingTable />}
    </Box>
  );
};

export default MainPage;
