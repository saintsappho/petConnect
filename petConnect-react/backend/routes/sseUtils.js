let clients = [];

const sendPostsUpdate = (post) => {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(post)}\n\n`)
  );
};

module.exports = {
  sendPostsUpdate,
};