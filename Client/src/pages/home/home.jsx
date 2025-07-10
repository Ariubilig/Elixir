import './home.css'

import { useEffect } from 'react';
import AOS from 'aos';


function Home() {

  useEffect(() => {
    AOS.refresh();
  }, []);
    
  return (
    <div className='home'>


      <div className='fisrt'>

        <div className="moving-text" style={{fontSize: '208px', fontFamily: 'Protest Revolution', fontWeight: '700'}}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0"
          data-aos-duration="1500">
          <span>E</span><span>L</span><span>I</span><span>X</span><span>I</span><span>R</span>
        </div>
        <p
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0" data-aos-duration="2000">
            WE'RE A GROUP OF YOUNG PEOPLE STARTING OUR STUDIO <br />/STARTING FROM THE BOTTOM/</p>

      </div>

      <div className='second'>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam obcaecati cum facilis amet consequatur voluptates reprehenderit tempore dolor corporis optio ducimus iure quidem, officiis, perspiciatis nesciunt quibusdam eum ad dignissimos?
      </div>


    </div>
  )
}

export default Home