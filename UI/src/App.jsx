import { useCallback, useEffect, useState } from 'react'
import './App.css'

const API = {
  all: '/products',
  item: (id) => `/product/${encodeURIComponent(id)}`,
  create: '/product',
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    const reason =
      typeof data === 'object' && data
        ? data.message || data.error
        : data
    throw new Error(reason || `HTTP ${response.status}`)
  }

  return data
}

function normalizeProducts(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.products)) return data.products
  if (Array.isArray(data?.data)) return data.data
  return []
}

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null)
  const [lastAction, setLastAction] = useState('GET /products')

  const showError = (message) => setNotice({ type: 'error', message })
  const showSuccess = (message) => setNotice({ type: 'success', message })

  const readAll = useCallback(async (showNotice = true) => {
    setLoading(true)
    setLastAction('GET /products')
    try {
      const data = await apiRequest(API.all)
      const list = normalizeProducts(data)
      setProducts(list)
      if (showNotice) showSuccess(`Loaded ${list.length} product${list.length === 1 ? '' : 's'}.`)
    } catch (error) {
      showError(`Unable to read products. ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    readAll(false)
  }, [readAll])

  const resetForm = () => {
    setEditingId(null)
    setName('')
    setPrice('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setNotice(null)

    const cleanName = name.trim()
    const numericPrice = Number(price)

    if (!cleanName) {
      showError('Please enter a product name.')
      return
    }
    if (price === '' || !Number.isFinite(numericPrice) || numericPrice < 0) {
      showError('Please enter a valid price (zero or greater).')
      return
    }

    setSaving(true)
    const isEditing = editingId !== null
    const url = isEditing ? API.item(editingId) : API.create
    const method = isEditing ? 'PUT' : 'POST'
    setLastAction(`${method} ${url}`)

    try {
      await apiRequest(url, {
        method,
        body: JSON.stringify({ name: cleanName, price: numericPrice }),
      })
      resetForm()
      await readAll(false)
      showSuccess(isEditing ? 'Product updated successfully.' : 'Product created successfully.')
    } catch (error) {
      showError(`Unable to save product. ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (product) => {
    setEditingId(product.id)
    setName(product.name ?? '')
    setPrice(String(product.price ?? ''))
    setNotice({ type: 'info', message: `Editing product #${product.id}. Update the fields and save.` })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}" (ID ${product.id})?`)) return

    setLoading(true)
    const url = API.item(product.id)
    setLastAction(`DELETE ${url}`)
    setNotice(null)

    try {
      await apiRequest(url, { method: 'DELETE' })
      if (String(editingId) === String(product.id)) resetForm()
      await readAll(false)
      showSuccess(`Deleted "${product.name}" successfully.`)
    } catch (error) {
      showError(`Unable to delete product. ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">P</div>
        <div className="hero-copy">
          <div className="eyebrow">WEB DEVELOPMENT · SEMESTER III</div>
          <h1>Product <span>Management</span></h1>
          <p>A simple CRUD dashboard connected to your Node.js API using JavaScript fetch().</p>
          <div className="api-status"><span className="pulse-dot" /> API proxy configured · localhost:3000</div>
        </div>
        <div className="hero-count">
          <span>Total products</span>
          <strong>{products.length}</strong>
          <small>in your JSON database</small>
        </div>
      </header>

      <section className="panel form-panel">
        <div className="panel-heading">
          <div>
            <div className="eyebrow">{editingId !== null ? 'UPDATE RECORD' : 'CREATE RECORD'}</div>
            <h2>{editingId !== null ? `Edit product #${editingId}` : 'Add a product'}</h2>
          </div>
          <span className={`mode-tag ${editingId !== null ? 'editing' : ''}`}>
            {editingId !== null ? 'EDIT MODE' : 'NEW PRODUCT'}
          </span>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Product name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Laptop"
              maxLength={100}
              required
            />
          </label>
          <label className="field">
            <span>Price (₹)</span>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="e.g. 50000"
              min="0"
              step="0.01"
              required
            />
          </label>
          <div className="form-buttons">
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId !== null ? 'Save changes' : '＋ Create product'}
            </button>
            {editingId !== null && (
              <button className="button button-ghost" type="button" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </section>

      <section className="panel records-panel">
        <div className="panel-heading records-heading">
          <div>
            <div className="eyebrow">CRUD OPERATIONS</div>
            <h2>Manage your records</h2>
            <p className="subheading">Create, read, update and delete products from the backend.</p>
          </div>
          <button className="button button-ghost refresh-button" onClick={() => readAll()} disabled={loading}>
            <span className={loading ? 'refresh-icon spinning' : 'refresh-icon'}>↻</span>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        <div className="operation-grid">
          <button className="operation-card op-create" onClick={() => {
            resetForm()
            document.querySelector('.form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}>
            <span className="operation-icon">＋</span>
            <span className="operation-title">Create</span>
            <span className="operation-description">Add a new product</span>
            <span className="operation-method">POST /product</span>
          </button>
          <button className="operation-card op-read" onClick={() => readAll()}>
            <span className="operation-icon">↻</span>
            <span className="operation-title">Read all</span>
            <span className="operation-description">Fetch every product</span>
            <span className="operation-method">GET /products</span>
          </button>
          <button className="operation-card op-update" onClick={() => {
            setNotice({ type: 'info', message: 'Choose Edit in a product row below to load it into the form.' })
          }}>
            <span className="operation-icon">✎</span>
            <span className="operation-title">Update</span>
            <span className="operation-description">Edit a product record</span>
            <span className="operation-method">PUT /product/:id</span>
          </button>
          <button className="operation-card op-delete" onClick={() => {
            setNotice({ type: 'info', message: 'Choose Delete in the matching product row below.' })
          }}>
            <span className="operation-icon">×</span>
            <span className="operation-title">Delete</span>
            <span className="operation-description">Remove a product</span>
            <span className="operation-method">DELETE /product/:id</span>
          </button>
        </div>

        {notice && (
          <div className={`notice notice-${notice.type}`} role="status">
            <span>{notice.type === 'error' ? '!' : notice.type === 'success' ? '✓' : 'i'}</span>
            <p>{notice.message}</p>
            <button aria-label="Dismiss message" onClick={() => setNotice(null)}>×</button>
          </div>
        )}

        <div className="table-toolbar">
          <div>
            <h3>Product inventory</h3>
            <span>{products.length} record{products.length === 1 ? '' : 's'} · latest API response</span>
          </div>
          <span className="live-tag"><span /> LIVE DATA</span>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product details</th>
                <th>Price</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="empty-state">
                      <div className="empty-icon">▤</div>
                      <strong>{loading ? 'Loading products…' : 'No products yet'}</strong>
                      <span>{loading ? 'Waiting for the API response.' : 'Create your first product using the form above.'}</span>
                    </div>
                  </td>
                </tr>
              ) : products.map((product, index) => (
                <tr key={product.id ?? `${product.name}-${index}`}>
                  <td><span className="id-pill">#{product.id ?? '—'}</span></td>
                  <td>
                    <div className="product-cell">
                      <span className="product-avatar">{String(product.name || 'P').slice(0, 1).toUpperCase()}</span>
                      <span className="product-cell-name">{product.name ?? 'Unnamed product'}</span>
                    </div>
                  </td>
                  <td className="price-cell">₹{Number(product.price ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  <td>
                    <div className="row-buttons">
                      <button className="row-button row-edit" onClick={() => startEdit(product)} disabled={product.id == null}>Edit</button>
                      <button className="row-button row-delete" onClick={() => deleteProduct(product)} disabled={loading || product.id == null}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="panel-footer">
          <span>Last request: <code>{lastAction}</code></span>
          <span><i /> React + fetch API</span>
        </footer>
      </section>
      <p className="page-note">Built with React · Vite · Node.js · JSON file storage</p>
    </main>
  )
}

export default App
