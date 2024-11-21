import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Brain } from 'lucide-react';

export function Home() {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Brain className="h-8 w-8 text-indigo-600" />
        Today's Questions
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-500">
                Added on {new Date(question.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No questions available yet.</p>
        </div>
      )}
    </div>
  );
}