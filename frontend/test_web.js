async function testWebsite() {
  console.log('========================================');
  console.log('🌐 TESTING SKILLPAD LIVE WEB DEPLOYMENT');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Test Frontend Root Page
    console.log('📌 1. Testing Frontend Accessibility...');
    const frontendRes = await fetch('http://localhost:5173/');
    assert(frontendRes.status === 200, `Frontend root (http://localhost:5173/) returns status 200`);
    const htmlText = await frontendRes.text();
    assert(htmlText.includes('<!doctype html>') || htmlText.includes('<!DOCTYPE html>'), 'Valid HTML document structure returned');
    assert(htmlText.includes('/src/main.jsx'), 'Frontend connects to React entry point (/src/main.jsx)');

    // 2. Test Backend Health & API Root
    console.log('\n📌 2. Testing Backend Health...');
    const backendRes = await fetch('http://localhost:5000/');
    assert(backendRes.status === 200, `Backend root (http://localhost:5000/) returns status 200`);
    const backendText = await backendRes.text();
    assert(backendText.includes('SkillPad API is running'), `Backend responds with "${backendText}"`);

    // 3. Test React main.jsx delivery from Vite dev server
    console.log('\n📌 3. Testing Frontend Assets & Script Compilation...');
    const mainJsxRes = await fetch('http://localhost:5173/src/main.jsx');
    assert(mainJsxRes.status === 200, 'main.jsx is compiled and served by Vite');
    const mainJsxText = await mainJsxRes.text();
    assert(mainJsxText.includes('App'), 'main.jsx mounts App component correctly');

    // 4. Test App.jsx routes compilation
    const appJsxRes = await fetch('http://localhost:5173/src/App.jsx');
    assert(appJsxRes.status === 200, 'App.jsx route module served successfully');

    // 5. Test Live API connectivity from web client perspective
    console.log('\n📌 4. Testing Web Client API Endpoints...');
    // Login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@gmail.com', password: '123456' })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.token, 'Student authentication succeeds via web API');

    // Fetch Tasks
    const tasksRes = await fetch('http://localhost:5000/api/tasks', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    });
    const tasksData = await tasksRes.json();
    assert(tasksRes.status === 200 && Array.isArray(tasksData), `Tasks data retrieved successfully (${tasksData.length} tasks)`);

    // Fetch Students
    const studentsRes = await fetch('http://localhost:5000/api/users/students', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    });
    const studentsData = await studentsRes.json();
    assert(studentsRes.status === 200 && Array.isArray(studentsData), `Students talent pool data retrieved (${studentsData.length} students)`);

    console.log('\n========================================');
    console.log(`🏁 WEBSITE TEST RESULT: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal Website Test Error:', err);
    process.exit(1);
  }
}

testWebsite();
