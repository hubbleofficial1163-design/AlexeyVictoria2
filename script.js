document.addEventListener('DOMContentLoaded', () => {
    // Hero секция - устанавливаем высоту
    const setHeroHeight = () => {
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.minHeight = '100vh';
            hero.style.minHeight = '100svh';
            hero.style.height = 'auto';
        }
    };

    setHeroHeight();

    const heroImg = document.querySelector('.hero-image');
    if (heroImg && !heroImg.complete) {
        heroImg.addEventListener('load', () => {
            setHeroHeight();
        });
    }
});

// ========== БАЗОВЫЕ СТИЛИ АНИМАЦИЙ ==========
const coreStyles = document.createElement('style');
coreStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(coreStyles);

// ========== УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО ==========
function showModal(title, message, isError = false) {
    const existingModal = document.getElementById('customModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const icon = isError ? '✕' : '✓';
    const iconColor = isError ? '#c62828' : '#2e7d32';
    const bgIconColor = isError ? '#ffebee' : '#e8f5e9';
    const borderColor = isError ? '#c62828' : '#2e7d32';

    modal.innerHTML = `
        <div style="
            background: #ffffff;
            border-radius: 16px;
            padding: 32px 40px;
            max-width: 380px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease;
            border-top: 3px solid ${borderColor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${bgIconColor};
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
            ">
                <div style="
                    font-size: 32px;
                    font-weight: 400;
                    color: ${iconColor};
                    line-height: 1;
                ">${icon}</div>
            </div>
            <h3 style="
                font-size: 24px;
                font-weight: 500;
                color: #1a1a1a;
                margin-bottom: 12px;
                letter-spacing: -0.3px;
            ">${title}</h3>
            <p style="
                font-size: 16px;
                color: #555555;
                margin-bottom: 28px;
                line-height: 1.5;
            ">${message}</p>
            <button onclick="this.closest('#customModal').remove()" style="
                background: #f5f5f5;
                color: #333333;
                border: none;
                padding: 12px 32px;
                border-radius: 40px;
                font-family: inherit;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                Закрыть
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    if (!isError) {
        setTimeout(() => {
            if (modal.parentElement) modal.remove();
        }, 4000);
    }
}

// ========== МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ ==========
function showLoadingModal() {
    const existingLoading = document.getElementById('loadingModal');
    if (existingLoading) existingLoading.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModal';
    loadingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loadingModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 32px 40px;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #e0e0e0;
                border-top-color: #09221e;
                border-radius: 50%;
                margin: 0 auto 20px;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                font-size: 15px;
                color: #666;
                margin: 0;
            ">Отправка ответа...</p>
        </div>
    `;
    document.body.appendChild(loadingModal);
    return loadingModal;
}

// ========== GOOGLE SHEETS ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqH4KBRH1d1pOKKlr4KeHQNuP0pjYT49ByqZKiSkHfDwzGxrjiFQGLorHc4JYCSzMq/exec'; // ЗАМЕНИТЕ НА ВАШ URL

// Музыка
const musicButton = document.getElementById('musicButton');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

const enableMusic = () => {
    if (!isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            if (musicButton) musicButton.textContent = 'выключить музыку';
        }).catch(err => {
            console.log('Автовоспроизведение заблокировано:', err);
        });
    }
    document.removeEventListener('click', enableMusic);
    document.removeEventListener('touchstart', enableMusic);
};

document.addEventListener('click', enableMusic);
document.addEventListener('touchstart', enableMusic);

if (musicButton) {
    musicButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicButton.textContent = 'включить музыку';
        } else {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicButton.textContent = 'выключить музыку';
            }).catch(err => {
                console.log('Ошибка воспроизведения:', err);
            });
        }
    });
}

// ========== МОДАЛЬНОЕ ОКНО СО СЛАЙДАМИ ==========
const modal = document.getElementById('modal');
const sendButton = document.querySelector('.send-button');

// Переменная для хранения данных формы
let formData = {
    name: '',
    alcohol: [],
    music: ''
};

// Открыть окно
if (sendButton) {
    sendButton.addEventListener('click', function() {
        modal.style.display = 'flex';
        resetModal();
    });
}

// Закрыть по клику на фон
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Функция сброса модального окна
function resetModal() {
    formData = { name: '', guests: 1, alcohol: [], music: '' };
    
    // Сброс счетчика
    const guestCountSpan = document.getElementById('guestCount');
    if (guestCountSpan) guestCountSpan.textContent = '1';
    
    // Очистка имени
    const nameInput = document.getElementById('guestName');
    if (nameInput) nameInput.value = '';
    
    // Очистка чекбоксов
    document.querySelectorAll('.alcohol-options input').forEach(cb => cb.checked = false);
    
    // Очистка текстареа
    const musicTextarea = document.getElementById('musicPreferences');
    if (musicTextarea) musicTextarea.value = '';
    
    // Показываем первый слайд (с количеством гостей)
    document.querySelectorAll('.slide').forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Обработка перехода между слайдами с сохранением данных
// Кнопки "Далее" - исправленная версия
document.querySelectorAll('.slide-next').forEach(button => {
    // Убираем старые обработчики, если есть
    button.removeEventListener('click', button._listener);
    
    const handler = function() {
        let currentSlide = null;
        let currentIndex = 0;
        
        const slides = document.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                currentSlide = slides[i];
                currentIndex = i;
                break;
            }
        }
        
        // Сохраняем данные перед переходом
        if (currentIndex === 0) {
            const guestCountSpan = document.getElementById('guestCount');
            if (guestCountSpan) formData.guests = parseInt(guestCountSpan.textContent) || 1;
        } else if (currentIndex === 1) {
            const nameInput = document.getElementById('guestName');
            if (nameInput) formData.name = nameInput.value.trim();
        } else if (currentIndex === 2) {
            formData.alcohol = [];
            document.querySelectorAll('.alcohol-options input:checked').forEach(cb => {
                formData.alcohol.push(cb.value);
            });
        } else if (currentIndex === 3) {
            const musicTextarea = document.getElementById('musicPreferences');
            if (musicTextarea) formData.music = musicTextarea.value.trim();
        }
        
        // Показать следующий слайд
        if (currentSlide && currentIndex < slides.length - 1) {
            currentSlide.classList.remove('active');
            slides[currentIndex + 1].classList.add('active');
        }
    };
    
    button.addEventListener('click', handler);
    button._listener = handler;
});

// Кнопки "Назад"
document.querySelectorAll('.slide-prev').forEach(button => {
    button.addEventListener('click', function() {
        let currentSlide = null;
        let currentIndex = 0;
        
        const slides = document.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                currentSlide = slides[i];
                currentIndex = i;
                break;
            }
        }
        
        // Показать предыдущий
        if (currentSlide && currentIndex > 0) {
            currentSlide.classList.remove('active');
            slides[currentIndex - 1].classList.add('active');
        }
    });
});

// Кнопка "Отправить"
document.querySelector('.slide-submit').addEventListener('click', async function() {
    // Сохраняем музыку перед отправкой
    const musicTextarea = document.getElementById('musicPreferences');
    if (musicTextarea) formData.music = musicTextarea.value.trim();
    
    if (!formData.name) {
        showModal('Ошибка', 'Пожалуйста, введите ваше имя', true);
        return;
    }
    if (!formData.guests || formData.guests < 1) {
        showModal('Ошибка', 'Пожалуйста, укажите количество гостей', true);
        return;
    }
    
    // Показываем загрузку
    const loadingModal = showLoadingModal();
    
    try {
        // Формируем данные для отправки
        const formDataToSend = new URLSearchParams();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('guests', formData.guests);
        formDataToSend.append('music', formData.music);
        
        for (const alcohol of formData.alcohol) {
            formDataToSend.append('alcohol', alcohol);
        }
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formDataToSend.toString()
        });
        
        const result = await response.json();
        
        loadingModal.remove();
        
        if (result.result === 'success') {
            showModal(
                'Спасибо, ' + formData.name + '!',
                'Ваш ответ успешно отправлен. Ждём вас на нашей свадьбе! 🎉',
                false
            );
            
            // Закрыть модальное окно
            modal.style.display = 'none';
            
            // Очистить форму
            resetModal();
        } else {
            throw new Error(result.message || 'Ошибка отправки');
        }
    } catch (error) {
        loadingModal.remove();
        showModal(
            'Ошибка',
            error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.',
            true
        );
    }
});

// Эффект нажатия для кнопок на мобильных
const allButtons = document.querySelectorAll('button, .send-button, .music-button, .slide-next, .slide-prev, .slide-submit');

allButtons.forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    btn.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
    
    btn.addEventListener('touchcancel', function() {
        this.classList.remove('touch-active');
    });
});


// Обработчики для счетчика гостей
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList && target.classList.contains('counter-plus')) {
        const countSpan = document.getElementById('guestCount');
        if (countSpan) {
            let val = parseInt(countSpan.textContent) || 1;
            val = Math.min(val + 1, 10);
            countSpan.textContent = val;
        }
    }
    
    if (target.classList && target.classList.contains('counter-minus')) {
        const countSpan = document.getElementById('guestCount');
        if (countSpan) {
            let val = parseInt(countSpan.textContent) || 1;
            val = Math.max(val - 1, 1);
            countSpan.textContent = val;
        }
    }
});
