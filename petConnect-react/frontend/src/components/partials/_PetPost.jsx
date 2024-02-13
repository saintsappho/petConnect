/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import useFetchData from "../../hooks/useFetchData";
//components
import Event from "./postcards/_Event.jsx";
import Forum from "./postcards/_Forum.jsx";
import Photo from "./postcards/_Photo.jsx";
import Poll from "./postcards/_Poll.jsx";
import Text from "./postcards/_Text.jsx";
import axios from "axios";
import useFormatDateTime from "../../assets/helpers/formatDateTime.js";
import PosterProfile from "../PosterProfile.jsx";
import Modal from '../modals/Modal.jsx';

export default function PetPost(props) {
  const { petPost } = props;
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [user, setUser] = useState({});
  const [inspect, setInspect] = useState(false);
  const [form, setForm] = useState(false);
  const [petData, setPetData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([]); 
  const [adminSettings, setAdminSettings] = useState(false);


  const randomImage = () => {
    return `https://source.unsplash.com/random/300x510?${
      petPost.title || "pet"
    }`;
  };

  const openModal = (event) => {
    event.preventDefault();
    setModal(true);
  };
  const closeModal = (event) => {
    event.preventDefault();
    console.log('closing modal');
    setModalContent([]);
    setModal(false);
  };
  const handleInspect = () => {
    event.preventDefault();
    setInspect(!inspect);
    setModalContent(<PosterProfile user={user} />);
    openModal(event);
  };

  
  function getRandomNumberUpTo15() {
    return Math.floor(Math.random() * 16);
  }

  useEffect(() => { // setUser
    axios
      .get(`http://localhost:8080/users/${petPost.user_id}`)
      .then((response) => {
        setUser(response.data[0]);
      });
  }, []);
  useEffect(() => { // setPetData
    axios
      .get(`http://localhost:8080/pets/${petPost.user_id}`)
      .then((response) => {
        setPetData(response.data[0]);
      });
  }, []);

  useEffect(() => { // setComments
    axios
      .get(`http://localhost:8080/comments/${petPost.post_id}`)
      .then(async (commentsRes) => {
        const commentPromises = commentsRes.data.map(async (comment) => {
          try {
            const userRes = await axios.get(
              `http://localhost:8080/users/${comment.user_id}`,
            );
            const user = userRes.data;
            return (
              <div className="comment-thread">
                <div className="comment" key={comment.comment_id}>
                  <div className="comment-heading">
                    <div className="comment-voting">
                      <button type="button">
                        <span aria-hidden="true">&#9650;</span>
                        <span className="sr-only"></span>
                      </button>
                      <button type="button">
                        <span aria-hidden="true">&#9660;</span>
                        <span className="sr-only"></span>
                      </button>
                    </div>
                    <div className="comment-info">
                      <div onClick={handleInspect} className="user-details">
                        <img
                          src={user[0].profile_picture}
                          alt="profile picture"
                          className="user-profile-picture"
                        ></img>
                        <h4 className="comment__author">{user[0].username}</h4>
                      </div>
                      <p className="m-0">
                        {getRandomNumberUpTo15()} points &bull;{" "}
                        {useFormatDateTime(comment.registration_date)}
                      </p>
                    </div>
                  </div>

                  <div className="comment-body">
                    <p>{comment.content}</p>
                    <button type="button">Reply</button>
                    <button type="button">Flag</button>
                  </div>
                </div>
              </div>
            );
          } catch (error) {
            console.error(
              `Error fetching user for comment ${comment.comment_id}:`,
              error.message,
            );
            return null; // Handle the case where user information cannot be fetched
          }
        });

        Promise.all(commentPromises).then((commentsWithUsers) => {
          setComments(commentsWithUsers.filter((comment) => comment !== null));
        });
      });
  }, [refreshComments]);

  const handleComment = () => {
    setRefreshComments(!refreshComments);
    setForm(false)
  };
  const handleForm = () => {
    setForm(!form);
  }

  return (
    <>
      {modal && (
          <Modal
            modal={modal}
            content={modalContent}
            closeModal={closeModal}
          />
        )}
      {user.username === 'Robin Fleur'  && ( <span onClick={() => {()=>{setAdminSettings(!adminSettings)}}} className="post-options">&#8801;</span>)}
      {adminSettings && (<><button>Edit</button><button>Delete</button></>)}
      {petPost.style === "text-post" && (
        <Text
          user={user}
          petPost={petPost}
          handleComment={handleComment}
          randomImage={randomImage}
          comments={comments}
          inspect={inspect}
          handleInspect={handleInspect}
          form={form}
          handleForm={handleForm}
        />
      )}
      {petPost.style === "photo-post" && (
        <Photo
          user={user}
          petPost={petPost}
          handleComment={handleComment}
          comments={comments}
          randomImage={randomImage}
          inspect={inspect}
          handleInspect={handleInspect}
          form={form}
          handleForm={handleForm}
        />
      )}
      {petPost.style === "poll-post" && (
        <Poll
          user={user}
          petPost={petPost}
          randomImage={randomImage}
          inspect={inspect}
          handleInspect={handleInspect}
        />
      )}
      {petPost.style === "forum-post" && (
        <Forum
          user={user}
          petPost={petPost}
          handleComment={handleComment}
          randomImage={randomImage}
          comments={comments}
          inspect={inspect}
          handleInspect={handleInspect}
          form={form}
          handleForm={handleForm}
        />
      )}
      {petPost.style === "event-post" && (
        <Event
          user={user}
          petPost={petPost}
          randomImage={randomImage}
          inspect={inspect}
          handleInspect={handleInspect}
        />
      )}
    </>
  );
}
