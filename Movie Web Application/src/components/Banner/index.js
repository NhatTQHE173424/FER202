import banner from '@/assets/image/bgFooter.png';

function Banner({ title }) {
  return (
    <div
      className='text-white text-center d-flex align-items-center justify-content-center'
      style={{
        backgroundImage: `url(${banner})`,
        background: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: title ? '120px' : '200px',
        fontWeight: '400',
        fontSize: '32px',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>{title}</p>
    </div>
  );
}

export default Banner;
