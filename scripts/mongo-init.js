db.createUser({
    user: "messagesdbuser",
    pwd: "messagesdbpassword",
    roles: [{ role: "readWrite", db: "messages" }]
});
