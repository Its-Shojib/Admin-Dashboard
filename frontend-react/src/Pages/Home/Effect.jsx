import img from "../../assets/Home/1.jpg";
import img1 from "../../assets/Home/2.jpg";
import img2 from "../../assets/Home/3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../../components/SectionTitle";
AOS.init();

const Effect = () => {
  return (
    <div className="max-w-screen-2xl mx-auto my-20">
      <SectionTitle title={'Know Our services'} subtitle={'what we do?'}></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
        {/* Card 1: Wide Product Range */}
        <div
          data-aos="flip-up"
          data-aos-duration="3000"
          className="px-4 font-play glass py-8 max-w-[450px] shadow-lg font-sans space-y-3 mx-auto bg-[#c9d6dd]"
        >
          <div className="flex gap-3 items-start justify-center">
            <div className="flex flex-col justify-center w-full h-52 lg:h-[280px] relative">
              <img
                className="size-48 bg-black/40"
                src={img}
                alt="Wide Product Range"
              />
              <h6 className="text-lg font-bold py-2">Wide Product Range</h6>
              <p className="text-[#2d4739] text-left text-sm">
                <span className="font-bold">Endless Choices:</span> Discover a vast
                selection of products across categories to meet every need and
                budget.
              </p>
            </div>
            <div className="text-left w-[100%] mx-auto space-y-2">
              <p className="text-[#2d4739] text-sm">
                <span className="font-bold">Latest Trends:</span> Stay ahead with
                products updated regularly to match the latest trends and styles.
              </p>
              <p className="text-[#2d4739] text-xs md:text-sm">
                <span className="font-bold">Easy Navigation:</span> Browse with
                ease using user-friendly filters and search tools.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Quality Assurance */}
        <div
          data-aos="flip-up"
          data-aos-duration="3000"
          className="px-4 font-play glass py-8 max-w-[450px] shadow-lg font-sans space-y-3 mx-auto bg-[#c9d6dd]"
        >
          <div className="flex items-start justify-center">
            <div className="flex flex-col justify-center w-full h-52 lg:h-[280px] relative">
              <img
                className="size-48 bg-black/40"
                src={img1}
                alt="Quality Assurance"
              />
              <h6 className="text-xl font-bold py-2">Quality Assurance</h6>
              <p className="text-[#2d4739] text-sm">
                <span className="font-bold">Premium Products:</span> We ensure
                that every product meets high standards of quality and reliability.
              </p>
            </div>
            <div className="text-left w-[85%] mx-auto space-y-2">
              <p className="text-[#2d4739] text-xs md:text-sm">
                <span className="font-bold">Verified Suppliers:</span> Partnering
                with trusted suppliers to bring you authentic items.
              </p>
              <p className="text-[#2d4739] text-xs md:text-sm">
                <span className="font-bold">Customer Satisfaction:</span> All
                products are backed by a hassle-free return and refund policy.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Fast and Reliable Delivery */}
        <div
          data-aos="flip-up"
          data-aos-duration="3000"
          className="px-4 font-play glass py-8 max-w-[450px] shadow-lg font-sans space-y-3 mx-auto bg-[#c9d6dd]"
        >
          <div className="flex items-start gap-2 justify-center">
            <div className="flex flex-col justify-center w-full h-52 lg:h-[280px] relative">
              <img
                className="size-48 bg-black/40"
                src={img2}
                alt="Fast Delivery"
              />
              <h6 className="text-xl font-bold py-2">
                Fast and Reliable Delivery
              </h6>
              <p className="text-[#2d4739] text-sm">
                <span className="font-bold">Speedy Shipping:</span> Get your
                orders delivered quickly, right to your doorstep.
              </p>
            </div>
            <div className="text-left w-[85%] mx-auto space-y-2">
              <p className="text-[#2d4739] text-xs md:text-sm">
                <span className="font-bold">Tracking Updates:</span> Stay informed
                with real-time order tracking and notifications.
              </p>
              <p className="text-[#2d4739] text-xs md:text-sm">
                <span className="font-bold">Global Reach:</span> Delivering
                products worldwide with trusted courier services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Effect;
