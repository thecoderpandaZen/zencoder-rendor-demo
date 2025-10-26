// Check if we can get the Render postgres connection details
const http = require('http');

// Render typically provides connection info in the dashboard
// For a free tier postgres, the external connection should be available
// Let's try different hostname formats

const hostnames = [
  'dpg-d3v0t06uk2gs73e76mhg.c0.postgres.render.com',
  'dpg-d3v0t06uk2gs73e76mhg-a.c0.postgres.render.com',
  'dpg-d3v0t06uk2gs73e76mhg.postgres.render.com',
];

hostnames.forEach(host => {
  console.log(`Checking: ${host}`);
});
