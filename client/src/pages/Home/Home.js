/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import useDataSaver from "../../hooks/useDataSaver";
import CategoryFolderIcon from "./images/category-folder.svg";
import ImageGallery from "react-image-gallery";
import "./styles/home.css";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { NODE_ENV, PROD_BASE_URL } from "../../api/urlConfig";
import VideoCard from "./components/Videos/Videos";
import { useLocation } from "react-router-dom";

const ALBUMS = {
  AUTOMOTIVE: "Automotive",
  EXTREME_SPORTS: "Extreme Sports",
  CONCERTS_EVENTS: "Concerts & Events",
  PORTRAITS_MODELING: "Portraits & Modeling",
  STRUCTURES_INTERIORS: "Structures & Interiors",
};

const videoButtonColors = [
  "violet",
  "green",
  "purple",
  "brown",
  "red",
  "orange",
];

const Home = () => {
  const preloaderRef = useRef();
  const { doFetchAllImages } = useDataSaver();
  // const [albumsAndCategories, setAlbumsAndCategories] = useState();
  // const [viewCategories, setViewCategories] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [albumImages, setAlbumImages] = useState([]);
  const [allAlbumImages, setAllAlbumImages] = useState();
  const [videos, setVideos] = useState([]);
  const { doFetchCategories, doFetchAllVideos } = useDataSaver();
  const { pathname } = useLocation();

  useEffect(() => {
    preloaderRef.current.classList.add("hide-preloader");

    // document
    //   .querySelectorAll("#intro .animation-fade-right")
    //   .forEach((item) => {
    //     item.classList.remove("animation-fade-right");
    //   });
  }, [pathname]);

  // This hook fetches all the images for various albums
  // and all videos with their complete details from the backend
  useEffect(() => {
    doFetchAllImages()
      .then((res) => {
        if (res.data.success) {
          // groupImagesIntoAlbumsAndCategories(res.data.images);
          groupImagesIntoAlbums(res.data.images);
        }
      })
      .catch((err) => {
        console.log("Images fetch error: ", err);
      });

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

  const groupImagesIntoAlbums = (images) => {
    const albums = {
      Automotive: [],
      "Extreme Sports": [],
      "Concerts & Events": [],
      "Portraits & Modeling": [],
      "Structures & Interiors": [],
    };

    images.reduce((acc, image) => {
      acc[image.album].push(image);
      return acc;
    }, albums);

    setAllAlbumImages(albums);
  };

  const groupImagesIntoAlbumsAndCategories = (images) => {
    const albums = {
      Automotive: {},
      "Extreme Sports": {},
      "Concerts & Events": {},
      "Portraits & Modeling": {},
      "Structures & Interiors": {},
    };

    const categoriesAndAlbums = images.reduce((acc, image) => {
      const category = acc[image.album][image.category];

      if (!category) {
        acc[image.album] = { [image.category]: [] };
      }

      acc[image.album][image.category].push(image);

      return acc;
    }, albums);

    console.log("cat and albums: ", categoriesAndAlbums);

    // setAlbumsAndCategories(categoriesAndAlbums);
  };

  const getCategoriesForAlbum = (categories, albumName) => {
    return categories
      .filter((category) => {
        return category.album === albumName;
      })
      .map((category) => category.name);
  };

  const showCategories = async (albumName) => {
    setCurrentAlbum(albumName);

    // const res = await doFetchCategories();

    // if (!res.data.success) return;

    // const categories = getCategoriesForAlbum(res.data.categories, albumName);

    // setViewCategories(categories);
  };

  const getDomainUrl = () => {
    return NODE_ENV === "dev"
      ? "http://localhost:4000"
      : window.location.origin;
  };

  const hideGallery = () => {
    setGalleryPhotos([]);
  };

  const showGallery = () => {
    // const images = albumsAndCategories[currentAlbum][category]?.map(
    //   (category) => {
    //     return {
    //       original: `${getDomainUrl()}/images/${category.originalName}`,
    //       thumbnail: `${getDomainUrl()}/images/${category.originalName}`,
    //     };
    //   }
    // );
  };

  const buildAndShowImageGallery = (imagesArr) => {
    const images = imagesArr?.map((image) => {
      return {
        original: `${getDomainUrl()}/images/${image.originalName}`,
        thumbnail: `${getDomainUrl()}/images/${image.originalName}`,
      };
    });

    setGalleryPhotos(images);
  };

  return (
    <div className="position-relative w-100 h-100">
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
      {/* {viewCategories.length > 0 && (
        <div className="categories-modal" onClick={() => setViewCategories([])}>
          <div className="categories-container">
            {viewCategories.map((category) => {
              return (
                <div
                  key={category}
                  className="single-category"
                  onClick={() => showGallery(category)}
                >
                  <img
                    src={CategoryFolderIcon}
                    className="w-100 h-100"
                    alt={category}
                  />
                  <span>{category}</span>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
      {/* ALBUM CATEGORIES VIEWER */}

      {/* IMAGE CONTAINER */}
      <div className="image-container">
        {/* <div className="background-img" /> */}
        <img
          src="/assets/img/background.jpg"
          alt="background"
          className="site-bg background-img"
        />
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
              Born and raised in Lebanon, Christophe Akiki is a photographer,
              videographer and editor. Holding a bachelor degree of Arts,
              Christophe completed his studies in Cinema and Television at the
              Holy Spirit University of Kaslik.
            </p>
            <p className="scroll-animated">
              He first got behind the camera at the age of eighteen when he
              began to cover rally racing in the Arab League. From shooting to
              editing, Christophe’s work has featured international athletes and
              singers. His photographs have been consistently sought out by
              global and local brands.
            </p>
            {/* CLIENTS */}
            <div className="row clients scroll-animated">
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
            </div>
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
                  className="btn btn-primary collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse-item-1"
                  aria-expanded="false"
                >
                  Photography
                </button>
                {/* COLLAPSE CONTENT */}
                <div className="collapse" id="collapse-item-1">
                  {/* COLLAPSE CONTENT INNER */}
                  <div className="well">
                    <p>
                      My photography focuses on authentically portraying the
                      adrenaline-fueled moments. Through my lens, I aim to
                      convey the raw emotion and exhilarating energy inherent in
                      these experiences, creating images that resonate on a
                      profound level.
                    </p>
                  </div>
                  {/* /COLLAPSE CONTENT INNER */}
                </div>
                {/* /COLLAPSE CONTENT */}
              </li>
              {/* /SERVICE ITEM */}
              {/* SERVICE ITEM */}
              <li className="service-item scroll-animated">
                <button
                  className="btn btn-primary collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse-item-2"
                  aria-expanded="false"
                >
                  Videography
                </button>
                {/* COLLAPSE CONTENT */}
                <div className="collapse" id="collapse-item-2">
                  {/* COLLAPSE CONTENT INNER */}
                  <div className="well">
                    <p>
                      My journey in videography has led me to specialize in
                      crafting TV commercials that tell compelling stories
                      rooted in the world of extreme sports. Each project is an
                      opportunity for me to immerse myself in the excitement of
                      the action, translating it into visually stunning
                      narratives that captivate audiences and evoke genuine
                      emotion.
                    </p>
                  </div>
                  {/* /COLLAPSE CONTENT INNER */}
                </div>
                {/* /COLLAPSE CONTENT */}
              </li>
              {/* /SERVICE ITEM */}
              {/* SERVICE ITEM */}
              <li className="service-item scroll-animated">
                <button
                  className="btn btn-primary collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse-item-3"
                  aria-expanded="false"
                >
                  Post Production
                </button>
                {/* COLLAPSE CONTENT */}
                <div className="collapse" id="collapse-item-3">
                  {/* COLLAPSE CONTENT INNER */}
                  <div className="well">
                    <p>
                      I bring a meticulous attention to detail and a deep
                      understanding of visual storytelling. Through video
                      editing, VFX, and color grading, I breathe life into raw
                      footage, transforming it into cohesive and impactful
                      content. This process is not just about technical
                      proficiency but about infusing each frame with the same
                      passion and authenticity that drives my work behind the
                      camera.
                    </p>
                  </div>
                  {/* /COLLAPSE CONTENT INNER */}
                </div>
                {/* /COLLAPSE CONTENT */}
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
              className="headline scroll-animated"
              style={{ marginBottom: "1.4em" }}
            >
              Latest Work
            </h3>
            <section id="content" />
            {/* SHOWCASE */}
            <div className="showcase">
              {/* ITEM */}
              <div
                className="item scroll-animated"
                onClick={() => {
                  buildAndShowImageGallery(allAlbumImages[ALBUMS.AUTOMOTIVE]);
                }}
              >
                {/* LIGHTBOX LINK */}
                <a href="#" data-featherlight="#item-1-lightbox">
                  {/* INFO */}
                  <div className="info">
                    {/* CONTAINER MID */}
                    <div className="container-mid">
                      {/* <h5>Petron</h5> */}
                      <p>Automotive</p>
                    </div>
                    {/* /CONTAINER MID */}
                  </div>
                  {/* /INFO */}
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: "url(assets/img/work/item-1.jpg)",
                    }}
                  />
                </a>
                {/* /LIGHTBOX LINK */}
                {/* LIGHTBOX */}
                <div id="item-1-lightbox" className="work-lightbox d-none">
                  <img
                    className="img-responsive"
                    src="assets/img/work/item-1.jpg"
                    alt="image"
                  />
                  <h3>Some Title</h3>
                  <p className="subline">Automotive</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper faucibus eros, quis imperdiet sapien. Nam
                    sodales nec risus nec interdum. Proin lobortis, ex
                    condimentum ultricies eleifend, nisl nunc sollicitudin odio,
                    eget egestas est turpis et metus. In non ligula quis mauris
                    rutrum porta.
                  </p>
                  <p>
                    Integer scelerisque et orci in maximus. Nullam ac finibus
                    nisi. Sed libero tellus, fringilla in posuere vitae,
                    sollicitudin consectetur odio. Morbi pharetra tortor quis
                    risus hendrerit, ut tincidunt arcu vehicula. Integer
                    consequat lorem nisl, sit amet euismod libero fringilla
                    placerat. Proin semper consequat ultricies. Vivamus
                    condimentum tortor ac quam tristique, eget rhoncus arcu
                    suscipit.
                  </p>
                </div>
                {/* /LIGHTBOX */}
              </div>
              {/* /ITEM */}
              {/* ITEM */}
              <div
                className="item scroll-animated"
                onClick={() =>
                  buildAndShowImageGallery(
                    allAlbumImages[ALBUMS.STRUCTURES_INTERIORS]
                  )
                }
              >
                {/* LIGHTBOX LINK */}
                <a href="#" data-featherlight="#item-1-lightbox">
                  {/* INFO */}
                  <div className="info">
                    {/* CONTAINER MID */}
                    <div className="container-mid">
                      {/* <h5>Petron</h5> */}
                      <p>Structures &amp; Interiors</p>
                    </div>
                    {/* /CONTAINER MID */}
                  </div>
                  {/* /INFO */}
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: "url(assets/img/work/item-1.jpg)",
                    }}
                  />
                </a>
                {/* /LIGHTBOX LINK */}
                {/* LIGHTBOX */}
                <div id="item-1-lightbox" className="work-lightbox d-none">
                  <img
                    className="img-responsive"
                    src="assets/img/work/item-1.jpg"
                    alt="image"
                  />
                  <h3>Some Title</h3>
                  <p className="subline">Structures &amp; Interiors</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper faucibus eros, quis imperdiet sapien. Nam
                    sodales nec risus nec interdum. Proin lobortis, ex
                    condimentum ultricies eleifend, nisl nunc sollicitudin odio,
                    eget egestas est turpis et metus. In non ligula quis mauris
                    rutrum porta.
                  </p>
                  <p>
                    Integer scelerisque et orci in maximus. Nullam ac finibus
                    nisi. Sed libero tellus, fringilla in posuere vitae,
                    sollicitudin consectetur odio. Morbi pharetra tortor quis
                    risus hendrerit, ut tincidunt arcu vehicula. Integer
                    consequat lorem nisl, sit amet euismod libero fringilla
                    placerat. Proin semper consequat ultricies. Vivamus
                    condimentum tortor ac quam tristique, eget rhoncus arcu
                    suscipit.
                  </p>
                </div>
                {/* /LIGHTBOX */}
              </div>
              {/* /ITEM */}
              {/* ITEM */}
              <div
                className="item scroll-animated"
                onClick={() =>
                  buildAndShowImageGallery(
                    allAlbumImages[ALBUMS.EXTREME_SPORTS]
                  )
                }
              >
                {/* LIGHTBOX LINK */}
                <a href="#" data-featherlight="#item-2-lightbox">
                  {/* INFO */}
                  <div className="info">
                    {/* CONTAINER MID */}
                    <div className="container-mid">
                      {/* <h5>Surf 71</h5> */}
                      <p>Extreme Sports</p>
                    </div>
                    {/* /CONTAINER MID */}
                  </div>
                  {/* /INFO */}
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: "url(assets/img/work/item-2.jpg)",
                    }}
                  />
                </a>
                {/* /LIGHTBOX LINK */}
                {/* LIGHTBOX */}
                <div id="item-2-lightbox" className="work-lightbox d-none">
                  <img
                    className="img-responsive"
                    src="assets/img/work/item-2.jpg"
                    alt="image"
                  />
                  <h3>Surf 71</h3>
                  <p className="subline">Sports</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper faucibus eros, quis imperdiet sapien. Nam
                    sodales nec risus nec interdum. Proin lobortis, ex
                    condimentum ultricies eleifend, nisl nunc sollicitudin odio,
                    eget egestas est turpis et metus. In non ligula quis mauris
                    rutrum porta.
                  </p>
                  <p>
                    Integer scelerisque et orci in maximus. Nullam ac finibus
                    nisi. Sed libero tellus, fringilla in posuere vitae,
                    sollicitudin consectetur odio. Morbi pharetra tortor quis
                    risus hendrerit, ut tincidunt arcu vehicula. Integer
                    consequat lorem nisl, sit amet euismod libero fringilla
                    placerat. Proin semper consequat ultricies. Vivamus
                    condimentum tortor ac quam tristique, eget rhoncus arcu
                    suscipit.
                  </p>
                </div>
                {/* /LIGHTBOX */}
              </div>
              {/* /ITEM */}
              {/* ITEM */}
              <div
                className="item scroll-animated"
                onClick={() =>
                  buildAndShowImageGallery(
                    allAlbumImages[ALBUMS.PORTRAITS_MODELING]
                  )
                }
              >
                {/* LIGHTBOX LINK */}
                <a href="#" data-featherlight="#item-3-lightbox">
                  {/* INFO */}
                  <div className="info">
                    {/* CONTAINER MID */}
                    <div className="container-mid">
                      {/* <h5>Game Nation</h5> */}
                      <p>Portraits &amp; Modeling</p>
                    </div>
                    {/* /CONTAINER MID */}
                  </div>
                  {/* /INFO */}
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: "url(assets/img/work/item-3.jpg)",
                    }}
                  />
                </a>
                {/* /LIGHTBOX LINK */}
                {/* LIGHTBOX */}
                <div id="item-3-lightbox" className="work-lightbox d-none">
                  <img
                    className="img-responsive"
                    src="assets/img/work/item-3.jpg"
                    alt="image"
                  />
                  <h3>Game Nation</h3>
                  <p className="subline">Marketing</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper faucibus eros, quis imperdiet sapien. Nam
                    sodales nec risus nec interdum. Proin lobortis, ex
                    condimentum ultricies eleifend, nisl nunc sollicitudin odio,
                    eget egestas est turpis et metus. In non ligula quis mauris
                    rutrum porta.
                  </p>
                  <p>
                    Integer scelerisque et orci in maximus. Nullam ac finibus
                    nisi. Sed libero tellus, fringilla in posuere vitae,
                    sollicitudin consectetur odio. Morbi pharetra tortor quis
                    risus hendrerit, ut tincidunt arcu vehicula. Integer
                    consequat lorem nisl, sit amet euismod libero fringilla
                    placerat. Proin semper consequat ultricies. Vivamus
                    condimentum tortor ac quam tristique, eget rhoncus arcu
                    suscipit.
                  </p>
                </div>
                {/* /LIGHTBOX */}
              </div>
              {/* /ITEM */}
              {/* ITEM */}
              <div
                className="item scroll-animated"
                onClick={() =>
                  buildAndShowImageGallery(
                    allAlbumImages[ALBUMS.CONCERTS_EVENTS]
                  )
                }
              >
                {/* LIGHTBOX LINK */}
                <a href="#" data-featherlight="#item-4-lightbox">
                  {/* INFO */}
                  <div className="info">
                    {/* CONTAINER MID */}
                    <div className="container-mid">
                      {/* <h5>Cronomax</h5> */}
                      <p>Concerts &amp; Events</p>
                    </div>
                    {/* /CONTAINER MID */}
                  </div>
                  {/* /INFO */}
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: "url(assets/img/work/item-4.jpg)",
                    }}
                  />
                </a>
                {/* /LIGHTBOX LINK */}
                {/* LIGHTBOX */}
                <div id="item-4-lightbox" className="work-lightbox d-none">
                  <img
                    className="img-responsive"
                    src="assets/img/work/item-4.jpg"
                    alt="image"
                  />
                  <h3>Cronomax</h3>
                  <p className="subline">Concerts &amp; Events</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper faucibus eros, quis imperdiet sapien. Nam
                    sodales nec risus nec interdum. Proin lobortis, ex
                    condimentum ultricies eleifend, nisl nunc sollicitudin odio,
                    eget egestas est turpis et metus. In non ligula quis mauris
                    rutrum porta.
                  </p>
                  <p>
                    Integer scelerisque et orci in maximus. Nullam ac finibus
                    nisi. Sed libero tellus, fringilla in posuere vitae,
                    sollicitudin consectetur odio. Morbi pharetra tortor quis
                    risus hendrerit, ut tincidunt arcu vehicula. Integer
                    consequat lorem nisl, sit amet euismod libero fringilla
                    placerat. Proin semper consequat ultricies. Vivamus
                    condimentum tortor ac quam tristique, eget rhoncus arcu
                    suscipit.
                  </p>
                </div>
                {/* /LIGHTBOX */}
              </div>
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
              action="assets/php/contact.php"
              method="post"
            >
              <input
                id="contact-form-name"
                type="text"
                name="name"
                className="form-control scroll-animated"
                placeholder="* Your Name"
              />
              <input
                id="contact-form-email"
                type="text"
                name="email"
                className="form-control scroll-animated"
                placeholder="* Your Email"
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
                defaultValue={""}
              />
              <button type="submit" className="form-control scroll-animated">
                Send Message
                <div className="circle">
                  <i className="fa fa-angle-right" aria-hidden="true" />
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </div>
              </button>
              <div className="success-message">
                <i className="fa fa-check" aria-hidden="true" />
                The Email was Sent Successfully!
              </div>
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
    </div>
  );
};

export default Home;
