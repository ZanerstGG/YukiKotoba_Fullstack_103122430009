import { useState } from 'react';

const LEVEL_JLPT = ['N5', 'N4', 'N3', 'N2', 'N1'];

const initialForm = {
  nihongo: '',
  romaji: '',
  arti: '',
  category: '',
  tag: '',
  level: 'N5',
};

export default function KosakataForm({ onAddKosakata }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const tag = form.tag.trim();
    try {
      await onAddKosakata({
        nihongo: form.nihongo.trim(),
        romaji: form.romaji.trim(),
        arti: form.arti.trim(),
        category: form.category.trim(),
        tag: tag || null,
        level: form.level,
      });
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card mb-4 glow-card">
      <div className="card-body p-4">
        <h2 className="h5 mb-1">Tambah Kosakata</h2>
        <p className="small text-body-secondary mb-3">
          Tambahkan kata atau ungkapan Jepang yang ingin Anda pelajari.
        </p>
        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-exclamation-circle-fill" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label" htmlFor="nihongo">Tulisan Jepang</label>
            <input
              className="form-control"
              id="nihongo"
              name="nihongo"
              onChange={handleChange}
              required
              value={form.nihongo}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="romaji">Romaji</label>
            <input
              className="form-control"
              id="romaji"
              name="romaji"
              onChange={handleChange}
              required
              value={form.romaji}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="arti">Arti</label>
            <input
              className="form-control"
              id="arti"
              name="arti"
              onChange={handleChange}
              required
              value={form.arti}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="category">Kategori</label>
            <input
              className="form-control"
              id="category"
              name="category"
              onChange={handleChange}
              required
              value={form.category}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="tag">
              Tag <span className="text-body-secondary small">(opsional)</span>
            </label>
            <input
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
              value={form.tag}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="level">Level JLPT</label>
            <select
              className="form-select"
              id="level"
              name="level"
              onChange={handleChange}
              value={form.level}
            >
              {LEVEL_JLPT.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-danger" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              ) : (
                <i className="bi bi-plus-lg me-2" />
              )}
              {isSubmitting ? 'Menyimpan...' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}