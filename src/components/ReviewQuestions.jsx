import { useEffect, useState } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import { CheckCircle2, Brain, PlusCircle, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ReviewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsRef = ref(db, 'questions');
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionsArray = Object.entries(data).map(([id, question]) => ({
          id,
          ...question,
        }));
        setQuestions(questionsArray);
      }
      setLoading(false);
    });
  }, []);

  const markAsReviewed = async (questionId) => {
    try {
      await update(ref(db, `questions/${questionId}`), {
        Y: true
      });
    } catch (error) {
      console.error('Error marking as reviewed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Brain className="h-8 w-8 text-indigo-600" />
          Review Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white rounded-xl p-6 shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff] relative"
            >
              <div className="absolute -top-3 -left-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff] flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-br from-indigo-600 to-indigo-800 text-transparent bg-clip-text">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: question.content }}
                />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Added on {new Date(question.timestamp).toLocaleDateString()}
                </p>
                {!question.Y && (
                  <button
                    onClick={() => markAsReviewed(question.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Reviewed
                  </button>
                )}
                {question.Y && (
                  <span className="text-green-500 flex items-center gap-1">
                    <CheckCircle2 className="h-5 w-5" />
                    Reviewed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No questions available for review.</p>
          </div>
        )}
      </div>
    </>
  );
}