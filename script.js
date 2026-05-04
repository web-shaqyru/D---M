// --- 1. ТРАНСЛЯЦИЯ (KZ/RU) ---
const translations = {
    kk: {
        audio_play: "Әуен",
        audio_stop: "Тоқтату",
        invitation_pre: "Ағайын-туыс, бауырлар, құда-жекжат, нағашылар, дос-жарандар, көршілер және әріптестер!",
        invitation_title: "Құрметті қонақтар!",
        invitation_main: "Сіздерді Балаларымыздың үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
        location_title: "Мекен-жайымыз",
        location_address: "Сыганак көшесі, 38, Астана",
        btn_map: "Картадан ашу",
        dresscode_title: "Дресс-код және той түстері",
        dress_note: "Біз сіздерді дәл өздеріңіздей әдемі кешкі образда күтеміз!",
        timeline_title: "Той бағдарламасы",
        event_gathering: "Қонақтардың жиналуы",
        event_betashar: "Беташар",
        event_photos: "Фотосессия",
        event_start: "Тойдың басталуы",
        event_cake: "Торт",
        event_dance: "Билер",
        timer_title: "Тойға дейін қалды",
        unit_days: "Күн",
        unit_hours: "Сағат",
        unit_minutes: "Минут",
        unit_seconds: "Секунд",
        timer_ended: "Той басталды!",
        rsvp_title: "Қатысуды растау",
        rsvp_subtitle: "Өтінемін, 20.07.2026 дейін жауап беріңіз.",
        label_name: "Аты-жөніңіз",
        label_attendance: "Тойға келесіз бе?",
        opt_yes: "Қуана қатысамын",
        opt_plus: "Жұбыммен келемін",
        opt_no: "Қатыса алмаймын",
        btn_submit: "Жіберу",
        btn_sending: "Жіберілуде...",
        status_ok: "Рахмет! Сіздің жауабыңыз қабылданды.",
        status_error: "Қате кетті. Қайта көріңіз немесе бізге хабарласыңыз.",
        hosts_label: "Той иелері:",
        calendar_title: "Тамыз 2026",
        calendar_note: "Бұл күнді күнтізбеге белгілеп қойыңыздар!"
    },
    ru: {
        audio_play: "Музыка",
        audio_stop: "Пауза",
        invitation_pre: "Родные, близкие, друзья, коллеги и соседи!",
        invitation_title: "Дорогие гости!",
        invitation_main: "Приглашаем вас стать почетными гостями на торжественном праздновании свадьбы наших детей!",
        location_title: "Место проведения",
        location_address: "ул. Сыганак, 38, Астана",
        btn_map: "Открыть карту",
        dresscode_title: "Дресс-код и цвета свадьбы",
        dress_note: "Будем ждать Вас в таких же красивых образах, как и Вы сами!",
        timeline_title: "Программа вечера",
        event_gathering: "Сбор гостей",
        event_betashar: "Беташар",
        event_photos: "Фотосессия",
        event_start: "Начало торжества",
        event_cake: "Свадебный торт",
        event_dance: "Танцы",
        timer_title: "До свадьбы осталось",
        unit_days: "Дней",
        unit_hours: "Часов",
        unit_minutes: "Минут",
        unit_seconds: "Секунд",
        timer_ended: "Свадьба началась!",
        rsvp_title: "Подтверждение участия",
        rsvp_subtitle: "Пожалуйста, ответьте до 20.07.2026.",
        label_name: "Ваше Имя и Фамилия",
        label_attendance: "Вы придете на свадьбу?",
        opt_yes: "С радостью приду",
        opt_plus: "Приду с парой",
        opt_no: "К сожалению, не смогу",
        btn_submit: "Отправить",
        btn_sending: "Отправка...",
        status_ok: "Спасибо! Ваш ответ принят.",
        status_error: "Произошла ошибка. Попробуйте снова или свяжитесь с нами.",
        hosts_label: "Хозяева торжества:",
        calendar_title: "Август 2026",
        calendar_note: "Отметьте этот день в своем календаре!"
    }
};

let currentLang = 'kk';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) {
            elem.innerText = translations[lang][key];
        }
    });
    
    // Update Input placeholders (special case)
    const nameInput = document.getElementById('user-name');
    const nameLabel = document.querySelector('label[for="user-name"]');
    if (nameLabel) nameLabel.innerText = translations[lang].label_name;

    // Toggle active buttons
    document.getElementById('lang-kk').classList.toggle('active', lang === 'kk');
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.documentElement.lang = lang;
}

// --- 2. МУЗЫКАЛЬНЫЙ ПЛЕЕР ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.innerText = '🎵';
        musicText.innerText = translations[currentLang].audio_play;
    } else {
        bgMusic.play().catch(e => console.log("Auto-play blocked"));
        musicIcon.innerText = '⏸';
        musicText.innerText = translations[currentLang].audio_stop;
    }
    isPlaying = !isPlaying;
});

// --- 3. ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ---
// Целевая дата: 30 августа 2026 года, 17:00
const targetDate = new Date("Aug 8, 2026 17:00:00").getTime();

const timerUpdate = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(timerUpdate);
        document.getElementById("countdown").classList.add("hidden");
        document.getElementById("timer-ended").classList.remove("hidden");
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}, 1000);

// --- 4. АНИМАЦИЯ ПРИ СКРОЛЛЕ ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- 5. ОБРАБОТКА ФОРМЫ (GOOGLE SHEETS) ---
const rsvpForm = document.getElementById('rsvp-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

// ЗАМЕНИТЕ ЭТОТ URL ПОСЛЕ РАЗВЕРТЫВАНИЯ GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'ВАШ_URL_СКРИПТА_ЗДЕСЬ';

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Блокируем кнопку UI
    submitBtn.disabled = true;
    btnText.innerText = translations[currentLang].btn_sending;

    const formData = new FormData(this);
    const attendance = formData.get('attendance');
    const name = formData.get('name');

    const data = {
        timestamp: new Date().toLocaleString(),
        name: name,
        attendance: attendance,
    };

    // Отправка данных
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Важно для Google Apps Script
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Поскольку mode: 'no-cors', мы не получим тело ответа, 
        // но успешное завершение fetch обычно означает, что запрос ушел.
        alert(translations[currentLang].status_ok);
        rsvpForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert(translations[currentLang].status_error);
    })
    .finally(() => {
        submitBtn.disabled = false;
        btnText.innerText = translations[currentLang].btn_submit;
    });
});

// --- 6. DRESSCODE COLOR PICKER ---
const colorSwatches = document.querySelectorAll('.color-swatch');
const dressFills = document.querySelectorAll('.dresscode-fill');

if (colorSwatches.length > 0) {
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Remove active from all
            colorSwatches.forEach(s => s.classList.remove('active'));
            // Add active to clicked
            swatch.classList.add('active');
            // Apply color to SVG fills
            const color = swatch.style.backgroundColor;
            dressFills.forEach(el => {
                el.style.fill = color;
            });
        });
    });
}