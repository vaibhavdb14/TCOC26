import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Chip,
  Box,
} from "@mui/material";

import "./App.css";

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const priorityWeights: Record<string, number> = {
  placement: 3,
  result: 2,
  event: 1,
};

export default function App() {

  const [currentView, setCurrentView] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  async function fetchNotifications() {

    try {

      const response = await fetch(
        "/evaluation-service/notifications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ZGJvZGFkZTE0MDcwNUBnbWFpbC5jb20iLCJleHAiOjE3NzkxMDI1NTUsImlhdCI6MTc3OTEwMTY1NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc0YTliYzk1LWY5ZjUtNDRmMS1hY2Q2LWE0MTFhNWE4NzE2MSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwic3ViIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIn0sImVtYWlsIjoidmRib2RhZGUxNDA3MDVAZ21haWwuY29tIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwicm9sbE5vIjoidGNvYzI2IiwiYWNjZXNzQ29kZSI6ImZ6RVFTUSIsImNsaWVudElEIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIiwiY2xpZW50U2VjcmV0IjoiYVJrcUdVQldBc25nc0NXdiJ9.EeUSd-b5avM3gT0paS2Otkatnqt04DPLGL4W6BXHYNY"
          }
        }
      );

      const data = await response.json();

      console.log(data);

      const list = data.notifications || data.data || data;

      if (Array.isArray(list)) {
        setNotifications(list);
      }

    } catch (error) {

      console.log(error);

    }
  }

  function handleMarkAsRead(id: string) {

    if (!readIds.includes(id)) {

      const updatedIds = [...readIds, id];

      setReadIds(updatedIds);

      localStorage.setItem(
        "read_notifications",
        JSON.stringify(updatedIds)
      );
    }
  }

  function getPriorityData() {

    const copiedArray = [...notifications];

    copiedArray.sort((a, b) => {

      const weightA =
        priorityWeights[a.Type.toLowerCase()] || 0;

      const weightB =
        priorityWeights[b.Type.toLowerCase()] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    });

    return copiedArray.slice(0, 10);
  }

useEffect(() => {

  const stored = localStorage.getItem(
    "read_notifications"
  );

  if (stored) {

    const parsedData = JSON.parse(stored);

    setTimeout(() => {
      setReadIds(parsedData);
    }, 0);

  }

}, []);

 useEffect(() => {

  const loadData = async () => {
    await fetchNotifications();
  };

  loadData();

}, []);

  return (
    <div>

      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Notification App
          </Typography>

          <Button
            color="inherit"
            onClick={() => setCurrentView("all")}
          >
            All Notifications
          </Button>

          <Button
            color="inherit"
            onClick={() => setCurrentView("priority")}
          >
            Priority Inbox
          </Button>

        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>

        {currentView === "all" && (

          <div>

            <Typography
              variant="h4"
              className="heading"
            >
              All Notifications
            </Typography>

            {notifications.map((noti) => (

              <Box
                sx={{ mb: 2 }}
                key={noti.ID}
              >

                <Card
                  onClick={() => handleMarkAsRead(noti.ID)}
                  sx={{
                    opacity: readIds.includes(noti.ID)
                      ? 0.5
                      : 1,
                    cursor: "pointer",
                  }}
                >

                  <CardContent>

                    <Chip
                      label={noti.Type}
                      className="chip"
                    />

                    <Typography variant="h6">
                      {noti.Message}
                    </Typography>

                    <Typography variant="body2">
                      {noti.Timestamp}
                    </Typography>

                  </CardContent>

                </Card>

              </Box>

            ))}

          </div>

        )}

        {currentView === "priority" && (

          <div>

            <Typography
              variant="h4"
              className="heading"
            >
              Priority Inbox
            </Typography>

            {getPriorityData().map((noti) => (

              <Box
                sx={{ mb: 2 }}
                key={noti.ID}
              >

                <Card
                  onClick={() => handleMarkAsRead(noti.ID)}
                  sx={{
                    opacity: readIds.includes(noti.ID)
                      ? 0.5
                      : 1,
                    cursor: "pointer",
                  }}
                >

                  <CardContent>

                    <Chip
                      label={noti.Type}
                      className="chip"
                    />

                    <Typography variant="h6">
                      {noti.Message}
                    </Typography>

                    <Typography variant="body2">
                      {noti.Timestamp}
                    </Typography>

                  </CardContent>

                </Card>

              </Box>

            ))}

          </div>

        )}

      </Container>

    </div>
  );
}