
import './css/Alvolmain.css';
import {useState, useEffect, useRef} from 'react';
function Alvolmain() {
    const IMGLEN = 4;
    const IMG = [
        "./img/car1.jpg",
        "./img/car2.jpg",
        "./img/car3.jpg",
        "./img/car4.jpg"
    ]
    const [idx, setidx] = useState(0);
    const goToNextSlide = () => {
        const index = (idx + 1) % IMGLEN;
        setidx(index);
    };
    useEffect(() => {
        const interval = setInterval(goToNextSlide, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [idx]);
    const renderDots = () => {
        return IMG.map((image, index) => (
            <span
                key={index}
                className={index === idx ? 'dot active' : 'dot'}
            />
        ));
    };

    return (
        <div id="main_container">
            <div className = 'imgContainer'>
                <div className="mySlides">
                    <img src={IMG[idx]} />
                </div>

                <div className='dotbox'>
                    {renderDots()}
                </div>
            </div>
            <div className='containerCt2'>
                <div className='inner'>
                    <img src='./img/deliveryicon.png'/>
                    <span className='innerText'>배달주문</span>
                </div>
                <div className='innerline'></div>
                <div className='inner'>
                    <img src='./img/boxicon.png'/>
                    <span className='innerText'>포장주문</span>
                </div>
            </div>
        </div>
    );
}

export default Alvolmain;
