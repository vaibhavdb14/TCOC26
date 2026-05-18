const priorityWeights = {
  placement: 3,
  result: 2,
  event: 1
};

async function getNotifications() {

  try {

    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ZGJvZGFkZTE0MDcwNUBnbWFpbC5jb20iLCJleHAiOjE3NzkxMDE1MDUsImlhdCI6MTc3OTEwMDYwNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNlYmFkMjliLTc2NTgtNDljOC04M2IxLTU3MDY0NmFjNjk1OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwic3ViIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIn0sImVtYWlsIjoidmRib2RhZGUxNDA3MDVAZ21haWwuY29tIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwicm9sbE5vIjoidGNvYzI2IiwiYWNjZXNzQ29kZSI6ImZ6RVFTUSIsImNsaWVudElEIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIiwiY2xpZW50U2VjcmV0IjoiYVJrcUdVQldBc25nc0NXdiJ9.x82EEwB4DONVeevv5Kk6e108In5gn1sTjKEGdPb457g"
        }
      }
    );

    const data = await response.json();

    console.log(data);

    const notifications = data.notifications || data.data || data;

    notifications.sort((a: any, b: any) => {

      const aPriority =
        priorityWeights[a.type.toLowerCase() as keyof typeof priorityWeights];

      const bPriority =
        priorityWeights[b.type.toLowerCase() as keyof typeof priorityWeights];

      if (aPriority > bPriority) {
        return -1;
      }

      if (aPriority < bPriority) {
        return 1;
      }

      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();

      return bTime - aTime;
    });

    const top10 = notifications.slice(0, 10);

    console.log(top10);

  } catch (error) {

    console.log(error);

  }
}

getNotifications();