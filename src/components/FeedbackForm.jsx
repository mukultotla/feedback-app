import { useState } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
function FeedbackForm() {
  const[text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const[msg, setMsg] = useState('')
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
  return (
    <Card>
        <form>
            <h2>How would you rate our service?</h2>
            { /* rating select component */}
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