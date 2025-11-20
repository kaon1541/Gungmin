/*
 * 공통 스크립트 파일
 *
 * 이 파일에는 모바일 메뉴 토글 및 리뷰 캐러셀 로직과 같은
 * 사이트 전반에 필요한 자바스크립트 기능을 담고 있습니다.
 */

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능: 메뉴 버튼을 클릭하면 메뉴의 표시/숨김이 전환됩니다.
    const menuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (menuButton && menu) {
        menuButton.addEventListener('click', function() {
            // 모바일 메뉴 슬라이드 토글
            const body = document.body;
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                body.classList.remove('menu-open');
            } else {
                menu.classList.add('open');
                body.classList.add('menu-open');
            }
        });
    }

    // 후기 슬라이드(리뷰 캐러셀) 로직
    const carousels = document.querySelectorAll('[data-carousel-id]');
    carousels.forEach(carousel => {
        const carouselId = carousel.dataset.carouselId;
        // 캐러셀 안에 포함된 슬라이드와 컨트롤러를 찾습니다.
        const slides = carousel.querySelectorAll('.review-slide[data-carousel-id="' + carouselId + '"]');
        const prevButton = carousel.querySelector('.review-prev[data-carousel-id="' + carouselId + '"]');
        const nextButton = carousel.querySelector('.review-next[data-carousel-id="' + carouselId + '"]');

        // 슬라이드가 한 개 이하일 경우 컨트롤 버튼을 숨깁니다.
        if (slides.length <= 1) {
            if (prevButton) prevButton.classList.add('hidden');
            if (nextButton) nextButton.classList.add('hidden');
            if (slides.length === 1) {
                slides[0].classList.add('active');
            }
            return;
        }

        let currentIndex = 0;
        // 보여줄 슬라이드 인덱스를 업데이트하는 함수
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }
        // 초기화: 첫 슬라이드를 활성화합니다.
        showSlide(currentIndex);
        // 이전 버튼: 이전 슬라이드를 보여줍니다.
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
                showSlide(currentIndex);
            });
        }
        // 다음 버튼: 다음 슬라이드를 보여줍니다.
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                showSlide(currentIndex);
            });
        }
        // 자동 넘김: 5초마다 다음 슬라이드로 이동합니다.
        setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        }, 5000);
    });

    // 스크롤 애니메이션 로직
    // IntersectionObserver를 사용하여 요소가 화면에 보일 때 'visible' 클래스를 추가합니다.
    // Scroll animation: IntersectionObserver 설정
    // rootMargin을 설정하여 요소가 화면에 충분히 들어왔을 때 애니메이션이 시작되도록 합니다.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 보이면 visible 클래스를 추가합니다.
                entry.target.classList.add('visible');
                // 한 번 애니메이션이 실행된 후에는 더 이상 관찰하지 않습니다.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // 모든 scroll-element에 대해 관찰을 시작하고, 각 요소에 순차적인 딜레이를 설정합니다.
    const scrollElements = document.querySelectorAll('.scroll-element');
    scrollElements.forEach((el, index) => {
        // 각 요소의 transition-delay를 감소시켜 더 빠르게 등장하도록 합니다.
        el.style.transitionDelay = `${index * 0.05}s`;
        scrollObserver.observe(el);
    });
});