import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Brain, CheckCircle2 } from 'lucide-react';

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

  useEffect(() => {
    // Set initial max-height to 50px for each card
    const cards = document.querySelectorAll('.question-card');
    cards.forEach((card) => {
      card.style.maxHeight = '50px';
      card.style.overflow = 'hidden'; // Hide the content that overflows

      // Find the number element inside each card
      const numberElement = card.querySelector('.card-number');
      
      // Add click event listener to the number element to toggle max-height
      numberElement.addEventListener('click', () => {
        // Toggle max-height between 50px and 'none'
        if (card.style.maxHeight === '50px') {
          card.style.maxHeight = 'none';
          card.style.overflow = 'visible'; // Allow the content to overflow when max-height is removed
        } else {
          card.style.maxHeight = '50px';
          card.style.overflow = 'hidden'; // Hide overflow again
        }
      });
    });
  }, [questions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-wrap">
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
      
      <div className="w-full grid grid-cols-1 gap-8" id='card'>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="question-card bg-white rounded-xl p-6 shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff] relative"
          >
            <div className="absolute top-0 left-0">
              <div className="card-number cursor-pointer w-10 h-10 bg-white rounded-lg shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff] flex items-center justify-center">
                <span className="text-lg font-bold bg-gradient-to-br from-indigo-600 to-indigo-800 text-transparent bg-clip-text">
                  {index + 1}
                </span>
              </div>
            </div>
            {question.Y && (
              <div className="absolute top-0 right-0">
                <div className="w-10 h-10 bg-white rounded-lg shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#ffffff] flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </div>
            )}
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
