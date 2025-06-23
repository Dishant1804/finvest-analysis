const Billing = () => {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row relative justify-between my-40 items-stretch max-w-7xl gap-12">
        <section id="product" className="w-full md:w-1/2 flex">
          <div className={`border border-r-4 border-b-4 rounded-lg flex-col justify-between h-full shadow-black p-6 flex-1`}>
            <h2 className="font-poppins font-semibold xs:text-5xl text-4xl text-white xs:leading-20 leading-16 w-full">
              Maximize your investment returns with AI analysis
            </h2>
            <p className="font-poppins font-normal text-dimWhite text-sm sm:text-[18px] leading-[30.8px] mt-5">
              Ditch the guesswork. Our AI dives deep, crunching financial ratios
              and decoding earnings call transcripts to give you the real story
              behind the numbers. Get the clear, actionable insights you need to
              level up your investment game.
            </p>
          </div>
        </section>
        <section id="features" className="w-full md:w-1/2 flex">
          <div className={`border border-r-4 border-b-4 rounded-lg p-6 flex-1 flex justify-center items-start flex-col`}>
            <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
              Find better stocks to invest in with few easy steps
            </h2>
            <p className={`font-poppins font-normal text-dimWhite text-sm sm:text-[18px] leading-[30.8px] mt-5`}>
              Stay ahead of the curve. We don't just show you the news, we
              analyze its potential market impact. Our platform tracks breaking
              stories and market sentiment, helping you make smarter, faster
              decisions and discover opportunities before they trend.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Billing;

