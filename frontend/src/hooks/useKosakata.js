import { useEffect, useState } from 'react';
import { kosakataApi } from '../services/kosakataApi';

export function useKosakata() {
  const [kosakata, setKosakata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let aktif = true;

    kosakataApi
      .getAll()
      .then((data) => {
        if (aktif) setKosakata(data);
      })
      .catch((err) => {
        if (aktif) setError(err.message);
      })
      .finally(() => {
        if (aktif) setIsLoading(false);
      });

    return () => {
      aktif = false;
    };
  }, []);

  const tambahKosakata = async (data) => {
    const kosakataBaru = await kosakataApi.create(data);
    setKosakata((daftar) => [kosakataBaru, ...daftar]);
  };

  const ubahKosakata = async (id, perubahan) => {
    const kosakataDiubah = await kosakataApi.update(id, perubahan);
    setKosakata((daftar) =>
      daftar.map((item) => (item.id === id ? kosakataDiubah : item)),
    );
  };

  const hapusKosakata = async (id) => {
    await kosakataApi.remove(id);
    setKosakata((daftar) => daftar.filter((item) => item.id !== id));
  };

  return {
    kosakata,
    isLoading,
    error,
    tambahKosakata,
    ubahKosakata,
    hapusKosakata,
  };
}