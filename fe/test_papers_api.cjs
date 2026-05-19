const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080/api';
const INST_ID = 'f06171ce-c7b2-43d4-88ce-3fc111cacc4e';
const PHONE = '8000000019';
const PASSWORD = 'password';

const IMG1_PATH = '/Users/vignesh/.gemini/antigravity/brain/5ba3ddb7-247a-4630-a034-236aa54a5420/media__1779188532618.png';
const IMG2_PATH = '/Users/vignesh/.gemini/antigravity/brain/5ba3ddb7-247a-4630-a034-236aa54a5420/media__1779188549632.png';

async function runTest() {
  try {
    console.log('1. Logging in as Lecturer...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      institutionId: INST_ID,
      phone: PHONE,
      password: PASSWORD,
      role: 'Lecturer'
    }, {
      headers: {
        'X-Tenant-ID': INST_ID
      }
    });
    
    const token = loginRes.data.accessToken;
    console.log('✅ Logged in successfully. Token received.');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-ID': INST_ID
    };

    console.log('\n2. Fetching students and courses list...');
    const [studentsRes, coursesRes] = await Promise.all([
      axios.get(`${BASE_URL}/staff/papers/students`, { headers }),
      axios.get(`${BASE_URL}/staff/papers/courses`, { headers })
    ]);

    const students = studentsRes.data;
    const courses = coursesRes.data;
    console.log(`✅ Fetched ${students.length} students and ${courses.length} courses.`);

    if (students.length === 0 || courses.length === 0) {
      throw new Error('No student or course records found to test submission.');
    }

    const targetStudent = students[0];
    const targetCourse = courses[0];
    console.log(`Using Student: ${targetStudent.firstName} ${targetStudent.lastName} (${targetStudent.id})`);
    console.log(`Using Course: ${targetCourse.courseName} (${targetCourse.id})`);

    console.log('\n3. Building multipart form data for paper submission...');
    const form = new FormData();
    form.append('studentId', targetStudent.id);
    form.append('courseId', targetCourse.id);
    form.append('examType', 'Mid-Semester Examination');
    form.append('academicYear', '2023 - 2024');
    form.append('section', 'Section A');

    // Append handwritten script pages
    if (fs.existsSync(IMG1_PATH)) {
      form.append('files', fs.createReadStream(IMG1_PATH), 'page1.png');
      console.log('Appended page 1.');
    } else {
      console.error(`Image path 1 not found at: ${IMG1_PATH}`);
    }
    if (fs.existsSync(IMG2_PATH)) {
      form.append('files', fs.createReadStream(IMG2_PATH), 'page2.png');
      console.log('Appended page 2.');
    } else {
      console.error(`Image path 2 not found at: ${IMG2_PATH}`);
    }

    console.log('Sending submission POST request...');
    const submitRes = await axios.post(`${BASE_URL}/staff/papers/submit`, form, {
      headers: {
        ...headers,
        ...form.getHeaders()
      }
    });

    const submissionId = submitRes.data.id;
    console.log(`✅ Submission created successfully. ID: ${submissionId}, Status: ${submitRes.data.status}`);

    console.log('\n4. Polling evaluation job status...');
    let status = submitRes.data.status;
    let attempts = 0;
    while ((status === 'PENDING' || status === 'PROCESSING') && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
      
      const checkRes = await axios.get(`${BASE_URL}/staff/papers/submissions`, { headers });
      const current = checkRes.data.find(s => s.id === submissionId);
      
      if (!current) {
        console.log('Could not find submission in history list.');
        break;
      }
      status = current.status;
      console.log(`Attempt ${attempts}: Status is ${status}`);
    }

    console.log(`\n5. Fetching finalized evaluation report details...`);
    const detailRes = await axios.get(`${BASE_URL}/staff/papers/submissions`, { headers });
    const finalReport = detailRes.data.find(s => s.id === submissionId);
    
    console.log('Report Header:');
    console.log(`- Student: ${finalReport.student.firstName} ${finalReport.student.lastName}`);
    console.log(`- Course: ${finalReport.course.courseName}`);
    console.log(`- Status: ${finalReport.status}`);
    console.log(`- Marks: ${finalReport.marksObtained} / ${finalReport.maxScore}`);
    console.log(`- Overall Feedback: ${finalReport.overallFeedback}`);

    console.log('\nReport Questions Breakdown:');
    finalReport.questions.forEach(q => {
      console.log(`  * Question ${q.questionNumber}: Score = ${q.marksObtained}/${q.maxScore}`);
      console.log(`    Feedback: ${q.feedback}`);
    });

    console.log('\nReport Pages & Extracted OCR Text:');
    finalReport.pages.forEach((p, idx) => {
      console.log(`  * Page ${idx + 1}: URL = ${p.imageUrl}`);
      console.log(`    Extracted OCR text snippet: "${p.ocrText.substring(0, 100).replace(/\n/g, ' ')}..."`);
    });

    console.log('\n🎉 ALL PAPERS EVALUATION END-TO-END TESTS PASSED SUCCESSFUL!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

runTest();
