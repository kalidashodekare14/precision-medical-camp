import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Feedback = () => {

    const axiosPublic = useAxiosPublic()

    const { data: feedbackRating = [] } = useQuery({
        queryKey: ['feedbackRating'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback-rating')
            return res.data
        }
    })

    console.log(feedbackRating)

    return (
        <Swiper
            pagination={{
                type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {
                feedbackRating.map(feedback => (
                    <SwiperSlide>
                        <div className='space-y-2 px-5 my-20 m-auto flex text-center flex-col justify-center items-center lg:w-1/2'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={feedback.rating}
                                readOnly
                            />
                            <div>
                                <img className='w-20 h-[12vh] rounded-full' src={feedback.image} alt="" />
                            </div>
                            <h2>{feedback.feedback}</h2>
                            <h3 className='text-[20px] font-bold'>{feedback.name}</h3>
                        </div>
                    </SwiperSlide>
                ))
            }


        </Swiper>
    );
};

export default Feedback;