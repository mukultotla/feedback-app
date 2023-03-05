import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import {FeedbackProvider} from './context/FeedbackContext'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')){
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  const addFeedback = (newFeedback) => {
   newFeedback.id = uuidv4()
  //  console.log(newFeedback)
   setFeedback([...feedback, newFeedback])
  }

  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className='container'>
        <Routes>
          <Route path="/" element={
            <>
              <FeedbackForm handleAdd = {addFeedback}/>
              <FeedbackStats/>
              <FeedbackList handleDelete={deleteFeedback}/>
            </>
          }>
          </Route>
            <Route path="/about" element={<AboutPage/>} />
          </Routes>
          <AboutIconLink/>
        </div>
      </BrowserRouter>
    </FeedbackProvider>
  );
}

export default App;
