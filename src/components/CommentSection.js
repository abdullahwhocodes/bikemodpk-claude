'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function CommentSection({ bikeId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyData, setReplyData] = useState({ author: '', content: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [bikeId])

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('bike_id', bikeId)
      .order('created_at', { ascending: false })

    setComments(data || [])
  }

  // Main comment submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newComment.author || !newComment.content) {
      alert('Name aur comment dono zaruri hain!')
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        bike_id: bikeId,
        author: newComment.author,
        content: newComment.content,
        is_admin: false,
        parent_id: null
      }])
      .select()

    if (error) {
      console.error('Comment error:', error)
      alert(`Failed to post comment: ${error.message}`)
      setLoading(false)
      return
    }

    console.log('Comment posted:', data)
    setNewComment({ author: '', content: '' })
    fetchComments()
    setLoading(false)
  }

  // Reply submit
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault()
    
    if (!replyData.author || !replyData.content) {
      alert('Name aur reply dono zaruri hain!')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('comments')
      .insert([{
        bike_id: bikeId,
        author: replyData.author,
        content: replyData.content,
        is_admin: false,
        parent_id: parentId
      }])

    if (error) {
      console.error('Reply error:', error)
      alert(`Failed to post reply: ${error.message}`)
      setLoading(false)
      return
    }

    setReplyData({ author: '', content: '' })
    setReplyingTo(null)
    fetchComments()
    setLoading(false)
  }

  // Get replies for a comment
  const getReplies = (parentId) => {
    return comments.filter(c => c.parent_id === parentId)
  }

  // Get only parent comments (not replies)
  const parentComments = comments.filter(c => !c.parent_id)

  return (
    <div className="comment-section">
      <h2>Comments ({parentComments.length})</h2>

      {/* COMMENTS LIST - NOW AT TOP */}
      <div className="comments-list">
        {parentComments.length === 0 ? (
          <p className="no-comments">Abhi koi comment nahi hai. Pehle aap comment karein!</p>
        ) : (
          parentComments.map(comment => (
            <div key={comment.id} className="comment-thread">
              
              {/* PARENT COMMENT */}
              <div className="comment-card">
                <div className="comment-header">
                  <strong>{comment.author}</strong>
                  {comment.is_admin && <span className="admin-badge">ADMIN</span>}
                  <span className="comment-date">
                    {new Date(comment.created_at).toLocaleDateString('en-PK')}
                  </span>
                </div>
                <p className="comment-text">{comment.content}</p>
                <button 
                  className="reply-btn"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  💬 Reply
                </button>
              </div>

              {/* REPLIES */}
              {getReplies(comment.id).map(reply => (
                <div key={reply.id} className="comment-card reply-card">
                  <div className="comment-header">
                    <strong>{reply.author}</strong>
                    {reply.is_admin && <span className="admin-badge">ADMIN</span>}
                    <span className="comment-date">
                      {new Date(reply.created_at).toLocaleDateString('en-PK')}
                    </span>
                  </div>
                  <p className="comment-text">{reply.content}</p>
                </div>
              ))}

              {/* REPLY FORM */}
              {replyingTo === comment.id && (
                <form 
                  onSubmit={(e) => handleReplySubmit(e, comment.id)} 
                  className="reply-form"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={replyData.author}
                    onChange={(e) => setReplyData({ ...replyData, author: e.target.value })}
                    className="comment-input"
                  />
                  <textarea
                    placeholder="Write your reply..."
                    value={replyData.content}
                    onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
                    rows="3"
                    className="comment-textarea"
                  ></textarea>
                  <div className="reply-actions">
                    <button type="submit" disabled={loading} className="btn-primary-small">
                      {loading ? 'Posting...' : 'Post Reply'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyData({ author: '', content: '' })
                      }}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

            </div>
          ))
        )}
      </div>

      {/* COMMENT FORM - NOW AT BOTTOM */}
      <form onSubmit={handleSubmit} className="comment-form">
        <h3>Leave a Comment</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          className="comment-input"
        />
        <textarea
          placeholder="Write your comment..."
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          rows="4"
          className="comment-textarea"
        ></textarea>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

    </div>
  )
}