const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const BASE_URL = 'http://localhost:5000/api';

let studentToken = '';
let facultyToken = '';
let recruiterToken = '';
let studentUser = null;
let createdTaskId = '';
let createdSprintId = '';
let createdProjectId = '';
let createdSubmissionId = '';

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

async function runTests() {
  console.log('========================================');
  console.log('🚀 RUNNING SKILLPAD COMPREHENSIVE TEST SUITE');
  console.log('========================================\n');

  try {
    
    
    
    console.log('📌 1. Testing Auth Module...');

    
    const testEmail = `test_student_${Date.now()}@example.com`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student',
        email: testEmail,
        password: 'password123',
        role: 'Student'
      })
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, `Register new user -> status 201 (${regData.message || ''})`);

    
    const dupRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Duplicate',
        email: testEmail,
        password: 'password123',
        role: 'Student'
      })
    });
    assert(dupRes.status === 400, 'Duplicate registration rejected with 400');

    
    const invalidLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'wrongpassword'
      })
    });
    assert(invalidLoginRes.status === 400, 'Invalid password rejected with 400');

    
    const studentLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@gmail.com',
        password: '123456'
      })
    });
    const studentData = await studentLoginRes.json();
    assert(studentLoginRes.status === 200 && studentData.token, 'Student login successful with JWT');
    studentToken = studentData.token;
    studentUser = studentData.user;

    
    const facultyLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'faculty@gmail.com',
        password: '123456'
      })
    });
    const facultyData = await facultyLoginRes.json();
    assert(facultyLoginRes.status === 200 && facultyData.token, 'Faculty login successful with JWT');
    facultyToken = facultyData.token;

    
    const recruiterLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'recruiter@gmail.com',
        password: '123456'
      })
    });
    const recruiterData = await recruiterLoginRes.json();
    assert(recruiterLoginRes.status === 200 && recruiterData.token, 'Recruiter login successful with JWT');
    recruiterToken = recruiterData.token;

    
    
    
    console.log('\n📌 2. Testing Tasks Module...');

    
    const unauthTasksRes = await fetch(`${BASE_URL}/tasks`);
    assert(unauthTasksRes.status === 401, 'Unauthorized request without token rejected (401)');

    
    const createTaskRes = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${facultyToken}`
      },
      body: JSON.stringify({
        title: 'Build JWT Authentication Middleware',
        description: 'Implement secure JWT middleware with role-based checks.',
        category: 'Backend Development',
        difficulty: 'Medium',
        deadline: '2026-10-15'
      })
    });
    const createdTask = await createTaskRes.json();
    assert(createTaskRes.status === 201 && createdTask._id, `Create task successful (ID: ${createdTask._id})`);
    createdTaskId = createdTask._id;

    
    const getTasksRes = await fetch(`${BASE_URL}/tasks`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const allTasks = await getTasksRes.json();
    assert(getTasksRes.status === 200 && Array.isArray(allTasks), `Get all tasks returns array (Count: ${allTasks.length})`);

    
    const updateTaskRes = await fetch(`${BASE_URL}/tasks/${createdTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${facultyToken}`
      },
      body: JSON.stringify({
        title: 'Build Advanced JWT Authentication Middleware',
        difficulty: 'Hard'
      })
    });
    const updatedTask = await updateTaskRes.json();
    assert(updateTaskRes.status === 200 && updatedTask.title.includes('Advanced'), 'Update task details successful');

    
    const patchStatusRes = await fetch(`${BASE_URL}/tasks/${createdTaskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({ status: 'In Progress' })
    });
    const patchedTask = await patchStatusRes.json();
    assert(patchStatusRes.status === 200 && patchedTask.status === 'In Progress', 'Update task status to "In Progress" successful');

    
    
    
    console.log('\n📌 3. Testing Sprint Module...');

    
    const createSprintRes = await fetch(`${BASE_URL}/sprints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${facultyToken}`
      },
      body: JSON.stringify({
        name: 'Sprint 2: Authentication & Security',
        goal: 'Complete auth system and middleware protection',
        startDate: '2026-10-01',
        endDate: '2026-10-15',
        tasks: [createdTaskId]
      })
    });
    const createdSprint = await createSprintRes.json();
    assert(createSprintRes.status === 201 && createdSprint._id, `Create sprint successful (ID: ${createdSprint._id})`);
    createdSprintId = createdSprint._id;

    
    const getSprintsRes = await fetch(`${BASE_URL}/sprints`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const allSprints = await getSprintsRes.json();
    assert(getSprintsRes.status === 200 && Array.isArray(allSprints), `Get sprints returns populated list (Count: ${allSprints.length})`);

    
    const updateSprintRes = await fetch(`${BASE_URL}/sprints/${createdSprintId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${facultyToken}`
      },
      body: JSON.stringify({ goal: 'Updated: Full production security audit' })
    });
    const updatedSprint = await updateSprintRes.json();
    assert(updateSprintRes.status === 200 && updatedSprint.goal.includes('Full production'), 'Update sprint goal successful');

    
    
    
    console.log('\n📌 4. Testing Code Runner & AI Review...');

    
    const runCodeRes = await fetch(`${BASE_URL}/code/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        code: 'function add(a, b) { return a + b; }\nconsole.log(add(2, 3));',
        language: 'javascript'
      })
    });
    const runCodeData = await runCodeRes.json();
    assert(runCodeRes.status === 200 && runCodeData.output, `Run code execution output received: "${runCodeData.output.slice(0, 30)}..."`);

    
    const reviewCodeRes = await fetch(`${BASE_URL}/code/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        code: 'const x = 10; const y = 20; console.log(x + y);',
        language: 'javascript'
      })
    });
    const reviewCodeData = await reviewCodeRes.json();
    assert(reviewCodeRes.status === 200 && reviewCodeData.review, `AI Code Review received: "${reviewCodeData.review.slice(0, 30)}..."`);

    
    
    
    console.log('\n📌 5. Testing Project Submissions & Faculty Evaluation...');

    
    const createProjectRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        projectName: 'SkillPad MERN Platform',
        description: 'Complete engineering simulation platform with multi-role access.',
        githubUrl: 'https://github.com/student/skillpad',
        liveUrl: 'https://skillpad.vercel.app'
      })
    });
    const createdProject = await createProjectRes.json();
    assert(createProjectRes.status === 200 && createdProject._id, `Submit project successful (ID: ${createdProject._id})`);
    createdProjectId = createdProject._id;

    
    const evaluateRes = await fetch(`${BASE_URL}/projects/${createdProjectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${facultyToken}`
      },
      body: JSON.stringify({
        score: 95,
        feedback: 'Exceptional architecture, clean code structure, and solid test coverage.',
        status: 'Reviewed'
      })
    });
    const evaluatedProject = await evaluateRes.json();
    assert(evaluateRes.status === 200 && evaluatedProject.score === 95 && evaluatedProject.status === 'Reviewed', 'Faculty project evaluation (score: 95, status: Reviewed) successful');

    
    const getProjectsRes = await fetch(`${BASE_URL}/projects`, {
      headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    const projectsList = await getProjectsRes.json();
    assert(getProjectsRes.status === 200 && projectsList.some(p => p._id === createdProjectId), 'Recruiter can view submitted & reviewed projects');

    
    
    
    console.log('\n📌 6. Testing Task Code Submissions...');

    
    const createSubRes = await fetch(`${BASE_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        taskId: createdTaskId,
        solution: 'function verifyAuth(req, res, next) { /* verified */ next(); }'
      })
    });
    const createdSub = await createSubRes.json();
    assert(createSubRes.status === 200 && createdSub._id, `Submit task assignment solution successful (ID: ${createdSub._id})`);
    createdSubmissionId = createdSub._id;

    
    const getSubsRes = await fetch(`${BASE_URL}/submissions`, {
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    const subsList = await getSubsRes.json();
    assert(getSubsRes.status === 200 && subsList.some(s => s._id === createdSubmissionId), 'Faculty can retrieve all task code submissions');

    
    
    
    console.log('\n📌 7. Testing User Management & Student Portfolios...');

    
    const getStudentsRes = await fetch(`${BASE_URL}/users/students`, {
      headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    const studentsList = await getStudentsRes.json();
    assert(getStudentsRes.status === 200 && studentsList.length > 0, `Get all students returns enrolled list (Count: ${studentsList.length})`);

    
    const studentIdToFetch = studentUser.id;
    const portfolioRes = await fetch(`${BASE_URL}/users/students/${studentIdToFetch}`, {
      headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    const portfolioData = await portfolioRes.json();
    assert(portfolioRes.status === 200 && portfolioData.student && Array.isArray(portfolioData.projects), `Student Portfolio retrieved with projects & submissions (Projects: ${portfolioData.projects.length})`);

    
    
    
    console.log('\n📌 8. Testing Deletion & Cleanup Endpoints...');

    
    const deleteSprintRes = await fetch(`${BASE_URL}/sprints/${createdSprintId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    assert(deleteSprintRes.status === 200, 'Delete sprint successful');

    
    const deleteTaskRes = await fetch(`${BASE_URL}/tasks/${createdTaskId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${facultyToken}` }
    });
    assert(deleteTaskRes.status === 200, 'Delete task successful');

    console.log('\n========================================');
    console.log(`🏁 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exit(1);
  }
}

runTests();
