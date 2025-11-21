/*
 * 공통 스크립트 파일
 *
 * 모바일 메뉴 토글, 닫기 버튼, 리뷰 슬라이드, 스크롤 애니메이션 포함
 */

document.addEventListener('DOMContentLoaded', function() {

    /* =========================================================
       모바일 메뉴 열기 / 닫기
    ========================================================== */

    const menuButton = document.getElementById('mobile-menu-button');   // 햄버거 버튼
    const closeButton = document.getElementById('mobile-menu-close');   // 닫기(×) 버튼
    const menu = document.getElementById('mobile-menu');                // 메뉴 전체
    const body = document.body;

    // 메뉴 열기
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            menu.classList.add('open');
            body.classList.add('menu-open');
        });
    }

    // 메뉴 닫기
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            menu.classList.remove('open');
            body.classList.remove('menu-open');
        });
    }


    /* =========================================================
       리뷰 캐러셀
    ========================================================== */

    const carousels = document.querySelectorAll('[data-carousel-id]');

    carousels.forEach(carousel => {
        const carouselId = carousel.dataset.carouselId;

        const slides = carousel.querySelectorAll('.review-slide[data-carousel-id="' + carouselId + '"]');
        const prevButton = carousel.querySelector('.review-prev[data-carousel-id="' + carouselId + '"]');
        const nextButton = carousel.querySelector('.review-next[data-carousel-id="' + carouselId + '"]');

        if (slides.length <= 1) {
            if (prevButton) prevButton.classList.add('hidden');
            if (nextButton) nextButton.classList.add('hidden');
            if (slides.length === 1) slides[0].classList.add('active');
            return;
        }

        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        showSlide(currentIndex);

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
                showSlide(currentIndex);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                showSlide(currentIndex);
            });
        }

        setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        }, 5000);
    });


    /* =========================================================
       스크롤 애니메이션 (IntersectionObserver)
    ========================================================== */

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    const scrollElements = document.querySelectorAll('.scroll-element');

    scrollElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.05}s`;
        scrollObserver.observe(el);
    });

});
