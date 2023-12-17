import Page from '../components/Page';

// config
import {Appdetails} from '../config';

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <Page title="Contact us">
      <div className="app-relative hero5">
        <div className="overlay2" />
        <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
          <h1 className="center app-relative white-text">Contact Us</h1>
          <p className="app-relative center white-text" />
        </div>
      </div>
      <main className="bg" style={{ minHeight: '80vh' }}>
        <div className="container fade-appear-done fade-enter-done">
          <br />
          <br />
          <section className="app-py-3 image-left">
            <div className="row container  center">
              <div className="col l6 s12">
                <form>
                  <div className="row app-py-0">
                    <div className="col l6 s12">
                      <div className="input-field">
                        <input type="text" id="name" placeholder="Name" required  />
                      </div>
                    </div>
                    <div className="col l6 s12">
                      <div className="input-field">
                        <input type="email" id="email" placeholder="email" required  />
                      </div>
                    </div>
                  </div>
                  <div className="row app-py-0">
                    <div className="col l12 s12">
                      <div className="input-field">
                        <textarea
                          placeholder="message"
                          type="text"
                          id="body"
                          className="materialize-textarea"
                        />
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-full">
                        SEND
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col l6 s12">
                <div className="container ">
                  <br />
                  <p>
                    We are always open and we welcome and questions you have for our team. If you wish to get in touch,
                    please fill out the form below. Someone from our team will get back to you shortly.
                  </p>
                  <br />
                  <span className="material-icons notranslate">mail</span> {Appdetails.email}
                  <br />
                  <span className="material-icons notranslate">phone</span> {Appdetails.phone}
                  <br />
                  <span className="material-icons notranslate">home</span> {Appdetails.address}
                  <br />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}
