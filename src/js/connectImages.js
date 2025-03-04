//лого например для всех страничек
import logo from '@/images/logo.avif';
document.querySelector('.logo').src = logo;

//фон например если две темы (пока одна)
import bgImage from '@/images/bg.jpg';
document.documentElement.style.setProperty('--bg-image', `url(${bgImage})`);

import footer from '@/images/footer.png';
export const forApp = { footer }; 