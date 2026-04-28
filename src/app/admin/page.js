'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()
  const [bikes, setBikes] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('bikes')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBike, setEditingBike] = useState(null)
  const [adminCommentData, setAdminCommentData] = useState({ bike_id: '', content: '' })
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'cafe-racers',
    description: '',
    builder_name: '',
    builder_insta: '',
    stock_image: '',
    modified_image: '',
    video_url: '',
    is_featured: false
  })

  const fetchBikes = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('bikes')
      .select('*')
      .order('created_at', { ascending: false })
    setBikes(data || [])
    setLoading(false)
  }

  const fetchComments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('comments')
      .select('*, bikes(title)')
      .order('created_at', { ascending: false })
    setComments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [router])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/admin/login')
      return
    }
    
    fetchBikes()
    fetchComments()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let result

    if (editingBike) {
      result = await supabase
        .from('bikes')
        .update(formData)
        .eq('id', editingBike.id)
    } else {
      result = await supabase
        .from('bikes')
        .insert([formData])
    }

    // ✅ ERROR CHECK
    if (result.error) {
      console.error('Save error:', result.error)
      alert(`Failed to save: ${result.error.message}`)
      setLoading(false)
      return
    }

    // ✅ SUCCESS - RESET FORM
    setFormData({
      title: '',
      category: 'cafe-racers',
      description: '',
      builder_name: '',
      builder_insta: '',
      stock_image: '',
      modified_image: '',
      video_url: '',
      is_featured: false
    })
    setShowAddForm(false)
    setEditingBike(null)
    setLoading(false)
    fetchBikes()
    
    alert('✓ Bike saved successfully!')
  }

  const handleEdit = (bike) => {
    setFormData(bike)
    setEditingBike(bike)
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this bike?')) {
      await supabase.from('bikes').delete().eq('id', id)
      fetchBikes()
    }
  }

  const handleDeleteComment = async (id) => {
    if (confirm('Delete this comment?')) {
      await supabase.from('comments').delete().eq('id', id)
      fetchComments()
    }
  }

  const handlePostAdminComment = async (e) => {
    e.preventDefault()
    
    if (!adminCommentData.bike_id || !adminCommentData.content.trim()) {
      alert('Please fill in all fields')
      return
    }

    const { error } = await supabase.from('comments').insert([{
      bike_id: adminCommentData.bike_id,
      author: 'BikeModPK Admin',
      content: adminCommentData.content,
      is_admin: true
    }])

    if (!error) {
      setAdminCommentData({ bike_id: '', content: '' })
      fetchComments()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="admin-dashboard">
      
      <div className="admin-header">
        <h1>ADMIN DASHBOARD</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'bikes' ? 'active' : ''}
          onClick={() => setActiveTab('bikes')}
        >
          Bikes ({bikes.length})
        </button>
        <button 
          className={activeTab === 'comments' ? 'active' : ''}
          onClick={() => setActiveTab('comments')}
        >
          Comments ({comments.length})
        </button>
      </div>

      {activeTab === 'bikes' && (
        <div className="admin-content">
          
          <button 
            className="btn-primary"
            onClick={() => {
              setShowAddForm(!showAddForm)
              setEditingBike(null)
              setFormData({
                title: '',
                category: 'cafe-racers',
                description: '',
                builder_name: '',
                builder_insta: '',
                stock_image: '',
                modified_image: '',
                video_url: '',
                is_featured: false
              })
            }}
          >
            {showAddForm ? 'Cancel' : '+ Add New Bike'}
          </button>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="admin-form">
              <input
                type="text"
                placeholder="Bike Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="admin-input"
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="admin-input"
              >
                <option value="cafe-racers">Cafe Racers</option>
                <option value="scramblers">Scramblers</option>
                <option value="trackers">Trackers</option>
                <option value="choppers">Choppers</option>
                <option value="classics">Classics</option>
                <option value="cruisers">Cruisers</option>
                <option value="heavy-bikes">Heavy Bikes</option>
              </select>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="admin-input"
              ></textarea>

              <input
                type="text"
                placeholder="Builder Name"
                value={formData.builder_name}
                onChange={(e) => setFormData({...formData, builder_name: e.target.value})}
                className="admin-input"
              />

              <input
                type="text"
                placeholder="Builder Instagram (without @)"
                value={formData.builder_insta}
                onChange={(e) => setFormData({...formData, builder_insta: e.target.value})}
                className="admin-input"
              />

              <input
                type="url"
                placeholder="Stock Image URL"
                value={formData.stock_image}
                onChange={(e) => setFormData({...formData, stock_image: e.target.value})}
                className="admin-input"
              />

              <input
                type="url"
                placeholder="Modified Image URL"
                value={formData.modified_image}
                onChange={(e) => setFormData({...formData, modified_image: e.target.value})}
                className="admin-input"
              />

              <input
                type="url"
                placeholder="Video URL (YouTube embed)"
                value={formData.video_url}
                onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                className="admin-input"
              />

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                />
                Featured on Homepage
              </label>

              <button type="submit" className="btn-primary">
                {editingBike ? 'Update Bike' : 'Add Bike'}
              </button>
            </form>
          )}

          <div className="admin-list">
            {bikes.map(bike => (
              <div key={bike.id} className="admin-item">
                <div>
                  <h3>{bike.title}</h3>
                  <p className="admin-meta">{bike.category} • {bike.builder_name}</p>
                  {bike.is_featured && <span className="featured-badge">FEATURED</span>}
                </div>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(bike)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(bike.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'comments' && (
        <div className="admin-content">
          
          {/* ADMIN COMMENT FORM */}
          <div className="admin-comment-box">
            <h3>Post as Admin</h3>
            <form onSubmit={handlePostAdminComment} className="admin-form">
              <input 
                type="text" 
                placeholder="Bike ID" 
                value={adminCommentData.bike_id}
                onChange={(e) => setAdminCommentData({...adminCommentData, bike_id: e.target.value})}
                className="admin-input"
                required
              />
              <textarea 
                placeholder="Your admin comment..." 
                rows="3"
                value={adminCommentData.content}
                onChange={(e) => setAdminCommentData({...adminCommentData, content: e.target.value})}
                className="admin-input"
                required
              ></textarea>
              <button type="submit" className="btn-primary">Post Comment</button>
            </form>
          </div>

          {/* EXISTING COMMENTS LIST */}
          <div className="admin-list">
            {comments.map(comment => (
              <div key={comment.id} className="admin-item">
                <div>
                  <h4>{comment.author}{comment.is_admin && <span className="admin-badge"> (ADMIN)</span>}</h4>
                  <p className="comment-preview">{comment.content}</p>
                  <p className="admin-meta">
                    on {comment.bikes?.title} • {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button onClick={() => handleDeleteComment(comment.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}