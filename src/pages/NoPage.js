import backgroundImage from '../assets/images/Rectangle-1508.jpg';
import pathearnLogo from '../assets/images/Image-7.png';
import Header from '../components/Header';


function NoPage() {  
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <div className="main">
          <section className="section-pathearn">
            <div className="section-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
            </div>

            <div className="shell">
              <div className="section-inner">
                <div className="section-head">
                  <h2 className="section-title">
                    <img src={pathearnLogo} alt="#" />
                    PATHEARN DASHBOARD
                  </h2>
                </div>

                <div className="section-box-wrapper">

                  <div className="section-box section-pathearn-box active" >
                    <div className="section-box-inner">
                      <h3 className="text_center">
                        404
                      </h3>

                      <p className="text_center">
                        Page not found!
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>


        </div>

      </div>
    </div>
  );
}

export default NoPage;


