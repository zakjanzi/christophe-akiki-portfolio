import { useEffect, useRef } from "react";

const Home = () => {
  const preloaderRef = useRef();

  useEffect(() => {
    preloaderRef.current.classList.add("hide-preloader");
  }, []);

  return (
    <>
      <div>
        {/* PRELOADER */}
        <div className="preloader" ref={preloaderRef}>
          <div className="spinner" />
        </div>
        {/* /PRELOADER */}
        {/* IMAGE CONTAINER */}
        <div className="image-container">
          <div className="background-img" />
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
                editing, Christophe’s work has featured international athletes
                and singers. His photographs have been consistently sought out
                by global and local brands.
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
                        convey the raw emotion and exhilarating energy inherent
                        in these experiences, creating images that resonate on a
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
                        rooted in the world of extreme sports. Each project is
                        an opportunity for me to immerse myself in the
                        excitement of the action, translating it into visually
                        stunning narratives that captivate audiences and evoke
                        genuine emotion.
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
            {/* WORK */}
            <section id="work">
              <h3 className="headline scroll-animated">Latest Work</h3>
              <section id="content" />
              {/* SHOWCASE */}
              <div className="showcase">
                {/* ITEM */}
                <div className="item scroll-animated">
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
                  <div id="item-1-lightbox" className="work-lightbox">
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
                      condimentum ultricies eleifend, nisl nunc sollicitudin
                      odio, eget egestas est turpis et metus. In non ligula quis
                      mauris rutrum porta.
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
                <div className="item scroll-animated">
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
                  <div id="item-1-lightbox" className="work-lightbox">
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
                      condimentum ultricies eleifend, nisl nunc sollicitudin
                      odio, eget egestas est turpis et metus. In non ligula quis
                      mauris rutrum porta.
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
                <div className="item scroll-animated">
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
                  <div id="item-2-lightbox" className="work-lightbox">
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
                      condimentum ultricies eleifend, nisl nunc sollicitudin
                      odio, eget egestas est turpis et metus. In non ligula quis
                      mauris rutrum porta.
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
                <div className="item scroll-animated">
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
                  <div id="item-3-lightbox" className="work-lightbox">
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
                      condimentum ultricies eleifend, nisl nunc sollicitudin
                      odio, eget egestas est turpis et metus. In non ligula quis
                      mauris rutrum porta.
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
                <div className="item scroll-animated">
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
                  <div id="item-4-lightbox" className="work-lightbox">
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
                      condimentum ultricies eleifend, nisl nunc sollicitudin
                      odio, eget egestas est turpis et metus. In non ligula quis
                      mauris rutrum porta.
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
    </>
  );
};

export default Home;
