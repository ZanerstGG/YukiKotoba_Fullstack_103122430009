import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import KosakataForm from '../components/KosakataForm';
import KosakataList from '../components/KosakataList';
import { useKosakata } from '../hooks/useKosakata';
import { speakJapanese } from '../utils/speech';

export default function Kosakata({ setActiveTab }) {
  const { kosakata, isLoading, error, tambahKosakata } = useKosakata();
  const [activeWord, setActiveWord] = useState(null);

  const handleSpeak = (nihongo) => {
    setActiveWord(nihongo);
    speakJapanese(nihongo);
    setTimeout(() => setActiveWord(null), 500);
  };

  return (
    <div className="container-xl py-4">
      <div className="row g-4">
        <main className="col-lg-8">
          <section className="card mb-4 overflow-hidden glow-card border-0 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center gap-3 p-4">
              <div>
                <h1 className="h3">Kosakata &amp; Ungkapan (言葉)</h1>
                <p className="text-body-secondary mb-0">
                  Ungkapan praktis dan tata krama esensial yang langsung dapat Anda gunakan saat bertegur sapa, memesan makanan, atau bepergian.
                </p>
              </div>
              <span className="display-3 text-danger serif">語</span>
            </div>
          </section>

          <KosakataForm onAddKosakata={tambahKosakata} />

          {isLoading ? (
            <div className="card glow-card">
              <div className="card-body py-5 text-center text-body-secondary">
                <div className="spinner-border text-danger mb-2" role="status" aria-hidden="true" />
                <div>Memuat kosakata dari server...</div>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : (
            <KosakataList
              activeWord={activeWord}
              items={kosakata}
              onSpeak={handleSpeak}
            />
          )}
        </main>

        <Sidebar setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}