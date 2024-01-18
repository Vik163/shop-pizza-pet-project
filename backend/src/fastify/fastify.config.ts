// export const fastifyConfig = () => {

// };

// // fastify.post('/', (request, reply) => {
// //   console.log(request.session);
// //   request.session.set('data', request.body);

// //   // or when using a custom sessionName:
// //   request.customSessionName.set('data', request.body);

// //   reply.send('hello world');
// // });

// // fastify.get('/', (request, reply) => {
// //   console.log(request);
// //   const data = request.session.get('data');
// //   if (!data) {
// //     reply.code(404).send();
// //     return;
// //   }
// //   reply.send(data);
// // });

// // fastify.get('/ping', (request, reply) => {
// //   request.session.options({ maxAge: 3600 });

// //   // Send the session cookie to the client even if the session data didn't change
// //   // can be used to update cookie expiration
// //   request.session.touch();
// //   reply.send('pong');
// // });

// // fastify.post('/logout', (request, reply) => {
// //   request.session.удалить();
// //   reply.send('выход из системы');
// // });
