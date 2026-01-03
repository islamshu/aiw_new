// دالة تبديل اللغة
function toggleLanguage() {
    const html = document.documentElement;
    const languageToggle = document.getElementById('languageToggle');
    const langText = document.querySelector('.lang-text');
    const dir = html.getAttribute('dir');
    
    if (dir === 'rtl') {
        // التبديل إلى الإنجليزية
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        currentLanguage = 'en';
        
        // تحديث نص زر اللغة
        if (langText) {
            langText.textContent = langText.getAttribute('data-ar');
        }
        
        // تحديث جميع النصوص
        updateTexts('en');
    } else {
        // التبديل إلى العربية
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        currentLanguage = 'ar';
        
        // تحديث نص زر اللغة
        if (langText) {
            langText.textContent = langText.getAttribute('data-en');
        }
        
        // تحديث جميع النصوص
        updateTexts('ar');
    }
    
    // حفظ اللغة في التخزين المحلي
    localStorage.setItem('aiw-language', currentLanguage);
    
    // إعادة تطبيق تأثيرات الحركة
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        fadeElements.forEach(el => {
            el.classList.remove('appear');
            
            // إعادة تطبيق المراقبة بعد تغيير اللغة
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('appear');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            observer.observe(el);
        });
    }, 100);
}

// دالة تحديث النصوص
function updateTexts(language) {
    // العناصر التي تحتوي على بيانات اللغة
    const elements = document.querySelectorAll('[data-ar], [data-en]');
    
    elements.forEach(element => {
        if (language === 'ar') {
            if (element.getAttribute('data-ar')) {
                element.textContent = element.getAttribute('data-ar');
            }
        } else if (language === 'en') {
            if (element.getAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            }
        }
    });
    
    // تحديث عناوين الصفحة
    updatePageTitle(language);
}

// دالة تحديث عنوان الصفحة
function updatePageTitle(language) {
    const pageTitles = {
        'index.html': { ar: 'AIW - الصفحة الرئيسية', en: 'AIW - Home' },
        'about.html': { ar: 'AIW - من نحن', en: 'AIW - About Us' },
        'vision.html': { ar: 'AIW - الرؤية', en: 'AIW - Vision' },
        'strategy.html': { ar: 'AIW - الإستراتيجية', en: 'AIW - Strategy' },
        'sectors.html': { ar: 'AIW - القطاعات', en: 'AIW - Sectors' },
        'contact.html': { ar: 'AIW - اتصل بنا', en: 'AIW - Contact' }
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (pageTitles[currentPage]) {
        document.title = pageTitles[currentPage][language];
    }
}

// تهيئة تبديل اللغة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة حدث النقر لزر تبديل اللغة
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // تطبيق اللغة المحفوظة
    const savedLanguage = localStorage.getItem('aiw-language') || 'ar';
    if (savedLanguage === 'en') {
        // تأخير بسيط للتأكد من تحميل DOM
        setTimeout(() => {
            toggleLanguage();
        }, 100);
    }
});