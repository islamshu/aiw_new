// متغيرات عامة
let currentLanguage = 'ar';
let isMenuOpen = false;

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // فتح/إغلاق القائمة
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden');
            menuToggle.innerHTML = isMenuOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // إغلاق القائمة عند النقر على رابط
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                isMenuOpen = false;
            });
        });
    }
    
    // زر العودة للأعلى
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // إظهار/إخفاء الزر عند التمرير
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        // إخفاء الزر في البداية
        scrollTopBtn.style.display = 'none';
    }
    
    // تأثيرات الحركة عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);
    
    // تطبيق المراقبة على العناصر
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // تحميل اللغة المحفوظة
    const savedLanguage = localStorage.getItem('aiw-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // زر تبديل اللغة العائم
    const languageFloat = document.getElementById('languageFloat');
    if (languageFloat) {
        languageFloat.addEventListener('click', function() {
            document.getElementById('languageToggle').click();
        });
    }
    
    // تحديد الصفحة النشطة في القائمة
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link-hover');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.remove('text-[#a8b2d1]');
            link.classList.add('text-[#00b4d8]');
        }
    });
    
    // إذا كانت الصفحة الرئيسية
    if (currentPage === '' || currentPage === 'index.html' || currentPage === '/') {
        document.querySelector('a[href="index.html"]').classList.remove('text-[#a8b2d1]');
        document.querySelector('a[href="index.html"]').classList.add('text-[#00b4d8]');
    }
});