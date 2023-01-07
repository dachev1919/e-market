import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/clock.css';

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    const countDown = useCallback(() => {
        let interval;
        const date = new Date();
        const destination = date.setDate(date.getDate() + 30);

        interval = setInterval(() => {
            const now = new Date().getTime();
            const different = destination - now;
            const newDays = Math.floor(different / (1000 * 60 * 60 * 24));
            const newHours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const newMinutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60));
            const newSeconds = Math.floor(different % (1000 * 60) / 1000);

            if (destination < 0) clearInterval(interval.current)
            else {
                setDays(newDays);
                setHours(newHours);
                setMinutes(newMinutes);
                setSeconds(newSeconds);
            }
        })
    }, []);

    useEffect(() => {
        countDown()
    }, [countDown]);

    return (
        <div className="clock__wrapper d-flex align-items-center gap-3 mb-4">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{days} </h1>
                    <h5 className='text-white fs-6'>days</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{hours} </h1>
                    <h5 className='text-white fs-6'>hour</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{minutes} </h1>
                    <h5 className='text-white fs-6'>min</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{seconds} </h1>
                    <h5 className='text-white fs-6'>sec</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;