import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import member1 from '../../assets/Customer/member1.png';
import member2 from '../../assets/Customer/member2.png';
import member3 from '../../assets/Customer/member3.png';
import member4 from '../../assets/Customer/member4.png';

import { Pagination, Autoplay, FreeMode, Scrollbar } from 'swiper/modules';
import SectionTitle from '../../components/SectionTitle';

const Review = () => {
    return (
        <div className='max-w-screen-2xl mx-auto my-20'>
            <SectionTitle title={'Customer Review'} subtitle={'need trust?'}></SectionTitle>
            <div className='rounded-lg my-10 py-5 px-4 bg-[#f3f9fc]'>
                <Swiper
                    slidesPerView={'1'}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 90 },
                        1024: { slidesPerView: 3, spaceBetween: 80 },
                    }}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    freeMode
                    centeredSlides
                    grabCursor
                    centeredSlidesBounds
                    modules={[Pagination, Autoplay, FreeMode, Scrollbar]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                MiniBazaar made my shopping so easy! I love the variety of products and the excellent customer service. Highly recommend to anyone looking for quality and convenience.
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member1} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Md Shojib Hossain</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                MiniBazaar has everything I need at great prices. The delivery is always on time, and the products are top-notch. I am a loyal customer now!
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member2} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Mohsena Yeasmin</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                Shopping at MiniBazaar is a delightful experience. The website is easy to navigate, and the product quality is outstanding. Highly recommended!
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member3} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Masum Billa</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                MiniBazaar exceeded my expectations! The customer support team was super helpful, and the products arrived perfectly packaged.
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member4} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Mst Asha Khatun</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                I love MiniBazaar! It is my go-to place for all my shopping needs. The discounts and offers are amazing. Thank you for making shopping so enjoyable.
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member1} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Niloy Das</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                MiniBazaar has the best collection of products. The prices are reasonable, and the quality is excellent. I am never disappointed.
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member2} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Lucky Khatun</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="card bg-base-100 shadow-xl space-y-5 h-56">
                            <p className='text-lg font-medium px-4'>
                                The best part of MiniBazaar is the variety of products and the super-fast delivery. Highly recommend it for all online shoppers!
                            </p>
                            <div className='flex items-center gap-3'>
                                <img src={member3} alt="Customer" className="rounded-full w-20" />
                                <h3 className='text-rose-800 text-xl font-bold'>Aowal Hossain</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Review;
