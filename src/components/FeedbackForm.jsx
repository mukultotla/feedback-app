import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import Rating from "./Rating"
import FeedbackContext from "../context/FeedbackContext"
function FeedbackForm() {
  const[msg, setMsg] = useState('')
  const[text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if(text === ''){
        setBtnDisabled(true)
        setMsg(null)
    }
    else if(text !== '' && text.trim().length <= 9) {
        setMsg('Text must be atleast 10 characters')
        setBtnDisabled(true)
    }
    else {
        setMsg('')
        setBtnDisabled(false)
    }
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 9){
        const newFeedback = {
            text: text,
            rating: rating
        }
        
        if(feedbackEdit.edit === true){
          updateFeedback(feedbackEdit.item.id, newFeedback)
        }
        else {
         addFeedback(newFeedback)
        }
        setText('')
    }
  }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
          <h2>How would you rate our service?</h2>
          <Rating select={(rating) => setRating(rating)} />
          <div className="input-group">
            <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
          </div>
          {msg && <div className="message">{msg}</div> }
        </form>
    </Card>
  )
}

export default FeedbackForm