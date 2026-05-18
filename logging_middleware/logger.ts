export async function Log(
    stack: string,
    level: string,
    package_name : string,
    message: string,
): Promise<void> {  
    try{
        await fetch("http://4.224.186.213/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ZGJvZGFkZTE0MDcwNUBnbWFpbC5jb20iLCJleHAiOjE3NzkwOTYzNDksImlhdCI6MTc3OTA5NTQ0OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjBlZDk3MGMzLWE0M2ItNDg1OC04ODM4LTFkYWQ5ZThmMjBhYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwic3ViIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIn0sImVtYWlsIjoidmRib2RhZGUxNDA3MDVAZ21haWwuY29tIiwibmFtZSI6InZhaWJoYXYgYm9kYWRlIiwicm9sbE5vIjoidGNvYzI2IiwiYWNjZXNzQ29kZSI6ImZ6RVFTUSIsImNsaWVudElEIjoiNGIwMTlkM2QtNzJjZi00M2FkLWE0MDAtM2Q5YzcwMTQ5MjRjIiwiY2xpZW50U2VjcmV0IjoiYVJrcUdVQldBc25nc0NXdiJ9.MquKjXWllwncB5zhkZ1TSAEyDehz0DFagc2lxRNf0i4"
            },
            body: JSON.stringify({
                stack : stack.toLowerCase(),
                level : level.toLowerCase(),
                package_name : package_name.toLowerCase(),
                message : message.toLowerCase()
            }),
        });
    }catch(error){}
}
