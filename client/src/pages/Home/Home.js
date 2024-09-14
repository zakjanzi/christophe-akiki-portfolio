/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import useDataHandler from "../../hooks/useDataHandler";
import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { NODE_ENV } from "../../api/urlConfig";
import VideoCard from "./components/Videos/Videos";
import { useSearchParams } from "react-router-dom";
import LoadingIcon from "../../assets/loading.gif";
import { toastSuccess } from "../../utils/toast";
import { FaShareAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "./styles/home.css";

const ALBUMS = {
  AUTOMOTIVE: "Automotive",
  EXTREME_SPORTS: "Extreme Sports",
  CONCERTS_EVENTS: "Concerts & Events",
  PORTRAITS_MODELING: "Portraits & Modeling",
  STRUCTURES_INTERIORS: "Structures & Interiors",
};

const Home = () => {
  const preloaderRef = useRef();
  const [categoriesForAlbum, setCategoriesForAlbum] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const {
    doFetchAlbums,
    doFetchAllVideos,
    doFetchImagesForAlbum,
    doFetchCategoriesForAlbum,
    doFetchAlbumCategoryImages,
    doSendMail,
  } = useDataHandler();
  const bodyContainerRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingSpinnerIndex, setLoadingSpinnerIndex] = useState(-1);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  }); // The values here are for the mailing form at the end of the page
  const [mailSent, setMailSent] = useState(null);
  const [sendingMail, setSendingMail] = useState(false);
  const [contactFormErrors, setContactFormErrors] = useState(false);

  const resetFormErrors = () => setContactFormErrors(false);

  const onContactFormInputChange = (e) => {
    resetFormErrors();

    const { name, value } = e.target;

    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Reload page when coming from dashboard
  useLayoutEffect(() => {
    if (searchParams.ref !== "main-page") return;

    window.location = window.location.origin;

    window.reload();
  }, [searchParams]);

  // Remove preloader if a random route was visited and then redirected to homepage
  useEffect(() => {
    // HIDE PRELOADER
    document.querySelector(".preloader").classList.add("hide-preloader");

    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function () {
      document
        .querySelectorAll("#intro .animation-container")
        .forEach((animContainer) => {
          setTimeout(function () {
            animContainer.classList.add("run-animation");
          }, animContainer.dataset.animationDelay);
        });
    }, 700);
  }, []);

  // This hook fetches all albums
  useEffect(() => {
    doFetchAlbums()
      .then((res) => {
        if (res.data.success) {
          setAlbums(res.data.albums);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // This hook fetches all videos with their complete details from the backend
  useEffect(() => {
    doFetchAllVideos()
      .then((res) => {
        if (res.data.success) {
          const { videos } = res.data;

          const videosWithUrl = videos.map((video) => {
            return {
              ...video,
              url: `${getDomainUrl()}/images/${video.image}`,
            };
          });

          setVideos(videosWithUrl);
        }
      })
      .catch((err) => {
        console.log("Videos fetch error: ", err);
      });
  }, []);

  const getDomainUrl = () => {
    return NODE_ENV === "dev"
      ? // ? "http://localhost:4000"
        "https://christopheakiki.me"
      : window.location.origin;
  };

  const hideGallery = () => {
    setGalleryPhotos([]);
  };

  const showGallery = async (albumId, categoryId) => {
    // const images = albumsAndCategories[currentAlbum][category]?.map(
    //   (category) => {
    //     return {
    //       original: `${getDomainUrl()}/images/${category.originalName}`,
    //       thumbnail: `${getDomainUrl()}/images/${category.originalName}`,
    //     };
    //   }
    // );
    try {
      const res = await doFetchAlbumCategoryImages(albumId, categoryId);

      if (res.data.success) {
        const images = res.data.images.map((image) => {
          return {
            original: `${getDomainUrl()}/images/${image.originalName}`,
            thumbnail: `${getDomainUrl()}/images/${image.originalName}`,
          };
        });
        setGalleryPhotos(images);

        // Hides the spinner icon
        setLoadingSpinnerIndex(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buildAndShowImageGallery = (albumId) => {
    // Fetch all images in selected album
    doFetchImagesForAlbum(albumId)
      .then((res) => {
        if (res.data.success) {
          // groupImagesIntoAlbumsAndCategories(res.data.images);
          const imagesArr = res.data.images;

          const images = imagesArr?.map((image) => {
            return {
              original: `${getDomainUrl()}/images/${image.originalName}`,
              thumbnail: `${getDomainUrl()}/images/${image.originalName}`,
            };
          });

          setGalleryPhotos(images);
        }
      })
      .catch((err) => {
        console.log("Images fetch error: ", err);
      });
  };

  const getBgSource = () => {
    return window.innerWidth < 641
      ? "/assets/img/background-mobile.png"
      : "/assets/img/background-desktop.png";
  };

  const fetchAndDisplayAlbumCategories = async (albumId) => {
    try {
      const res = await doFetchCategoriesForAlbum(albumId);

      if (res.data.success) {
        setCategoriesForAlbum(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showLoadingSpinner = (index) => {
    setLoadingSpinnerIndex(index);
  };

  const resetCategoriesForAlbum = () => {
    setCategoriesForAlbum([]);
  };

  const validateContactForm = () => {
    const errors = ["*Please provide: "];
    const { name, email, message } = formValues;

    if (name === "") {
      errors.push("- Your name.");
    }

    if (email === "") {
      errors.push("- Your email address.");
    }

    if (message === "") {
      errors.push("- Your message.");
    }

    if (errors.length > 1) {
      setContactFormErrors(errors.join("<br />"));
    }

    return errors;
  };

  const sendMail = async () => {
    const errors = validateContactForm();

    if (errors.length > 1) {
      return;
    }

    try {
      setSendingMail(true);

      const response = await doSendMail(formValues);

      setSendingMail(false);

      if (response.data.success) {
        setMailSent(true);

        setTimeout(() => {
          setMailSent(null);
        }, 5000);
      }
    } catch (error) {
      setMailSent(false);
      setTimeout(() => {
        setMailSent(null);
      }, 5000);
    }
  };

  const copyAlbumLink = (link) => {
    navigator.clipboard.writeText(link);
    toastSuccess("Album link copied");
  };

  return (
    <div
      ref={bodyContainerRef}
      id="home-page"
      className="body-container w-100 h-100"
    >
      {/* PHOTO GALLERY */}
      {galleryPhotos.length > 0 && (
        <div className="modal show bg-dark">
          <div
            className="d-flex justify-content-end cursor-pointer z-2 mt-4 w-100 position-absolute"
            onClick={() => hideGallery()}
          >
            <i className="fa fa-close text-white fs-1 me-4 position-relative cursor-pointer gallery-close-btn"></i>
          </div>
          <ImageGallery items={galleryPhotos} />
        </div>
      )}
      {/* PHOTO GALLERY */}

      {/* PRELOADER */}
      <div className="preloader" ref={preloaderRef}>
        <div className="spinner" />
      </div>
      {/* /PRELOADER */}

      {/* ALBUM CATEGORIES VIEWER */}
      {categoriesForAlbum.length > 0 && (
        <div
          className="categories-modal"
          onClick={() => resetCategoriesForAlbum()}
        >
          <div
            className="categories-container"
            onClick={(e) => e.stopPropagation()}
          >
            {categoriesForAlbum.map((category, index) => {
              return (
                <>
                  <div
                    key={category}
                    className="single-category d-flex flex-column position-relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      showLoadingSpinner(index);
                      showGallery(category.albumId, category._id);
                    }}
                  >
                    {/* Share button icon */}
                    <section
                      className="share-album-container w-100 position-relative"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="share-album-btn"
                        onClick={(e) => {
                          copyAlbumLink(
                            `${window.location.origin}/view-album/${category.link}`
                          );
                        }}
                      >
                        <FaShareAlt />
                      </div>
                    </section>
                    {/* End share button implementation */}
                    <div className="category-content w-100 h-100 position-relative d-flex justify-content-center align-items-center">
                      <img
                        src={`${getDomainUrl()}/images/${category.thumbnail}`}
                        className="w-100 h-100 position-absolute"
                        alt={category.name}
                      />
                      <span className="position-relative text-white">
                        {category.name}
                      </span>
                      <div className="category-content-overlay"></div>
                    </div>

                    {/* LOADING ICON */}
                    <div
                      className={`loading-icon w-100 h-100 d-flex justify-content-center align-items-center position-absolute ${
                        loadingSpinnerIndex === index
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img src={LoadingIcon} alt="loading spinner" />
                    </div>
                    {/* LOADING ICON */}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
      {/* ALBUM CATEGORIES VIEWER */}

      {/* IMAGE CONTAINER */}
      <div className="image-container">
        <div className="background-img" />
        {/* <img
          src={getBgSource()}
          alt="background"
          className="site-bg background-img"
        /> */}
      </div>
      {/* /IMAGE CONTAINER */}

      {/* CONTENT AREA */}
      <div className="content-area">
        {/* CONTENT AREA INNER */}
        <div className="content-area-inner">
          {/* INTRO */}
          <section id="intro">
            {/* CONTAINER MID */}
            <div className="container-mid">
              {/* ANIMATION CONTAINER */}
              <div
                className="animation-container animation-fade-right"
                data-animation-delay={0}
              >
                <h1>
                  Hey, I'm Chris - <br />a visual storyteller.
                </h1>
              </div>
              {/* /ANIMATION CONTAINER */}
              {/* ANIMATION CONTAINER */}
              <div
                className="animation-container animation-fade-right"
                data-animation-delay={200}
              >
                <a href="#about" className="smooth-scroll">
                  Learn More
                  <div className="circle">
                    <i className="fa fa-angle-down" aria-hidden="true" />
                    <i className="fa fa-angle-down" aria-hidden="true" />
                  </div>
                </a>
              </div>
              {/* /ANIMATION CONTAINER */}
            </div>
            {/* /CONTAINER MID */}
          </section>
          {/* /INTRO */}
          {/* ABOUT */}
          <section id="about">
            <h3 className="headline scroll-animated">About Me</h3>
            <p className="scroll-animated">
              Christophe Akiki is a Lebanese photographer and videographer who
              embarked on his creative journey at the age of 18. Over the years,
              his talent and dedication have propelled him to work with an
              impressive array of clients, both in Lebanon and internationally.
              His portfolio includes collaborations with renowned brands and
              personalities spanning various industries, from sports, food, and
              beverages to corporate, fashion, nightlife, and politics.
            </p>
            <p className="scroll-animated">
              Specializing in photography, videography, and post-production,
              Christophe consistently delivers exceptional content tailored to
              meet the unique needs of his clients. His passion for storytelling
              through visuals and his commitment to excellence have earned him
              the trust and satisfaction of those he works with.
            </p>
            <p className="scroll-animated">
              Explore Christophe Akiki's captivating work and discover why he
              stands out in the world of photography and videography.
            </p>
            {/* CLIENTS */}
            {/* <div className="row clients scroll-animated">
              <div className="col-md-3 col-xs-6">
                <img
                  className="img-responsive"
                  src="assets/img/clients/client-1.png"
                  alt="client"
                />
              </div>
              <div className="col-md-3 col-xs-6">
                <img
                  className="img-responsive"
                  src="assets/img/clients/client-1.png"
                  alt="client"
                />
              </div>
              <div className="col-md-3 col-xs-6">
                <img
                  className="img-responsive"
                  src="assets/img/clients/client-1.png"
                  alt="client"
                />
              </div>
            </div> */}
            {/* /CLIENTS */}
          </section>
          {/* /ABOUT */}
          {/* SERVICE */}
          <section id="service">
            <h3 className="headline scroll-animated">Services</h3>
            {/* SERVICE LIST */}
            <ul className="services-list">
              {/* SERVICE ITEM */}
              <li className="service-item scroll-animated">
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  // data-toggle="collapse"
                  // data-target="#collapse-item-1"
                  aria-expanded="false"
                >
                  <span
                    className="rounded-full text-white me-2"
                    style={{ fontSize: "20px", fontWeight: 900 }}
                  >
                    &bull;
                  </span>{" "}
                  Photography
                </button>
              </li>
              {/* /SERVICE ITEM */}
              {/* SERVICE ITEM */}
              <li className="service-item scroll-animated">
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  // data-toggle="collapse"
                  // data-target="#collapse-item-2"
                  aria-expanded="false"
                >
                  <span
                    className="rounded-full text-white me-2"
                    style={{ fontSize: "20px", fontWeight: 900 }}
                  >
                    &bull;
                  </span>{" "}
                  Videography
                </button>
              </li>
              {/* /SERVICE ITEM */}
              {/* SERVICE ITEM */}
              <li className="service-item scroll-animated">
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  // data-toggle="collapse"
                  // data-target="#collapse-item-3"
                  aria-expanded="false"
                >
                  <span
                    className="rounded-full text-white me-2"
                    style={{ fontSize: "20px", fontWeight: 900 }}
                  >
                    &bull;
                  </span>{" "}
                  Post Production
                </button>
              </li>
              {/* /SERVICE ITEM */}
            </ul>
            {/* /SERVICE LIST */}
          </section>
          {/* /SERVICE */}
        </div>
        <div className="w-100 d-flex flex-column align-items-center">
          {/* WORK */}
          <section id="work">
            <h3
              id="portfolio-images"
              className="headline scroll-animated"
              style={{ marginBottom: "1.4em" }}
            >
              Latest Work
            </h3>
            <section id="content" />
            {/* SHOWCASE */}
            <div className="showcase">
              {/* ITEM */}
              {/* Album tiles are placed here */}
              {albums.length > 0 &&
                albums.map((album) => {
                  return (
                    <div
                      className="item scroll-animated"
                      key={album._id}
                      onClick={() => {
                        fetchAndDisplayAlbumCategories(album._id);
                      }}
                    >
                      {/* LIGHTBOX LINK */}
                      <div>
                        {/* INFO */}
                        <div className="info">
                          {/* CONTAINER MID */}
                          <div className="container-mid w-100 px-0">
                            {/* <h5>Petron</h5> */}
                            <p className="w-100 text-center ps-0">
                              - {album.title}
                            </p>
                          </div>
                          {/* /CONTAINER MID */}
                        </div>
                        {/* /INFO */}
                        <div
                          className="background-image"
                          style={{
                            backgroundImage: `url('${getDomainUrl()}/images/${
                              album.thumbnail
                            }')`,
                          }}
                        />
                      </div>

                      {/* /LIGHTBOX LINK */}
                    </div>
                  );
                })}

              {/* /ITEM */}
            </div>

            {/* /SHOWCASE */}
          </section>
          {/* /WORK */}

          {/* VIDEOS */}
          <h3
            className="headline scroll-animated text-start videos-headline"
            style={{ gap: "1rem", marginTop: "1.4em !important" }}
          >
            Videos
          </h3>
          <section id="videos" className="d-flex justify-content-center">
            <div className="d-grid" style={{ gap: "1rem" }}>
              {videos.length > 0 &&
                videos.map((video, index) => (
                  <div className="video-item rounded px-0 mb-5">
                    <VideoCard video={video} buttonColor={"#9ea6e5"} />
                  </div>
                ))}
            </div>
          </section>
          {/* VIDEOS */}
        </div>
        <div className="content-area-inner">
          {/* CONTACT */}
          <section id="contact">
            <h3 className="headline scroll-animated">Contact Me</h3>
            {/* CONTACT FORM */}
            <form
              id="contact-form"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                sendMail();
              }}
            >
              <input
                id="contact-form-name"
                type="text"
                name="name"
                className="form-control scroll-animated"
                placeholder="* Your Name"
                value={formValues.name}
                onChange={onContactFormInputChange}
                required
              />
              <input
                id="contact-form-email"
                type="email"
                name="email"
                className="form-control scroll-animated"
                placeholder="* Your Email"
                value={formValues.email}
                onChange={onContactFormInputChange}
                required
              />
              {/* PHANTOM ELEMENT ( HONEYPOT CAPTCHA FOR SECURITY ) */}
              <div className="fhp-input">
                <input
                  id="contact-form-company"
                  type="text"
                  name="company"
                  className="form-control"
                />
              </div>
              {/* /PHANTOM ELEMENT ( HONEYPOT CAPTCHA FOR SECURITY ) */}
              <textarea
                id="contact-form-message"
                name="message"
                className="form-control scroll-animated"
                placeholder="* Your Message"
                value={formValues.message}
                onChange={onContactFormInputChange}
                required
              />
              {!sendingMail ? (
                <button
                  type="button"
                  onClick={sendMail}
                  className="form-control scroll-animated"
                >
                  Send Message
                  <div className="circle">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    <i className="fa fa-angle-right" aria-hidden="true" />
                  </div>
                </button>
              ) : (
                <p className="form-control px-3 py-2 rounded d-flex flex-row">
                  {/* <img src={LoadingIcon} alt="loading" className="me-2" /> */}
                  <span>Please wait while your message is being sent.</span>
                </p>
              )}

              {/* Form input errors are displayed here if any */}
              {contactFormErrors.length > 1 && (
                <p
                  className="bg-danger text-white mt-4 px-4 py-2 rounded"
                  dangerouslySetInnerHTML={{ __html: contactFormErrors }}
                ></p>
              )}

              {/* Notification on the mail sent */}
              {mailSent !== null && mailSent && (
                <div className="success-message">
                  <i className="fa fa-check" aria-hidden="true" />
                  Message Sent Successfully!
                </div>
              )}

              {/* Notification if mail sending failed */}
              {mailSent !== null && !mailSent && (
                <div className="failure-message">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />
                  Message sending failed.
                </div>
              )}
            </form>
            {/* /CONTACT FORM */}
          </section>
          {/* /CONTACT */}
          {/* FOOTER */}
          <section id="footer">
            {/* SOCIAL ICONS */}
            <ul className="social-icons scroll-animated">
              {/* <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i><i class="fa fa-facebook" aria-hidden="true"></i></a></li> */}
              <li>
                <a href="https://twitter.com/Chris_Akiki" target="_blank">
                  <i className="fa fa-twitter" aria-hidden="true" />
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/christophe_akiki/"
                  target="_blank"
                >
                  <i className="fa fa-instagram" aria-hidden="true" />
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/christopheakiki/"
                  target="_blank"
                >
                  <i className="fa fa-linkedin" aria-hidden="true" />
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </li>
            </ul>
            {/* /SOCIAL ICONS */}
            <p className="scroll-animated">
              © 2024 Christophe Akiki | Built by&nbsp;
              <a href="https://zakjanzi.me" target="_blank">
                Zak.
              </a>
            </p>
          </section>
          {/* /FOOTER */}
        </div>
        {/* /CONTENT AREA INNER */}
      </div>
      {/* /CONTENT AREA */}
      <ToastContainer />
    </div>
  );
};

export default Home;
