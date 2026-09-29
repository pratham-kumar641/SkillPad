async function runFullSiteTest() {
  console.log('====================================================');
  console.log('🌐 FULL SITE END-TO-END AUTOMATION & ROUTE TESTING');
  console.log('====================================================\n');

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

  const routes = [
    '/',
    '/login',
    '/register',
    '/student',
    '/student/tasks',
    '/student/sprint',
    '/student/code-runner',
    '/student/project-submission',
    '/student/progress',
    '/student/leaderboard',
    '/student/profile',
    '/faculty',
    '/faculty/tasks',
    '/faculty/tasks/create',
    '/faculty/submissions',
    '/faculty/students',
    '/faculty/analytics',
    '/faculty/profile',
    '/recruiter',
    '/recruiter/students',
    '/recruiter/projects',
    '/recruiter/performance',
    '/recruiter/profile'
  ];

  try {
    // ----------------------------------------------------
    // 1. ROUTE ACCESSIBILITY (SPA ROUTING & VITE SERVING)
    // ----------------------------------------------------
    console.log('📌 1. Testing HTTP & SPA Route Delivery (23 Frontend Routes)...');
    for (const route of routes) {
      const res = await fetch(`http://localhost:5173${route}`);
      assert(res.status === 200, `Route [${route}] served with HTTP 200`);
    }

    // ----------------------------------------------------
    // 2. BACKEND API HEALTH & CONNECTIVITY
    // ----------------------------------------------------
    console.log('\n📌 2. Testing Backend Health & API Root...');
    const apiRoot = await fetch('http://localhost:5000/');
    const apiText = await apiRoot.text();
    assert(apiRoot.status === 200 && apiText.includes('SkillPad API is running'), 'Backend API Root is active');

    // ----------------------------------------------------
    // 3. COMPLETE STUDENT WORKFLOW TEST
    // ----------------------------------------------------
    console.log('\n📌 3. Simulating Student Workflow...');
    // Login
    const stuLoginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@gmail.com', password: '123456' })
    });
    const stuLogin = await stuLoginRes.json();
    assert(stuLoginRes.status === 200 && stuLogin.token, 'Student logged in successfully');
    const stuToken = stuLogin.token;

    // Student runs code
    const runRes = await fetch('http://localhost:5000/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${stuToken}` },
      body: JSON.stringify({ code: 'console.log("Testing SkillPad runner");', language: 'javascript' })
    });
    const runData = await runRes.json();
    assert(runRes.status === 200 && runData.output, 'Student code execution completed');

    // Student requests AI review
    const revRes = await fetch('http://localhost:5000/api/code/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${stuToken}` },
      body: JSON.stringify({ code: 'const sum = (a, b) => a + b;', language: 'javascript' })
    });
    const revData = await revRes.json();
    assert(revRes.status === 200 && revData.review, 'Student received AI Code Review');

    // Student submits new project
    const projRes = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${stuToken}` },
      body: JSON.stringify({
        projectName: 'Automated E2E Test App',
        description: 'React + Node test submission',
        githubUrl: 'https://github.com/student/e2e-test',
        liveUrl: 'https://e2e-test.demo.com'
      })
    });
    const newProj = await projRes.json();
    assert(projRes.status === 200 && newProj._id, `Student submitted project (ID: ${newProj._id})`);

    // ----------------------------------------------------
    // 4. COMPLETE FACULTY WORKFLOW TEST
    // ----------------------------------------------------
    console.log('\n📌 4. Simulating Faculty Workflow...');
    // Login
    const facLoginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'faculty@gmail.com', password: '123456' })
    });
    const facLogin = await facLoginRes.json();
    assert(facLoginRes.status === 200 && facLogin.token, 'Faculty logged in successfully');
    const facToken = facLogin.token;

    // Faculty creates task
    const taskRes = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${facToken}` },
      body: JSON.stringify({
        title: 'E2E Fullstack Integration Task',
        description: 'Verify database and API connectivity across modules.',
        category: 'Testing',
        difficulty: 'Medium',
        deadline: '2026-11-01'
      })
    });
    const newTask = await taskRes.json();
    assert(taskRes.status === 201 && newTask._id, `Faculty created engineering task (ID: ${newTask._id})`);

    // Faculty reviews student project
    const evalRes = await fetch(`http://localhost:5000/api/projects/${newProj._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${facToken}` },
      body: JSON.stringify({
        score: 98,
        feedback: 'Outstanding test suite and robust implementation.',
        status: 'Reviewed'
      })
    });
    const evalData = await evalRes.json();
    assert(evalRes.status === 200 && evalData.status === 'Reviewed' && evalData.score === 98, 'Faculty evaluated & scored student project (Score: 98)');

    // ----------------------------------------------------
    // 5. COMPLETE RECRUITER WORKFLOW TEST
    // ----------------------------------------------------
    console.log('\n📌 5. Simulating Recruiter Workflow...');
    // Login
    const recLoginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'recruiter@gmail.com', password: '123456' })
    });
    const recLogin = await recLoginRes.json();
    assert(recLoginRes.status === 200 && recLogin.token, 'Recruiter logged in successfully');
    const recToken = recLogin.token;

    // Recruiter views verified projects
    const recProjectsRes = await fetch('http://localhost:5000/api/projects', {
      headers: { 'Authorization': `Bearer ${recToken}` }
    });
    const recProjects = await recProjectsRes.json();
    const foundReviewed = recProjects.find(p => p._id === newProj._id);
    assert(recProjectsRes.status === 200 && foundReviewed && foundReviewed.score === 98, 'Recruiter sees faculty-verified project and score in talent pool');

    // Recruiter views talent list
    const recStudentsRes = await fetch('http://localhost:5000/api/users/students', {
      headers: { 'Authorization': `Bearer ${recToken}` }
    });
    const recStudents = await recStudentsRes.json();
    assert(recStudentsRes.status === 200 && recStudents.length > 0, `Recruiter browsed talent directory (${recStudents.length} candidates)`);

    console.log('\n====================================================');
    console.log(`🏁 FULL END-TO-END TEST RESULT: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exit(1);
  }
}

runFullSiteTest();
