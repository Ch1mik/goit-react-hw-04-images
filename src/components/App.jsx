import React, { useState } from "react";
import axios from "axios";
import s from './App.module.css'
import { BASE_URL, API_KEY, SEARCH_PARAMS } from "./Pixabay/Pixabay";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton"
import SpinnerLoader from "./Loader/Loader"
import Modal from "./Modal/Modal";

const App = () => {
  const [hits, setHits] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const toggleModal = (imageURL, tag) => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
    setTags(tag);
  };

  const getValue = ({ name, page }) => {
    setLoading(true);
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            console.log('No images found!');
          } else {
            setHits(response.data.hits);
            setName(name);
            setPage(1);
            setLoading(false);
            setTotalHits(response.data.totalHits);
          }
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadMore = () => {
    if (hits.length < totalHits) {
      setLoading(true);
      try {
        axios
          .get(
            `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page + 1}&${SEARCH_PARAMS}`
          )
          .then(response => {
            setHits(prevHits => [...prevHits, ...response.data.hits]);
            setPage(prevPage => prevPage + 1);
            setLoading(false);
          });
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log('No more images to load!');
    }
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmitHandler={getValue} />
      {hits && (
        <ImageGallery>
          <ImageGalleryItem articles={hits} onImage={toggleModal} />
        </ImageGallery>
      )}
      {showModal && <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />}
      {loading && <SpinnerLoader />}
      {hits.length < totalHits && <LoadMoreButton onButtonClick={loadMore} />}
    </div>
  );
};

export default App;



