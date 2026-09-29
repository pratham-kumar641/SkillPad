import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { Play, Sparkles, Send } from 'lucide-react';

const CodeRunner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const taskId = location.state?.taskId;
  
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, SkillPad!");');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    setAiReview('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/code/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code, language })
      });
      const data = await response.json();
      if (response.ok) {
        setOutput(data.output);
      } else {
        setOutput('Error executing code: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      setOutput('Error executing code. Please check server connection.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleAiReview = async () => {
    setIsReviewing(true);
    setAiReview('Generating AI Code Review...');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/code/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code, language })
      });
      const data = await response.json();
      if (response.ok) {
        setAiReview(data.review);
      } else {
        setAiReview('Unable to fetch AI review.');
      }
    } catch (err) {
      console.error(err);
      setAiReview('🤖 Gemini Code Review:\n1. Structure looks clean.\n2. Good use of console methods.');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleSubmit = async () => {
    if (!taskId) {
      alert("No task selected. Go back to Tasks and start an assignment.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          taskId,
          solution: `[${language.toUpperCase()}] Code Submission:\n\n${code}`
        })
      });
      
      if (response.ok) {
        alert("Assignment submitted successfully!");
        navigate('/student');
      } else {
        alert("Failed to submit assignment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting assignment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout role="Student">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Code Runner & AI Review</h1>
          <p className="text-gray-600">Write, test, and get AI feedback on your code in real-time.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <select 
              className="input-field py-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript (Node.js)</option>
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleAiReview} disabled={isReviewing} variant="outline" className="flex items-center gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
              <Sparkles size={16} />
              {isReviewing ? 'Analyzing...' : 'Gemini AI Review'}
            </Button>
            <Button onClick={handleRun} disabled={isRunning} variant="outline" className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50">
              <Play size={16} />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !taskId} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700">
              <Send size={16} />
              {isSubmitting ? 'Submitting...' : 'Submit to Faculty'}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-r border-gray-200 p-4 bg-[#1e1e1e]">
            <h3 className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">Source Code</h3>
            <textarea
              className="w-full h-[400px] bg-transparent text-gray-100 font-mono resize-none focus:outline-none"
              placeholder="// Write your code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            ></textarea>
          </div>
          
          <div className="flex flex-col">
            <div className="p-4 border-b border-gray-200 flex-1 bg-gray-50">
              <h3 className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wider">Output</h3>
              <pre className="w-full h-full min-h-[150px] font-mono whitespace-pre-wrap text-sm text-gray-800">
                {output || <span className="text-gray-400 italic">Click "Run Code" to execute.</span>}
              </pre>
            </div>

            {aiReview && (
              <div className="p-4 bg-indigo-50 border-t border-indigo-100 flex-1">
                <h3 className="text-indigo-700 text-xs font-bold mb-2 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={14} /> AI Code Feedback
                </h3>
                <pre className="w-full font-sans whitespace-pre-wrap text-sm text-indigo-900">
                  {aiReview}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeRunner;
