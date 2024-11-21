import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CheckSquare, PlusCircle, Save } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export function Admin() {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage({ type: 'error', text: 'Please enter question content' });
      return;
    }

    setSaving(true);
    try {
      await push(ref(db, 'questions'), {
        content,
        timestamp: Date.now(),
      });

      setContent('');
      setMessage({ type: 'success', text: 'Question added successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding question: ' + error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className='flex flex-row w-fit mb-2'>

        <Link
          to="/review"
          className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
        >
          <CheckSquare className="h-4 w-4" />
          Review
        </Link>
        <Link
          to="/admin"
          className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Admin
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Question</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-48 mb-12"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['clean']
                ]
              }}
            />
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Question
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  );
}