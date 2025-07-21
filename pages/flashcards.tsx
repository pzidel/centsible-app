▲ Next.js 14.1.0
   Linting and checking validity of types ...
Failed to compile.
./pages/flashcards.tsx:33:22
Type error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ Budgeting: { question: string; answer: string; }[]; Saving: { question: string; answer: string; }[]; }'.
  No index signature with a parameter of type 'string' was found on type '{ Budgeting: { question: string; answer: string; }[]; Saving: { question: string; answer: string; }[]; }'.
  31 |   const [showAnswer, setShowAnswer] = useState(false);
  32 |
> 33 |   const flashcards = categories[category];
     |                      ^
  34 |   const card = flashcards[index];
  35 |
  36 |   return (
Error: Command "npm run build" exited with 1
Exiting build container