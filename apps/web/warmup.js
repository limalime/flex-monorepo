const routes = [
  'http://localhost:3000',
  'http://localhost:3000/dashboard',
  'http://localhost:3000/agent',
  'http://localhost:3000/markets',
  'http://localhost:3000/research',
  'http://localhost:3000/profile',
  'http://localhost:3000/settings',
];

async function warmup() {
  console.log('🔥 Warming up routes...');
  for (const url of routes) {
    try {
      await fetch(url);
      console.log(`✅ Compiled: ${url}`);
    } catch (e) {
      console.log(`❌ Failed: ${url}`);
    }
  }
  console.log('✅ All routes warmed up!');
}

warmup();