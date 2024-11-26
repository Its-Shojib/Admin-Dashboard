import animation from '../../assets/About us/Animation - 1701198416051.json'
import Lottie from 'lottie-react';
import SectionTitle from '../../components/SectionTitle';


const About = () => {

    return (
        <div className="w-10/12 mx-auto">
            <SectionTitle title={"About Us"} subtitle={'Wanna Know?'}/>

            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                    <Lottie className="h-[450px] w-10/12" animationData={animation} loop={true}></Lottie>
                </div>

                <div className='flex-1'>
                    <div className="collapse collapse-arrow my-1">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            {"What is MiniBazaar mission?"}
                        </div>
                        <div className="collapse-content">
                            <p>{"MiniBazaar's mission is to deliver a convenient, affordable, and reliable online shopping experience with a wide range of quality products."}</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow my-1">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {"How does MiniBazaar works?"}
                        </div>
                        <div className="collapse-content">
                            <p>{"MiniBazaar works by connecting customers with a wide range of products through its user-friendly e-commerce platform, enabling seamless browsing, secure payments, and efficient delivery services."}</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow my-1">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {"What sets MiniBazaar apart from other site?"}
                        </div>
                        <div className="collapse-content">
                            <p>
                            MiniBazaar stands out by offering a curated selection of quality products at competitive prices, backed by exceptional customer service, a seamless shopping experience, and fast, reliable delivery.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow my-1">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {"Who can benefit from using MiniBazaar?"}
                        </div>
                        <div className="collapse-content">
                            <p>
                            MiniBazaar benefits anyone seeking a convenient, affordable, and reliable online shopping experience for quality products.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;