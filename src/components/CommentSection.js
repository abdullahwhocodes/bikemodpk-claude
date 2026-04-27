'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function CommentSection({ bikeId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newComment.author || !newComment.content) {
      alert('Name aur comment dono zaruri hain!')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('comments')
      .insert([{
        bike_id: bikeId,
        author: newComment.author,
        content: newComment.content,
        is_admin: false
      }])

    if (!error) {
      setNewComment({ author: '', content: '' })
      fetchComments()
    }

    setLoading(false)
  }

  return (
    <div className="comment-section">
      <h2>Comments</h2>

      {/* COMMENT FORM */}
      <form onSubmit={handleSubmit} className="comment-form">
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

      {/* COMMENTS LIST */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Abhi koi comment nahi hai. Pehle aap comment karein!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.author}</strong>
                {comment.is_admin && <span className="admin-badge">ADMIN</span>}
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString('en-PK')}
                </span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}