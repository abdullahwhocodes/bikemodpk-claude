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
    brand: 'honda',
    description: '',
    builder_name: '',
    builder_insta: '',
    stock_image: '',
    modified_image: '',
    video_url: '',
    is_featured: false
  })

  // ✅ FILE STATES
  const [stockImageFile, setStockImageFile] = useState(null)
  const [modifiedImageFile, setModifiedImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  // ✅ PARTS MANAGEMENT STATES
  const [parts, setParts] = useState([])
  const [selectedBikeForParts, setSelectedBikeForParts] = useState(null)
  const [partFormData, setPartFormData] = useState({
    name: '',
    description: '',
    image: '',
    buy_link: ''
  })
  const [partImageFile, setPartImageFile] = useState(null)
  const [showAddPartForm, setShowAddPartForm] = useState(false)

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

  const fetchParts = async (bikeId) => {
    setLoading(true)
    const { data } = await supabase
      .from('parts')
      .select('*')
      .eq('bike_id', bikeId)
      .order('created_at', { ascending: true })
    setParts(data || [])
    setLoading(false)
  }

  const uploadImage = async (file, folder) => {
    if (!file) return null

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from('bikes')
      .upload(filePath, file)

    if (error) {
      console.error('Upload error:', error)
      throw error
    }

    // Public URL banao
    const { data: { publicUrl } } = supabase.storage
      .from('bikes')
      .getPublicUrl(filePath)

    return publicUrl
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
    setUploading(true)

    try {
      // ✅ IMAGES UPLOAD KARO PEHLE
      let stockImageUrl = formData.stock_image
      let modifiedImageUrl = formData.modified_image

      if (stockImageFile) {
        stockImageUrl = await uploadImage(stockImageFile, 'stock')
      }

      if (modifiedImageFile) {
        modifiedImageUrl = await uploadImage(modifiedImageFile, 'modified')
      }

      // ✅ CHECK - Dono images honi chahiye
      if (!stockImageUrl || !modifiedImageUrl) {
        alert('Both stock and modified images are required!')
        setUploading(false)
        return
      }

      // ✅ UPDATED DATA
      const dataToSubmit = {
        ...formData,
        stock_image: stockImageUrl,
        modified_image: modifiedImageUrl
      }

      let result

      if (editingBike) {
        result = await supabase
          .from('bikes')
          .update(dataToSubmit)
          .eq('id', editingBike.id)
      } else {
        result = await supabase
          .from('bikes')
          .insert([dataToSubmit])
      }

      // ✅ ERROR CHECK
      if (result.error) {
        console.error('Save error:', result.error)
        alert(`Failed to save: ${result.error.message}`)
        setUploading(false)
        return
      }

      // ✅ SUCCESS - RESET
      setFormData({
        title: '',
        category: 'cafe-racers',
        brand: 'honda',
        description: '',
        builder_name: '',
        builder_insta: '',
        stock_image: '',
        modified_image: '',
        video_url: '',
        is_featured: false
      })
      setStockImageFile(null)
      setModifiedImageFile(null)
      setShowAddForm(false)
      setEditingBike(null)
      setUploading(false)
      fetchBikes()

      alert('✓ Bike saved successfully!')

    } catch (error) {
      console.error('Error:', error)
      alert('Upload failed! Please try again.')
      setUploading(false)
    }
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

  const handlePartSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = partFormData.image

      // Upload image if file selected
      if (partImageFile) {
        imageUrl = await uploadImage(partImageFile, 'parts')
      }

      const dataToSubmit = {
        bike_id: selectedBikeForParts,
        name: partFormData.name,
        description: partFormData.description,
        image: imageUrl,
        buy_link: partFormData.buy_link
      }

      const { error } = await supabase
        .from('parts')
        .insert([dataToSubmit])

      if (error) {
        alert(`Failed to add part: ${error.message}`)
        setUploading(false)
        return
      }

      // Reset
      setPartFormData({
        name: '',
        description: '',
        image: '',
        buy_link: ''
      })
      setPartImageFile(null)
      setShowAddPartForm(false)
      setUploading(false)
      fetchParts(selectedBikeForParts)
      alert('✓ Part added successfully!')

    } catch (error) {
      alert('Failed to add part!')
      setUploading(false)
    }
  }

  const handleDeletePart = async (id) => {
    if (confirm('Delete this part?')) {
      await supabase.from('parts').delete().eq('id', id)
      fetchParts(selectedBikeForParts)
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

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{bikes.length}</h3>
          <p>Total Builds</p>
        </div>
        <div className="stat-card">
          <h3>{comments.length}</h3>
          <p>Total Comments</p>
        </div>
        <div className="stat-card">
          <h3>{bikes.filter(b => b.is_featured).length}</h3>
          <p>Featured</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'bikes' ? 'active' : ''}
          onClick={() => setActiveTab('bikes')}
        >
          Bikes ({bikes.length})
        </button>
        <button
          className={activeTab === 'parts' ? 'active' : ''}
          onClick={() => setActiveTab('parts')}
        >
          Parts Management
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
              setStockImageFile(null)
              setModifiedImageFile(null)
              setFormData({
                title: '',
                category: 'cafe-racers',
                brand: 'honda',
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="admin-input"
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="admin-input"
              >
                <option value="classics">Classics</option>
                <option value="cafe-racers">Cafe Racers</option>
                <option value="scramblers">Scramblers</option>
                <option value="trackers">Trackers</option>
                <option value="choppers">Choppers</option>
                <option value="bobbers">Bobbers</option>
                <option value="tour-bikes">Tour Bikes</option>
                <option value="heavy-bikes">Heavy Bikes</option>
              </select>

              <div className="form-group">
                <label>Brand *</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                  className="admin-input"
                >
                  <option value="honda">Honda</option>
                  <option value="suzuki">Suzuki</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="hi-speed">Hi Speed</option>
                  <option value="kawasaki">Kawasaki</option>
                  <option value="crown-lifan">Crown Lifan</option>
                  <option value="ravi">Ravi</option>
                  <option value="harley-davidson">Harley-Davidson</option>
                  <option value="bmw">BMW</option>
                  <option value="royal-enfield">Royal Enfield</option>
                  <option value="united">United</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="admin-input"
              ></textarea>

              <input
                type="text"
                placeholder="Builder Name"
                value={formData.builder_name}
                onChange={(e) => setFormData({ ...formData, builder_name: e.target.value })}
                className="admin-input"
              />

              <input
                type="text"
                placeholder="Builder Instagram (without @)"
                value={formData.builder_insta}
                onChange={(e) => setFormData({ ...formData, builder_insta: e.target.value })}
                className="admin-input"
              />

              {/* STOCK IMAGE */}
              <div className="form-group">
                <label className="file-label">Stock Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setStockImageFile(e.target.files[0])}
                  className="admin-input"
                  required={!editingBike}
                />
                {stockImageFile && (
                  <p className="file-preview">✓ Selected: {stockImageFile.name}</p>
                )}
              </div>

              {/* MODIFIED IMAGE */}
              <div className="form-group">
                <label className="file-label">Modified Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setModifiedImageFile(e.target.files[0])}
                  className="admin-input"
                  required={!editingBike}
                />
                {modifiedImageFile && (
                  <p className="file-preview">✓ Selected: {modifiedImageFile.name}</p>
                )}
              </div>

              <input
                type="url"
                placeholder="Video URL (YouTube embed)"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="admin-input"
              />

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                Featured on Homepage
              </label>

              <button type="submit" disabled={uploading} className="btn-primary">
                {uploading ? 'Uploading...' : editingBike ? 'Update Bike' : 'Add Bike'}
              </button>
            </form>
          )}

          <div className="admin-list">
            {bikes.map(bike => (
              <div key={bike.id} className="admin-item">
                <div>
                  <h3>{bike.title}</h3>
                  <p className="admin-meta">{bike.category} • {bike.brand} • {bike.builder_name}</p>
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

      {activeTab === 'parts' && (
        <div className="admin-content">

          {!selectedBikeForParts ? (
            <>
              <h3>Select a bike to manage its parts:</h3>
              <div className="admin-list">
                {bikes.map(bike => (
                  <div key={bike.id} className="admin-item">
                    <div>
                      <h3>{bike.title}</h3>
                      <p className="admin-meta">{bike.category}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBikeForParts(bike.id)
                        fetchParts(bike.id)
                      }}
                      className="btn-edit"
                    >
                      Manage Parts
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelectedBikeForParts(null)
                  setParts([])
                  setShowAddPartForm(false)
                }}
                className="btn-back"
              >
                ← Back to Bikes
              </button>

              <button
                className="btn-primary"
                onClick={() => setShowAddPartForm(!showAddPartForm)}
                style={{ marginTop: '1rem' }}
              >
                {showAddPartForm ? 'Cancel' : '+ Add Part'}
              </button>

              {/* ADD PART FORM */}
              {showAddPartForm && (
                <form onSubmit={handlePartSubmit} className="admin-form">

                  <div className="form-group">
                    <label>Part Name *</label>
                    <input
                      type="text"
                      value={partFormData.name}
                      onChange={(e) => setPartFormData({ ...partFormData, name: e.target.value })}
                      required
                      placeholder="e.g., Custom Exhaust"
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      value={partFormData.description}
                      onChange={(e) => setPartFormData({ ...partFormData, description: e.target.value })}
                      required
                      rows="4"
                      placeholder="Describe the part..."
                      className="admin-input"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="file-label">Part Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPartImageFile(e.target.files[0])}
                      className="admin-input"
                    />
                    {partImageFile && (
                      <p className="file-preview">✓ Selected: {partImageFile.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Buy Link (optional)</label>
                    <input
                      type="url"
                      value={partFormData.buy_link}
                      onChange={(e) => setPartFormData({ ...partFormData, buy_link: e.target.value })}
                      placeholder="https://daraz.pk/..."
                      className="admin-input"
                    />
                  </div>

                  <button type="submit" disabled={uploading} className="btn-primary">
                    {uploading ? 'Adding...' : 'Add Part'}
                  </button>

                </form>
              )}

              {/* PARTS LIST */}
              <h3 style={{ marginTop: '2rem' }}>Parts ({parts.length})</h3>
              <div className="admin-list">
                {parts.length === 0 ? (
                  <p style={{ color: 'var(--light)', padding: '2rem', textAlign: 'center' }}>
                    No parts added yet. Click "Add Part" to get started.
                  </p>
                ) : (
                  parts.map(part => (
                    <div key={part.id} className="admin-item">
                      <div>
                        <h3>{part.name}</h3>
                        <p className="admin-meta">{part.description?.substring(0, 80)}...</p>
                        {part.buy_link && (
                          <a href={part.buy_link} target="_blank" className="part-link">
                            🔗 Buy Link
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeletePart(part.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

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
                onChange={(e) => setAdminCommentData({ ...adminCommentData, bike_id: e.target.value })}
                className="admin-input"
                required
              />
              <textarea
                placeholder="Your admin comment..."
                rows="3"
                value={adminCommentData.content}
                onChange={(e) => setAdminCommentData({ ...adminCommentData, content: e.target.value })}
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