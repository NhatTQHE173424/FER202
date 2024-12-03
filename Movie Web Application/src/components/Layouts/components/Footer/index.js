import logo from '@/assets/image/footer.png';
import bgFooter from '@/assets/image/bgFooter.png';

function Footer() {
  return (
    <footer
      className='text-white'
      style={{
        backgroundImage: `url(${bgFooter})`,
        background: `url(${bgFooter})`,
      }}
    >
      <div className='d-flex pb-5 pl-5 pr-5 pt-4'>
        <img
          src={logo}
          alt='logo-footer'
          className='col-md-auto'
          width={155}
          height={51}
        />
        <div className='col-md-8 row'>
          <p className='col-md-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>
        <div className='d-flex flex-column flex-start col-md-3'>
          <p
            className='mb-1 text-white font-weight-bold'
            style={{ fontFamily: 'Poppins', fontSize: '15px' }}
          >
            Contact Us
          </p>
          <p className='mb-0'>Email: abc@gmail.com</p>
          <p className='mb-0'>Phone: +84 899 999 999</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
