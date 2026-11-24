export default function KosakataList({
  activeWord,
  items,
  onSpeak,
  onToggleHafal,
  onDelete,
  prosesId,
}) {
  const jumlahHafal = items.filter((item) => item.sudahHafal).length;

  return (
    <section className="card glow-card">
      <div className="card-header d-flex justify-content-between align-items-center py-3 px-4">
        <h2 className="h5 mb-0">Daftar Kosakata</h2>
        <div className="d-flex gap-2">
          <span className="badge bg-success-subtle text-success-emphasis">
            {jumlahHafal} hafal
          </span>
          <span className="badge bg-danger-subtle text-danger-emphasis">
            {items.length} kata
          </span>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="card-body py-5 text-center text-body-secondary">
          <i className="bi bi-journal-x fs-2 d-block mb-2" />
          Belum ada data kosakata.
        </div>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map((item) => {
            const sedangDiproses = prosesId === item.id;

            return (
              <li
                key={item.id}
                className={`list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 py-3 px-4 ${
                  activeWord === item.nihongo ? 'bg-body-secondary' : ''
                }`}
              >
                <button
                  type="button"
                  className="btn btn-link text-start text-body text-decoration-none p-0"
                  onClick={() => onSpeak(item.nihongo)}
                  title="Klik untuk mendengarkan lafal"
                >
                  <div className="fs-5 fw-bold d-flex align-items-center gap-2">
                    <span className="serif">{item.nihongo}</span>
                    <i className="bi bi-volume-up text-danger small opacity-75" aria-hidden="true" />
                  </div>
                  <div className="small text-body-secondary">{item.romaji}</div>
                </button>

                <div className="d-flex align-items-center gap-3 ms-sm-auto">
                  <div className="text-sm-end">
                    <div className="fw-semibold">{item.arti}</div>
                    <div className="d-flex flex-wrap gap-1 justify-content-sm-end mt-1">
                      <span className="badge bg-secondary-subtle text-secondary-emphasis border">
                        {item.level}
                      </span>
                      <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="btn-group btn-group-sm" role="group" aria-label={`Aksi untuk ${item.nihongo}`}>
                    <button
                      type="button"
                      className={`btn ${item.sudahHafal ? 'btn-success' : 'btn-outline-success'}`}
                      disabled={sedangDiproses}
                      onClick={() => onToggleHafal(item)}
                      aria-pressed={item.sudahHafal}
                      title={item.sudahHafal ? 'Tandai belum hafal' : 'Tandai sudah hafal'}
                    >
                      <i
                        className={`bi ${item.sudahHafal ? 'bi-check-circle-fill' : 'bi-check-circle'} me-1`}
                        aria-hidden="true"
                      />
                      Hafal
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      disabled={sedangDiproses}
                      onClick={() => onDelete(item)}
                      aria-label={`Hapus ${item.nihongo}`}
                      title="Hapus kosakata"
                    >
                      <i className="bi bi-trash" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}