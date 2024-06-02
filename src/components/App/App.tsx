import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Modal from 'react-modal';

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

import css from './App.module.css';
import ImageModal from '../ImageModal/ImageModal';

const ACCESS_KEY = 'u7TQI_X9qzwH-cnYKH240T3IujFm_wlKq82yGuyvWrM';

interface Image {
  small: string;
  regular: string;
}

interface FetchImagesResponse {
  results: { urls: { small: string; regular: string } }[];
  total_pages: number;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const perPage = 12;

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const fetchImages = async (query: string, page = 1): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: FetchImagesResponse = await response.json();
      const newImages = data.results.map(result => ({
        small: result.urls.small,
        regular: result.urls.regular
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError('Failed to fetch images. Please try again later.');
      toast.error('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const handleLoadMore = () => {
    if (page < totalPages!) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {error ? <ErrorMessage message={error} /> : <ImageGallery images={images} openModal={openModal} />}
      {loading && <Loader isLoading={loading} />}
      {totalPages !== null && totalPages !== page && <LoadMoreBtn onLoadMore={handleLoadMore} hasMore={totalPages !== null && totalPages !== page} />}

    
      {/* {selectedImage && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <img src={selectedImage} alt="Modal" />
          <button className={css.closeButton} onClick={closeModal}>
            Close Modal
          </button>
        </Modal>
      )} */}
      {selectedImage && <ImageModal isOpen={true} imageUrl={selectedImage} closeModal={closeModal} />}
    </div>
  );
}

export default App;
